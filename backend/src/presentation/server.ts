import express, { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import colors from 'colors';
import { CustomError } from '../utils';
import { corsConfig } from '../config/cors';

type Options = {
    port: number;
    routes: Router;
}

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly routes: Router;

    constructor( options: Options ) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        // Cors
        this.app.use(cors( {
            origin: "*"
        }));

        //* Middlewares
        this.app.use(express.json()); // Raw
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        //* Routes
        this.app.use(this.routes);


        this.serverListener = this.app.listen(this.port, () => {
            console.log(colors.cyan.bold(`Server executing on PORT ${this.port}`));
        });
    }

    public close(): void {
        this.serverListener?.close();
    }
}