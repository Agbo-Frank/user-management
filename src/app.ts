import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import rateLimiter from './middleware/rate-limiter';
import errorHandler from './middleware/error-handler';
import requestLogger from './middleware/request-logger';

import api from "./module"

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '100mb' }));

const VERSION_1 = '/api';

app.use(VERSION_1, rateLimiter(1, 500));
app.use(requestLogger);

app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);

api(app, VERSION_1);
app.use(errorHandler);

app.disable('x-powered-by');
export default app;
