import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import { schema } from '../dataValidation/joi.js';
import { tokenController } from './token.js';
const saltRounds = 10;

const authController = {
  async signup(req, res) {
    const { firstname, lastname, email, login, password } = req.body;

    // récupération du retour de la validation
    const verif = schema.validate({
      firstname,
      lastname,
      email,
      password,
    });

    // // Si une erreur lors de la vérif, verif.error = True

    if (verif.error) {
      return res.status(400).json(verif.error.details[0].message);
    }

    // Récupération du hash du password avant stockage en bdd
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Construction de mon user avant sauvegarde en base.
    const newUser = User.build({
      firstname,
      lastname,
      email,
      login,
      password: hashPassword,
    });

    try {
      await newUser.save();
      // await transporter.sendMail({
      //   from: `Fred Foo 👻" <${process.env.NODEMAILER_EMAIL}>`, // sender address
      //   to: `${req.body.email}`, // list of receivers
      //   subject: 'Bienvenue sur notre site', // Subject line
      //   text: `Bonjour, ${firstname} votre inscription est bien validée, rendez-vous sur <http://localhost>:${process.env.PORT}/signin`,
      //   html: `<p>Bonjour,<b>${firstname}</b>  votre inscription est bien validée, rendez-vous sur <http://localhost>:${process.env.PORT}/signin</p>`,
      // });
      res.status(200).send();
    } catch (err) {
      console.log(err);
    }
  },
  async signin(req, res) {
    const { login, password } = req.body;
    const currentUser = await User.findOne({ where: { login } });
    //console.log(currentUser?.dataValues?.firstname);
    if (!currentUser) {
      return res.status(401).json('not authorized');
    }
    try {
      const decryptPassword = await bcrypt.compare(
        password,
        currentUser?.password,
      );

      // vérification correspondance login et mdp input et base
      if (currentUser?.login !== login || decryptPassword == false) {
        return res.status(401).json('not authorized');
      }
      const tokenUser = await tokenController.genToken({ login });
      res.status(200).json({
        tokenUser,
        username: currentUser?.dataValues?.login,
        id: currentUser?.dataValues?.id,
      });
    } catch (err) {
      //console.log(err);
      return res.status(500).json(err);
    }
  },
};

export { authController };
