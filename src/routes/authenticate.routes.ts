import { authenticaUser } from "@src/modules/User";
import { Router } from "express"

const authenticateRoutes = Router();


authenticateRoutes.post("/", (request, response) => 
    authenticaUser.execute(request, response)
);

export {authenticateRoutes};