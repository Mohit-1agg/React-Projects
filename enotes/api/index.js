import express from 'express';

// Database connectivity
import connectToMongo from './src/utils/db.js';
import authRouter from './src/routes/auth/index.js';
import noteRouter from './src/routes/note/index.js';

const PORT = 8080;
const app = express();

app.use(express.json()); // to deal with json response
app.use('/api/auth', authRouter);
app.use('/api', noteRouter);

connectToMongo(() => {
  app.listen(PORT, () => {
    console.info(`Listening to the port, ${PORT}`);
  });
});
