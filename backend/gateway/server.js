const app = require("./src/app");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 8000;

app.listen(port, () => {
    logger.info(`Api gateway running at http://localhost:${port}`);
});