import { app } from "./app";
import log from "./utils/logger";

app.listen(process.env.SERVER_PORT, () => {
    log.info(`The server is running at: ${process.env.SERVER_PORT}`);
})