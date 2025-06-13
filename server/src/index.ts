import express from "express";
import { createAppRoutes } from "./interface/routes/appRoutes";

const app = express();

app.use(express.json());
app.use(createAppRoutes());

export default app;
