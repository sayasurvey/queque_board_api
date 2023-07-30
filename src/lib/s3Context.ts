import { S3Client, GetBucketAclCommand } from '@aws-sdk/client-s3';
import { awsConfig } from './awsConfig';

export const s3Context = new S3Client(awsConfig);
