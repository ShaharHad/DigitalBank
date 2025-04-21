const app = require("./src/app");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 8004;

app.listen(port, () => {
    logger.info(`Transaction service running at http://localhost:${port}`)
});