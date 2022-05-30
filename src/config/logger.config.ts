import { Params } from "nestjs-pino";
import { join } from "path";
import { TransportTargetOptions } from "pino";

const logDirectory = join(__dirname, "..", "..", "logs");

const pinoTargetHttpPrint: TransportTargetOptions = {
    target: "pino-http-print",
    options: {
        colorize: true,
        all: true,
        translateTime: true,
        relativeUrl: true,
        prettyOptions: {
            ignore: "pid,hostname",
            singleLine: true,
        },
    },
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
};

const pinoTargetFileDebug: TransportTargetOptions = {
    target: "pino/file",
    options: {
        destination: join(logDirectory, "ada-api.debug.log"),
        mkdir: true,
    },
    level: "debug",
};

const pinoTargetFileInfo: TransportTargetOptions = {
    target: "pino/file",
    options: {
        destination: join(logDirectory, "ada-api.info.log"),
        mkdir: true,
    },
    level: "info",
};

const pinoTargetFileError: TransportTargetOptions = {
    target: "pino/file",
    options: {
        destination: join(logDirectory, "ada-api.error.log"),
        mkdir: true,
    },
    level: "error",
};

const loggerConfig: Params = {
    pinoHttp: {
        autoLogging: true,
        transport: {
            targets: [
                pinoTargetHttpPrint,
                pinoTargetFileDebug,
                pinoTargetFileInfo,
                pinoTargetFileError,
            ],
        },
    },
};

export default loggerConfig;
