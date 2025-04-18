const app = require("./src/app");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 8003;

app.listen(port, () => {
    logger.info(`Account service running at http://localhost:${port}`)
});