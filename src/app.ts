import express, { Application } from 'express';
import { DataSource } from "typeorm";
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from './utils/interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import helmet from 'helmet';
import { join } from 'path';
class App{
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        // this order is very important here
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void{
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(controllers : Controller[]): void{
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        })
    }

    private initialiseErrorHandling(): void{
        this.express.use(errorMiddleware);
    }

    private initialiseDatabaseConnection(): void{
       let AppDataSource = new DataSource({
          type: "sqlite",
          database: "backend-test.db",
          synchronize: false,
          logging: true,
          entities: [join(__dirname, '**', '*.model.{ts,js}')],
        //   migrations: ["src/migration/**/*.ts"],
        });
            AppDataSource.initialize();
    }

    public listen(): void{
        this.express.listen(this.port, () => {
            console.log(`App listening on port ==> ${this.port}`);
        });
    }
}

export default App;