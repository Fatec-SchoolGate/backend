import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FaceRecognitionService } from './face-recognition.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateQueueDto } from './dto/create-queue-dto';
import { Multer, diskStorage } from 'multer';
import { randomFileName } from 'src/utils/random-file-name';
import { RegisterAttendancesDto } from './dto/register-attendances';

@Controller('face-recognition')
export class FaceRecognitionController {
  constructor(private readonly faceRecognitionService: FaceRecognitionService) {}

  @Post("/queue")
  @UseInterceptors(FileInterceptor("targetImage", {
    storage: diskStorage({
      destination: "./files/images/face-recognition/target-images",
      filename: randomFileName
    })
  }))
  public async createQueue(@Body() createQueueDto: CreateQueueDto, @UploadedFile() targetImage) {
    const { scheduleId } = createQueueDto;
    targetImage.path = targetImage.path.replace("files/", "");
    const queue = await this.faceRecognitionService.createQueue(scheduleId, targetImage);

    await this.faceRecognitionService.triggerFaceRecognitionService(queue.queue.id);

    return queue;
  }

  @Get("/queue-info/:queueId")
  public async getInfo(@Param() params: { queueId: string }) {
    const { queueId } = params;

    const info = await this.faceRecognitionService.getInfo(queueId);

    return info;
  }

  @Post("/register-attendances")
  public async registerAttendances(@Body() registerAttendances: RegisterAttendancesDto) {
    const attendances = await this.faceRecognitionService.registerAttendances(registerAttendances.scheduleId, registerAttendances.userIds);

    return attendances;
  }
}
