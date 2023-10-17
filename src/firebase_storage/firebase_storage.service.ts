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

    public async uploadImages(images: Express.Multer.File[]) {
        const bucket = firebaseAdmin.storage().bucket();

        const publicUrls: string[] = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const imageHash = createHash("sha1").update(image.buffer).digest("hex");
        
            const storageFilePath = `${imageHash}`;
            const fileRef = bucket.file(storageFilePath);
            await fileRef.save(image.buffer, {
                metadata: {
                    contentType: image.mimetype
                }
            });

            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${storageFilePath}`;

            publicUrls.push(publicUrl);
        };
        
        return publicUrls;
    }
}
