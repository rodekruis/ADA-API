const limit = '100mb';

const serverConfig = {
    globalPrefix: 'api',
    title: 'ADA API',
    version: '1.0',
    versionKey: 'version=',
    swaggerPrefix: 'api/swagger',
    swaggerCustomCss:
        '.swagger-ui .topbar, .swagger-ui section.models { display: none }',
    port: 3000,
    json: { limit },
    urlencoded: { limit, extended: true },
};

export default serverConfig;
