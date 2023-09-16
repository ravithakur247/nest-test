import * as bcrypt from "bcrypt";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

import { Role } from 'src/roles/entities/roles.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @OneToOne(() => Role)
    @JoinColumn()
    role: Role;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const rounds = 10;
        const salt = await bcrypt.genSalt(rounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
}