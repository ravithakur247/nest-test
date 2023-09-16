import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt:Date;

}