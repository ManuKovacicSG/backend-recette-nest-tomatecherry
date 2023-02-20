import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateShoppingListDto {
  @ApiProperty({
    example: ['manteca', 1]
  })
  shopping_list: [{
    ingredient:mongoose.Types.ObjectId,
    amount:number
  }]

}
