import Express from "express";
import { requestLogger, Log } from "./middleware/logger.js";
const app = Express();
app.use(Express.json());
const port = 3003;
app.use(requestLogger);
app.get("/health-check", async (req, res) => {
    res.send("the server is ruuning health status is true ");
});
app.listen(port, () => {
    console.log(`app is runnig on the ${port}`);
});
//# sourceMappingURL=index.js.map