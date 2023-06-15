import { app } from './app';

const startServer = (port?: string) => {
    const server = app.listen(port, () => {
        console.log(
            `⚡️[server]: Server is running at http://localhost:${port} in ${app.get(
                'env'
            )} mode`
        );
    });

    process.on('SIGTERM', () => {
        console.debug('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            console.debug('HTTP server closed');
        });
    });

    process.on('uncaughtException', (error) => {
        console.error('UNCAUGHT EXCEPTION\n', error.stack);
        // cleanup
        process.exit(1);
    });
};

export { startServer };
