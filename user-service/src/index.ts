import app from "./app";

import config from "./config";
import logger from "./config/logger";


const startServer = async () => {
    try {
        const server = app.listen(config.PORT, () => {
            logger.info(
                `${config.SERVICE_NAME} is running on http://localhost:${config.PORT}`
            );
        });

        // Graceful shutdown
        const shutdown = async () => {
            logger.info('Shutting down gracefully...');

            server.close(async () => {
                logger.info('Server closed');
                process.exit(0);
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    } catch (error) {
        logger.error(`Failed to start server: ${error}`);
        process.exit(1);
    }
}

startServer();
