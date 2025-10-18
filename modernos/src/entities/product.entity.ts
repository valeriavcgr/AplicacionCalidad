import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    stock: number;

    @Column({ nullable: false, default: true })
    status: boolean;

    @Column({ nullable: false})
    description: string;

    @ManyToOne(() => Category, category => category.productId, { onDelete: 'SET NULL' })
    category: Category;
}