import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { AppError } from "@errors/AppError";
import "express-async-errors";

import { authenticateRoutes } from "@routes/authenticate.routes";
import { ensureAuthenticated } from "./midlewares/ensureAuthenticated";
import { ioTRoutes } from "./routes/IoT.routes";
import { groupRoutes } from "./routes/Group.routes";
import { userRoutes } from "./routes/User.routes";
import { RescueGroupRoutes } from "./routes/RescueGroup.routes";
import { iotMonitorRoutes } from "./routes/IoTMonitor.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/ioTMonitor", iotMonitorRoutes);

app.use(authenticateRoutes);

app.use("/user", userRoutes);

//Midleware para validar a autenticação de todas as rotas seguintes

app.use(ensureAuthenticated);

app.use("/group", groupRoutes);



app.use("/rescueGroup", RescueGroupRoutes);

app.use("/ioT", ioTRoutes);



app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // response.setHeader("Access-Control-Allow-Origin", "*");
    // response.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    // response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal Server Errorr - ${err.message}`,
    });
  }
);

export default app;
