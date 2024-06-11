import { Feedback } from '../models/feedBackModel';

class FeedbackService {
  private feedbacks: Feedback[] = [];

  getAllFeedbacks(): Feedback[] {
    return this.feedbacks;
  }

  addFeedback(feedback: Feedback): void {
    this.feedbacks.push(feedback);
  }
}

export const feedbackService = new FeedbackService();
