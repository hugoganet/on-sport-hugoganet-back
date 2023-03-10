// Importation du modèle Comment
import { Comment } from '../models/Comment.js';

const commentController = {
  // Récupérer tous les commentaires pour une activité spécifique
  async getCommentsByActivity(req, res) {
    const activityID = req.params.id;
    try {
      const listComments = await Comment.findAll({
        where: { activity_id: activityID }, // Sélectionner tous les commentaires avec l'ID de l'activité correspondant
      });
      res.json(listComments);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  // Créer un nouveau commentaire pour une activité spécifique
  async postComment(req, res) {
    try {
      await Comment.create({
        content: req.body.content,
        activity_note: req.body.activity_note,
        user_id: req.body.user_id,
        activity_id: req.params.id,
      });

      res.status(201).json({
        message: 'Comment successful created',
      });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  // Supprimer un commentaire en fonction de son ID
  async deletePostByID(req, res) {
    try {
      const result = await Comment.findAll({ where: { id: req.params.id } });

      if (result.length > 0) {
        await Comment.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'delete comment successfully' });
      } else {
        res.status(404).json({ message: 'id comment not found' });
      }
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
};

export { commentController };
