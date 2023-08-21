import { Injectable } from '@nestjs/common';
import firebaseAdmin from "firebase-admin";

@Injectable()
export class FirebaseStorageService {
    public async uploadImage(image: Express.Multer.File) {
        const bucket = firebaseAdmin.storage().bucket();
        
        const storageFilePath = `images/${image.originalname}`; //TODO generates random hash
        const fileRef = bucket.file(storageFilePath);
        await fileRef.save(image.buffer, {
            metadata: {
                contentType: image.mimetype
            }
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storageFilePath}`;

        return publicUrl;
    }
}
