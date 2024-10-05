import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    
    @ApiProperty({
        default: 'Coca-Cola'
    })
    @Column('text')
    providerName: string;

    @ApiProperty({
        default: 'cocacola@gmail.com'
    })
    @Column('text', {
        unique: true
    })
    providerEmail: string;

    @ApiProperty({
        default: '4448891817'
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    providerPhoneNumber: string;
    
    @OneToMany(() => Product, (product) => product.provider)
    products: Product[]
}