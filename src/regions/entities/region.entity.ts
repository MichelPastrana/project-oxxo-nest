import { ApiProperty } from "@nestjs/swagger";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    
    @ApiProperty({
        default: 'Santiago de Queretaro'
    })
    @Column({
        type: 'text',
        unique: true
    })
    regionName: string;

    @ApiProperty({
        default: ['Sur', 'Norte']
    })
    @Column('simple-array')
    regionStates: string[];

    @OneToMany(() => Location, (location) => location.region)
    locations: Location[];
}
