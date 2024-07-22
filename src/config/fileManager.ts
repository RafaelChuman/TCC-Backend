import { request } from "express";
import multer from "multer";
import {resolve} from "path";
import crypto from "crypto";
import fs from "fs";

function uploadFile(folder: string){
    return{
        storage: multer.diskStorage({
            destination: resolve(__dirname, "..",  "..", folder),
            filename: (request, file, callback) => {
                const fileHash = crypto.randomBytes(16).toString("hex");
                const fileName= `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            }
        })
    }
}

async function deleteFile(fileName: string): Promise<void> {
    try{
        await fs.promises.stat(fileName);

        await fs.promises.unlink(fileName);
    }catch{}
    return;
}

export {uploadFile, deleteFile};