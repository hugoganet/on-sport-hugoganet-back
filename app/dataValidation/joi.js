import Joi from 'joi';

// Définition du schéma de validation des données utilisateur
export const schema = Joi.object().keys({
  firstname: Joi.string().min(2).max(40).required(),
  lastname: Joi.string().min(2).max(40).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'fr', 'test'] },
    }),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // La validation du mot de passe est gérée en code maison
});
