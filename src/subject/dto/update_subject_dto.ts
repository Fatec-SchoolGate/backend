import { CreateSubjectDto } from "./create_subject_dto";

export type UpdateSubjectDto = {
    id: string;
} & CreateSubjectDto;