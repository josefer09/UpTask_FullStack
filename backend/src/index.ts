import colors from 'colors';
import { Server } from './presentation/server';
import { MongoDatabase } from './data/mongo/mongo-database';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';

(async () => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });

    server.start();
}