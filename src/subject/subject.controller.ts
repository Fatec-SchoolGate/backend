import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSubjectDto } from './dto/get_subject_dto';
import { CreateSubjectDto } from './dto/create_subject_dto';
import { UpdateSubjectDto } from './dto/update_subject_dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetSubjectsDto } from './dto/get-subjects-dto';

@Controller('subjects')
@UseGuards(AuthGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get("/")
  async getSubjects(@Query() params: GetSubjectsDto, @Request() request) {
    const { user } = request;

    const subjects = await this.subjectService.getSubjects(params.organizationId, user);
    
    return { subjects };
  }

  @Get("/:id")
  async getSubject(@Param() params: GetSubjectDto) {
    const subject = await this.subjectService.getSubject(params.id);
    return { subject };
  }

  @Get("/:id/members-info")
  async getMembersInfo(@Param() params: { subjectId: string }) {
    const { subjectId } = params;

    
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
  async createSubject(@Body() createSubjectDto: CreateSubjectDto, @UploadedFiles() images, @Request() request) {
    const { user } = request;

    if (!user) return;

    const subject = await this.subjectService.createSubject(createSubjectDto, user);
    return { subject };
  }

  @Put("/")
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
  async updateSubject(@Body() request: UpdateSubjectDto, @UploadedFiles() images) {
    const subject = await this.subjectService.updateSubject(request);

    return { subject };
  }
}
