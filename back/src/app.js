import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { join } from 'path';
import session from 'express-session';
import passport from 'passport';
import { ping, foundObject, auth } from './routes';

const app = express();
const buildPath = join(`${__dirname}/static`);

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

app.use(
  session({
    secret: 'secr3t',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use('/auth', auth);
app.use('/api', ping);
app.use('/api', foundObject);

app.use(express.static(buildPath));

app.get('*', (_req, res) => {
  res.sendFile(`${buildPath}/index.html`);
});

export default app;
