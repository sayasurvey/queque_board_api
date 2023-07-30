
import { PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3"
import { s3Context } from "../../lib/s3Context"
import dotenv from 'dotenv';
dotenv.config();

export const boardImagePutS3 = async(boardImage: string): Promise<PutObjectCommandOutput> => {
    const putboardImage = new PutObjectCommand({
        Bucket: process.env.TEST_BUCKET,
        Key: boardImage
    });

    const sendBoardImageObject = await s3Context.send(putboardImage);

    return sendBoardImageObject;
}