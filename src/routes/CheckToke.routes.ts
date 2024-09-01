import { checkToken } from "@src/modules/Token";
import { Router } from "express"

const CheckTokenRoutes = Router();


CheckTokenRoutes.post("/", (request, response) => 
    checkToken.execute(request, response)
);

export {CheckTokenRoutes};