import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Storage } from './schemas/storage.schema';
import { StorageDto } from './dto/storage.dto';

@Injectable()
export class StoragesService {
    constructor(@InjectModel(Storage.name) private storageModel: Model<Storage>) {}

    async create(createStorageDto: StorageDto): Promise<Storage> {
        const createdStorage = new this.storageModel(createStorageDto);
        return createdStorage.save();
    }

    async findAll(): Promise<Storage[]> {
        return this.storageModel.find().exec();
    }

    async update(id :string, storage){
        return this.storageModel.findOneAndUpdate({_id :id},storage, {new: true});
    }

    async delete(id: string){
        await this.storageModel.deleteOne({_id :id});
    }

    findOne(id:string) {
        return this.storageModel.findById(id).exec();
    }

    findAllWait(idOwner:string) {
        return this.storageModel.find({owner:idOwner}).exec();
    }
}
