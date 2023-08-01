import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcryptjs";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Exclude()
    @Column()
    password: string;

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
