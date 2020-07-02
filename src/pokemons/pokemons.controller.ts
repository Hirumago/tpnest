import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './schemas/pokemon.schema';


@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {

    }

    @Post()
    async create(@Body() createPokemonDto: CreatePokemonDto) {
        await this.pokemonsService.create(createPokemonDto);
    }

    @Get()
    async findAll(): Promise<Pokemon[]> {
        return this.pokemonsService.findAll();
    }

    @Delete(":id/delete")
    async delete(@Param("id")id):Promise<any>{
        return this.pokemonsService.delete(id);
    }

    @Put(":id/update")
    async update(@Param("id")id,@Body() Pokemon:CreatePokemonDto){
        await this.pokemonsService.update(id, Pokemon);
    }
}
