import * as express from 'express';
import * as  bodyParser from 'body-parser';
import * as cors from 'cors';
import { getAllFeedbacks, addFeedback } from './controllers/feedBackController';

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 1,
  message: "You can only submit one feedback every 10 seconds.",
});




const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/feedbacks', getAllFeedbacks);
app.post('/feedbacks', limiter, addFeedback);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
