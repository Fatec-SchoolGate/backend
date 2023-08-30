import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './subject.model';
import { CreateSubjectDto } from './dto/create_subject_dto';
import { UpdateSubjectDto } from './dto/update_subject_dto';

@Injectable()
export class SubjectService {
    constructor(
        @InjectModel(Subject)
        private readonly subject: typeof Subject
    ) {}

    async getSubjects() {
        return await this.subject.findAll();
    }
    
    async getSubject(id: string) {
        return await this.subject.findOne({
            where: { id }
        });
    }

    async deleteSubject(id: string) {
        return await this.subject.destroy({
            where: { id }
        });
    }

    async createSubject(createSubjectDto: CreateSubjectDto) {
        return await this.subject.create({ ...createSubjectDto });
    }

    async updateSubject(updateSubjectDto: UpdateSubjectDto) {
        const subject = await this.getSubject(updateSubjectDto.id);

        return await subject.set({ ...updateSubjectDto });
    }

}
