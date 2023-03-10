import jwt from 'jsonwebtoken';

export const tokenController = {
  /**
   * Permet de renvoyer un token suite à la demande client
   * @param req
   * @param res communication du token
   */

  async genToken(obj) {
    const token = await jwt.sign(
      {
        data: { obj },
      },
      process.env.JWT_KEY || 'secret',
      { expiresIn: 240 },
    );
    try {
      return { token: token }; // Renvoie le token généré
    } catch (err) {
      return err;
    }
  },
};
