import { cleanEnv, str, port } from "envalid";

function validateEnv(): void{
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'production'] }),
        PORT: port({ default: 4001 }),
    });
}

export default validateEnv;