// main.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes from './routes'; // Import the routes folder
import db from './models';
import { userDetails } from './seeders/userdetails';
// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3000;
const createProjects = () => {
  userDetails.map((details) => {
    db.UserDetails.create(details);
  });
};

// createProjects();
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${3000}`);
  });
});
// Middleware to parse JSON bodies
app.use(express.json());



// Use the routes fro m the routes folder
app.use('/api', routes);

// Error Handling Middleware (General Error Handler)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error details for debugging
  res.status(500).json({ message: 'Internal Server Error' });
});
