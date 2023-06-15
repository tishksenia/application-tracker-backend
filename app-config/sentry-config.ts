import { ErrorRequestHandler } from 'express';
import * as Sentry from '@sentry/node';

import { app } from '../app';
import { dsn } from './config';

const initialiseSentry = () => {
    Sentry.init({
        dsn,
        integrations: [
            // HTTP call tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // Express middleware tracing
            new Sentry.Integrations.Express({ app }),
            // Instrument Node.js libraries and framework
            ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
        ],
        tracesSampleRate: 1.0,
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
};

const attachErrorHandlers = () => {
    // The error handler must be before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler());
    // Optional fallthrough error handler

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        res.statusCode = 500;
        res.end();
    };

    app.use(errorHandler);
};

export { initialiseSentry, attachErrorHandlers };
