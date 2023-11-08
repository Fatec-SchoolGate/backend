import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './subject.model';
import { CreateSubjectDto } from './dto/create_subject_dto';
import { UpdateSubjectDto } from './dto/update_subject_dto';
import { OrganizationSubject } from 'src/organization_subject/organization_subject.model';
import { User } from 'src/auth/models/user.model';
import { OrganizationUser } from 'src/organization_users/organization_users.model';

@Injectable()
export class SubjectService {
    constructor(
        @InjectModel(Subject)
        private readonly subject: typeof Subject,
        @InjectModel(OrganizationSubject)
        private readonly organizationSubject: typeof OrganizationSubject
    ) {}

    async getSubjects(organizationId: string, user: User) {
        const subjectIds = await this.organizationSubject.findAll({
            attributes: ["subjectId"],
            where: { organizationId },
            raw: true
        }).then(subjects => subjects.map(subject => subject.subjectId));
        
        return await this.subject.findAll({
            where: {
                id: subjectIds
            }
        });
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

    async createSubject(createSubjectDto: CreateSubjectDto, user: User) {
        const subject = await this.subject.create({ ...createSubjectDto, adminUserId: user.id });
        const organizationSubject = await this.organizationSubject.create({
            organizationId: createSubjectDto.organizationId,
            subjectId: subject.id
        });
        
        return subject;
    }

    async updateSubject(updateSubjectDto: UpdateSubjectDto) {
        return await this.subject.update(
            updateSubjectDto,
            { where: { id: updateSubjectDto.id } }
        );
    }

}
