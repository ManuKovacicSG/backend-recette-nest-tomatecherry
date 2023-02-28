import { ApiProperty } from '@nestjs/swagger';

export class AddIngredientDto {

    @ApiProperty({ example: "harina" })
    readonly _id: string;

    @ApiProperty({ example: "grams" })
    readonly measure_unit: string;

}