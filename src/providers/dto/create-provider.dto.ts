import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProviderDto extends Provider {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    providerName: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    providerEmail: string;

    @ApiProperty()
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber: string;
}
