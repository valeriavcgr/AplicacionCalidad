import {RolesE } from "src/entities/user.entity"

export type IUser ={
    id: number, 
    name: string,
    age?: number,
    email:string,
    password: string,
    role:RolesE
}
