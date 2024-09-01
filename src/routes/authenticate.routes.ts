import { authenticaUser } from "@src/modules/User";
import { Router } from "express"

const AuthenticateRoutes = Router();


AuthenticateRoutes.post("/", (request, response) => 
    authenticaUser.execute(request, response)
);

export {AuthenticateRoutes};