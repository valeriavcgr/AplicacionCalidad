import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum RolesE {
    ADMIN = 'admi',
    USER = 'user',
    SELLER = 'seller'
}

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    name: string;

    @Column({nullable:true})
    age?: number;

    @Column({nullable:false, unique:true})
    email:string;

    @Column()
    password: string

    @Column({default: RolesE.USER})
    role: RolesE

}
