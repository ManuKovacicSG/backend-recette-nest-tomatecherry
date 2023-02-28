/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId }  from 'mongoose';
import { Ingredient } from 'src/ingredients/schema/ingredient.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
/*   @Prop({ type: Object, unique: true })
  _id: ObjectId; */

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop(raw([{
    ingredient:{type: mongoose.Schema.Types.ObjectId,ref: "Ingredient"},
    qty:{type: Number},
    _id:false
  }]))
  shopping_list: [
    {
    ingredient:ObjectId,
    qty: number
  }
  ];

  @Prop()
  favourites: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
