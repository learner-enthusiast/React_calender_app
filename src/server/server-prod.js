import express from 'express';
import cors from 'cors';

import db from './db/connection';
import router from './routers';
import { UserFacingError, DatabaseError } from './utils/baseErrors';

const PORT = process.env.PORT || 3001;

const app = express();

// enable CORS (important for client ↔ server communication across domains)
app.use(cors());

// parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes (always mounted at /api/v1)
app.use('/api/v1', router);

// Global error handler
app.use((err, req, res, next) => {
  res.header('Content-Type', 'application/json');
  const status = err.status || 400;

  const response = {
    name: err.name,
    message: err.message ?? ''
  };

  if (err instanceof UserFacingError || err instanceof DatabaseError) {
    for (const [key, value] of Object.entries(err)) {
      response[key] = value;
    }
  }

  res.status(status).send(response);
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}/api/v1`);
});
