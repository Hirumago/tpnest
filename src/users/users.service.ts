import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: UserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async update(id :string, user){
        await this.userModel.updateOne({_id :id},user);
    }

    async delete(id: string){
        await this.userModel.deleteOne({_id :id});
    }

    findOne(id:string) {
        return this.userModel.findById(id).exec();
    }
}
