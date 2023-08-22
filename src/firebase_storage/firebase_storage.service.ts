import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import firebaseAdmin from "firebase-admin";

@Injectable()
export class FirebaseStorageService {
    public async uploadImage(image: Express.Multer.File) {
        const bucket = firebaseAdmin.storage().bucket();
        const imageHash = createHash("sha1").update(image.buffer).digest("hex");
        
        const storageFilePath = `${imageHash}`;
        const fileRef = bucket.file(storageFilePath);
        await fileRef.save(image.buffer, {
            metadata: {
                contentType: image.mimetype
            }
        });

        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${storageFilePath}`;

        return publicUrl;
    }
}
