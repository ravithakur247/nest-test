import { Permission } from 'src/permissions/entities/permissions.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @ManyToMany(() => Permission, { eager: true, nullable: true })
    @JoinTable({
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permission: Permission[];

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;
}