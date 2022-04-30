import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { join } from 'path';
import { ping } from './routes';

const app = express();
const buildPath = join(`${__dirname}/static`);

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

app.use('/api', ping);

app.use(express.static(buildPath));

app.get('*', (_req, res) => {
  res.sendFile(`${buildPath}/index.html`);
});

export default app;
