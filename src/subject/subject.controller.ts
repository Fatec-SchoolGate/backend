import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSubjectDto } from './dto/get_subject_dto';
import { CreateSubjectDto } from './dto/create_subject_dto';
import { UpdateSubjectDto } from './dto/update_subject_dto';

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
    this.subjectService.getSubject(params.id);
  }

  @Delete("/:id")
  async deleteSubject(@Param() params: GetSubjectDto) {
    this.subjectService.deleteSubject(params.id);
  }

  @Post("/")
  async createSubject(@Body() request: CreateSubjectDto) {
    this.subjectService.createSubject(request);
  }

  @Put("/")
  async updateSubject(@Body() request: UpdateSubjectDto) {
    this.subjectService.updateSubject(request);
  }
}
