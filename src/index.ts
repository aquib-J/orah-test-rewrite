import "reflect-metadata";
import "dotenv/config";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import StudentController from "./resources/student/student.controller";
import RollController from "./resources/roll/roll.controller";
import GroupController from './resources/group/group.controller';

validateEnv(); // validate the presence of the required env variables

const app = new App(
  [new StudentController(),new RollController(),new GroupController()],
  Number(process.env.PORT)
);

app.listen();
