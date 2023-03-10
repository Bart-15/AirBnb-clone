import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    MONGO_URI: string | undefined;
    API: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
    API: string | undefined;
}

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        MONGO_URI: process.env.MONGO_URI,
        API: process.env.API
    };
};

const getSanitezedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitezedConfig(config);

export default sanitizedConfig;