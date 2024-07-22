import { Router } from "express";
import { ensureAuthenticated } from "@midlewares/ensureAuthenticated";
import multer from "multer";
import { uploadFile } from "@config/fileManager";
import { ensureIsAdmin } from "@src/midlewares/ensureIsAdmin";
import { createRescueGroup, deleteRescueGroup, listRescueGroup, updateRescueGroup } from "@src/modules/RescueGroup";

const RescueGroupRoutes = Router();

const uploadPhoto = multer(uploadFile("./tmp/Zones"));

RescueGroupRoutes.post("/", (request, response) =>
  createRescueGroup.execute(request, response)
);

RescueGroupRoutes.get("/", (request, response) =>
  listRescueGroup.execute(request, response)
);

RescueGroupRoutes.delete("/", (request, response) =>
  deleteRescueGroup.execute(request, response)
);

RescueGroupRoutes.put("/", (request, response) =>
  updateRescueGroup.execute(request, response)
);

// zonesRoutes.patch("/", uploadPhoto.single("Zones"), ensureAuthenticated,
//   (request, response) =>
//   uploadZonesController().handle(request, response));

export { RescueGroupRoutes };
