import { randomUUID } from "crypto";
import { extname } from "path";

export const randomFileName = (request, file: Express.Multer.File, callback) => {
    const randomName = `${randomUUID()}${extname(file.originalname)}`;
    
    callback(null, randomName);
}