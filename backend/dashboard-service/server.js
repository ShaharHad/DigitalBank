const app = require("./src/app");
const logger = require("./src/utils/logger");

const port = process.env.PORT || 8005;

app.listen(port, () => {
    logger.info(`Dashboard service running at http://localhost:${port}`)
});