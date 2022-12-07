import "reflect-metadata";
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';
import StudentController from './resources/student/student.controller'

validateEnv(); // validate the presence of the required env variables

const app = new App([new StudentController()],Number(process.env.PORT));

app.listen();