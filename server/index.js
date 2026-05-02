import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';

dotenv.config();

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));

const app = express();

app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log('server is running at port 3000...');
});
