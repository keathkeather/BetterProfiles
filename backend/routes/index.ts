import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// Dynamically import all route files except 'index.ts'
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.ts') {
    const routePath = path.join(__dirname, file);
    const route = require(routePath).default; // Ensure you're accessing the default export
    if (route) {
      router.use(route); // Add route to the main router
    }
  }
});

export default router;
