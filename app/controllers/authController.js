import { User } from '../models/User.js';
import { Location } from '../models/Location.js';
import bcrypt from 'bcrypt';
import { schema } from '../dataValidation/joi.js';

const saltRounds = 10;

export const authController = {
  async signup(req, res) {
    const { firstname, lastname, email, login, password } = req.body;

    // récupération du retour de la validation
    const verif = schema.validate({
      firstname,
      lastname,
      email,
      password,
    });
    console.log(verif.error);
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
      //   text: `Bonjour, ${firstname} votre inscription est bien validée, rendez-vous sur http://localhost:${process.env.PORT}/signin`,
      //   html: `<p>Bonjour,<b>${firstname}</b>  votre inscription est bien validée, rendez-vous sur http://localhost:${process.env.PORT}/signin</p>`,
      // });
      res.status(200).json('test signup ok');
    } catch (err) {
      console.log(err);
    }
  },
  async test(req, res) {
    const test = await User.findOne({ include: Location });
    res.status(200).json(test);
  },
};
