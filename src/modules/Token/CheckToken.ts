
import { isTokenValid } from "@src/midlewares/ensureAuthenticated";
import { Response, Request } from "express";

class CheckToken {
    async execute(request: Request, response: Response): Promise<Response> {

        var resp = false
        const token = request.headers.authorization;

        if (token) {
            resp = isTokenValid(token)
        }

        return response.status(200).json(resp);
    }
}

export { CheckToken };
