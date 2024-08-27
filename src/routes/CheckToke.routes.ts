import { checkToken } from "@src/modules/Token";
import { Router } from "express"

const checkTokenRoutes = Router();


checkTokenRoutes.post("/", (request, response) => 
    checkToken.execute(request, response)
);

export {checkTokenRoutes};