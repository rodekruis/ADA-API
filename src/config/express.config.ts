const limit = "100mb";

const expressConfig = {
    json: { limit },
    urlencoded: { limit, extended: true },
};

export default expressConfig;
