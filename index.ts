import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

validateEnv(); // validate the presence of the required env variables

const app = new App([],Number(process.env.PORT));
