import mongoose from 'mongoose';
import colors from 'colors';


interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: Options) {

        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName
            });
            console.log(colors.green.bold('Mongo DB connection succefully'));
            return true;
        } catch (error) {
            console.log(colors.red.bold('Mongo connection error'));
            throw error;
        }

    }

    static async disconnect() {
        await mongoose.disconnect();
    }
}