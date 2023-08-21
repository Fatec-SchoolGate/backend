import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';

@Injectable()
export class MinioClientService {
    private readonly defaultBucket = process.env.MINIO_BUCKET;
    private readonly allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];

    constructor(
        private readonly minio: MinioService
    ) {}

    public async upload(file: BufferedFile, bucket: string = this.defaultBucket) {
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new HttpException("Bad format", HttpStatus.BAD_REQUEST);
        }

        const fileBuffer = file.buffer;
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };

        this.minio.client.putObject(bucket, "filename", fileBuffer, metaData, (error, response) => {
            if (error) {
                console.error(error);
                throw new HttpException("Error uploading the file", HttpStatus.BAD_REQUEST);
            }

            console.log(response);
        });

        return {
            url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${"filename"}` 
        }
    }
}
