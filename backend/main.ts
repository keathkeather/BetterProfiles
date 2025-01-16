const express = require('express');
const dotenv = require('dotenv');
const routes = require('./Routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;



// Routes
app.use('/api', routes);

// Error Handling Middleware


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
