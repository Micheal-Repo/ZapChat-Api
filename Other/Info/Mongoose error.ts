The issue you're experiencing happens because the MongooseError: Operation users.findOne() buffering timed out after 10000ms is thrown before Mongoose establishes a connection to the database. In this case, express-async-errors doesn't handle the error because the operation fails outside the context of your Express request lifecycle.

Steps to Fix the Issue

1. Prevent Buffering Errors

You can configure Mongoose to disable command buffering entirely. This way, operations won't queue while waiting for a connection, and you can handle connection issues explicitly.

const mongoose = require('mongoose');

mongoose.set('bufferCommands', false); // Disable buffering globally
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/yourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if the database connection fails
});


---

2. Check the Connection Before Querying

Ensure that the database connection is established before performing any database operations. You can check mongoose.connection.readyState:

const User = require('./models/User');

app.get('/users', async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) { // 1 means connected
    return next(new Error('Database connection not established'));
  }

  try {
    const user = await User.findOne();
    res.json(user);
  } catch (err) {
    next(err);
  }
});


---

3. Handle Mongoose Connection Errors Globally

Set up listeners for Mongoose connection errors and handle them appropriately to prevent app crashes:

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected');
});


---

4. Wrap Your App Logic in a Database Connection Check

Delay starting the Express server until the database connection is established:

mongoose.connect('mongodb://localhost:27017/yourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  
  const app = express();

  // Middleware and routes here

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit if unable to connect
});


---

Why Your App Crashed

The crash occurs because Mongoose throws an unhandled error during the buffering timeout. Disabling buffering (mongoose.set('bufferCommands', false)) ensures that Mongoose doesn't queue operations when the database is unavailable, allowing you to catch and handle connection issues explicitly.

Let me know if you need further clarification!

