const app = require("./src/app");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 8002;

app.listen(port, () => {
    logger.info(`User service running at http://localhost:${port}`)
});