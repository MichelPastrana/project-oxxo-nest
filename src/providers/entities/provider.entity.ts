import { Product } from "src/products/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @Column('text')
    providerName: string;
    @Column('text')
    providerEmail: string;
    @Column({
        type: 'text',
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (product) => product.provider)
    products: Product[]
}