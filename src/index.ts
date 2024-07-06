import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import healthRoute from './routes/healthRoute';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/health', healthRoute);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://127.0.01:${port}`);
});
