import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/auth/models/user.model';
import { FirebaseStorageService } from 'src/firebase_storage/firebase_storage.service';
import { ScheduleUser } from 'src/schedule_users/schedule-user.model';
import { Schedule } from 'src/schedules/schedule.modal';
import { FaceRecognitionQueue } from './models/face-recognition-queue-model';
import { FaceRecognitionQueuePhoto } from './models/face-recognition-queue-photo';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class FaceRecognitionService {
    constructor(
        @InjectModel(FaceRecognitionQueue) private readonly queue: typeof FaceRecognitionQueue,
        @InjectModel(FaceRecognitionQueuePhoto) private readonly queuePhoto: typeof FaceRecognitionQueuePhoto,
        @InjectModel(Schedule) private readonly schedule: typeof Schedule,
        @Inject(FirebaseStorageService) private readonly firebase: FirebaseStorageService,
        private readonly amqpConnection: AmqpConnection,
    ) {}

    public async triggerFaceRecognitionService(queueId: string) {
        const foo = await this.amqpConnection.publish("face-recognition", "face-recognition", {
            message: {
                queueId
            }
        });
        console.log("foo", foo);
    }

    public async createQueue(scheduleId: string, targetImage: any) {
        const queue = await this.queue.create({
            scheduleId
        });

        const queuePhoto = await this.queuePhoto.create({
            faceRecognitionQueueId: queue.id,
            imagePath: targetImage.path
        });
        
        return {
            queue, queuePhoto
        };
    }

    public async getInfo(queueId: string) {
        const queue = await this.queue.findOne({
            where: { id: queueId },
            include: [
                {
                    model: Schedule,
                    include: [
                        {
                            model: ScheduleUser,
                            include: [
                                { model: User }
                            ]
                        }
                    ]
                },
                {
                    model: FaceRecognitionQueuePhoto
                }
            ]
        });

        const photos = queue.photos;

        const schedule = queue.schedule;

        const scheduleUsers = schedule.users;

        const users = scheduleUsers.map((scheduleUser) => scheduleUser.user);

        return {
            photos,
            schedule,
            users
        };
        // const users = await this.getUsers(scheduleId);

        // return {
        //     users
        // };
    }

    private async getUsers(scheduleId: string) {
        const schedule = await this.schedule.findOne({
            where: { id: scheduleId },
            include: [
                {
                    model: ScheduleUser,
                    include: [
                        {
                            model: User
                        }
                    ]
                }
            ]
        });

        if (!schedule) return [];

        return schedule.users.map((scheduleUser) => scheduleUser.user);
    }
}
