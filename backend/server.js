import express from 'express';
import userData from './database.cjs';
import cors from 'cors';
// Create an Express application
const app = express();
app.use(cors());
// Define a route to fetch user data
app.get('/users', (req, res) => {
  // Simulate fetching user data asynchronously (replace this with your actual database query)
  new Promise((resolve, reject) => {
    // Assume `userData` is already available asynchronously
    setTimeout(() => {
      resolve(userData);
    }, 100); // Simulate a delay of 100 milliseconds
  })
  .then(data => {
    // Send the userData array as JSON response
    res.json(data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
