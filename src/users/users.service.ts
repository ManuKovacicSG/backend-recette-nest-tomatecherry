import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { Request } from 'express';
import { hash } from 'bcrypt';
import { EncryptService } from 'src/tools/encrypt.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import mongoose from 'mongoose';
import { Ingredient } from 'src/ingredients/schemas/ingredient.schema';
import { AddIngredientDto } from 'src/ingredients/dto/add-ingredient.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private encryptService: EncryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await this.encryptService.encrypt(createUserDto.password);
    createUserDto.password = hashPassword;

    return this.userModel.create(createUserDto);
  }

  async findAll(request: Request): Promise<User[]> {
    return this.userModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByEmail(email: string):  Promise<User> {
    return this.userModel.findOne( { email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }

  async addIngredientToShopppingList( id:string, addIngredientDto: any ){
    const user = await this.userModel.findById(mongoose.Types.ObjectId)
    user.shopping_list.push(addIngredientDto)
    user.save()
    return user
  }

  async updateShoppingList(id: string, createShoppingListDto: CreateShoppingListDto){
    return this.userModel.findOneAndUpdate({_id:id},createShoppingListDto, {
      new: true,
  })
}}

//obtener la shopping list que tiene el User, find one pasando el id del Usuario db.user.findOne({_id:id},{shopping_list:1,_id:0}) esto deberia devolver el array que es la shopping list
//recorrer el array q viene del DTO, x c
