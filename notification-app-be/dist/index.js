import Express from "express";
const app = Express();
app.use(Express.json());
const port = 3003;
app.get("/health-check", async (req, res) => {
    res.send("the server is ruuning health status is true ");
});
app.listen(port, () => {
    console.log(`app is runnig on the ${port}`);
});
//# sourceMappingURL=index.js.map