import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSubjectDto } from './dto/get_subject_dto';
import { CreateSubjectDto } from './dto/create_subject_dto';
import { UpdateSubjectDto } from './dto/update_subject_dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('subjects')
@UseGuards(AuthGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get("/")
  async getSubjects() {
    const subjects = await this.subjectService.getSubjects();
    return { subjects };
  }

  @Get("/:id")
  async getSubject(@Param() params: GetSubjectDto) {
    const subject = await this.subjectService.getSubject(params.id);
    return { subject };
  }

  @Delete("/:id")
  async deleteSubject(@Param() params: GetSubjectDto) {
    const deleted = this.subjectService.deleteSubject(params.id);
    return { deleted };
  }

  @Post("/")
  @UseInterceptors(FileFieldsInterceptor([
    {
      name: "displayImage",
      maxCount: 1
    },
    {
      name: "backgroundImage",
      maxCount: 1
    }
  ]))
  async createSubject(@Body() request: CreateSubjectDto, @UploadedFiles() images) {
    const subject = this.subjectService.createSubject(request);
    return { subject };
  }

  @Put("/")
  async updateSubject(@Body() request: UpdateSubjectDto) {
    const subject = await this.subjectService.updateSubject(request);

    return { subject };
  }
}
