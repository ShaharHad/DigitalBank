const app = require("./src/app");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 8001;

app.listen(port, () => {
    logger.info(`Auth service running at http://localhost:${port}`)
});