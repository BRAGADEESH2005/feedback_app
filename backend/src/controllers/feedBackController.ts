import { Request, Response } from 'express';
import { feedbackService } from '../services/feedbackService';

export const getAllFeedbacks = (req: Request, res: Response): void => {
  res.json(feedbackService.getAllFeedbacks());
};

export const addFeedback = (req: Request, res: Response): void => {
  const { name, feedback } = req.body;
  feedbackService.addFeedback({ name, feedback });
  res.status(201).send('Feedback added successfully');
};
