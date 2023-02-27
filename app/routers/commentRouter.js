import express from 'express';
const commentRouter = express.Router();

import { commentController } from '../controllers/commentController.js';
import { controlSyntaxMiddleware } from '../middlewares/controlSyntaxMiddleware.js';
import { controlUnique } from '../middlewares/controlData.js';

commentRouter
  .route('/activity/:id')
  .get(commentController.getCommentsByActivity)
  .post(commentController.postComment)
  .delete(commentController.deletePostByID);

export { commentRouter };
