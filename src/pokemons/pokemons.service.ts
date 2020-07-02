import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './schemas/pokemon.schema';
import { PokemonDto } from './dto/pokemon.dto';

@Injectable()
export class PokemonsService {
    constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>) {}

    async create(createPokemonDto: PokemonDto): Promise<Pokemon> {
        const createdPokemon = new this.pokemonModel(createPokemonDto);
        return createdPokemon.save();
    }

    async findAll(): Promise<Pokemon[]> {
        return this.pokemonModel.find().exec();
    }

    async update(id :string, pokemon){
        await this.pokemonModel.updateOne({_id :id},pokemon);
    }

    async delete(id: string){
        await this.pokemonModel.deleteOne({_id :id});
    }

    findOne(id:string) {
        return this.pokemonModel.findById(id).exec();
    }
}
