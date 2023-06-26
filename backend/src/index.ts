import express from "express";
import cors from "cors";
import { betRouter, feedRouter, followRouter, rankingRouter, usersRouter } from "./routers";
import { loadEnv } from "./config/envs";

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/feed", feedRouter);
app.use("/ranking", rankingRouter);
app.use("/bet", betRouter);
app.use("/follow", followRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

export default server;
