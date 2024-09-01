import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { AppError } from "@errors/AppError";
import "express-async-errors";

import { ensureAuthenticated } from "./midlewares/ensureAuthenticated";
import { AuthenticateRoutes } from "./routes/authenticate.routes";
import { UserRoutes } from "./routes/User.routes";
import { CarRoutes } from "./routes/Car.routes";
import { ItemRoutes } from "./routes/Item.routes";
import { CheckTokenRoutes } from "./routes/CheckToke.routes";
import { OrdersRoutes } from "./routes/Orders.routes";
import { OrderAndItemsRoutes } from "./routes/OrderAndItems.routes";


const app = express();

app.use(cors());

app.use(express.json());

app.use(AuthenticateRoutes);

//Midleware para validar a autenticação de todas as rotas seguintes
app.use(ensureAuthenticated);

app.use("/user", UserRoutes);

app.use("/car", CarRoutes);

app.use("/item", ItemRoutes);

app.use("/orders", OrdersRoutes);

app.use("/orderAndItems", OrderAndItemsRoutes);

app.use("/checkToken", CheckTokenRoutes);


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
