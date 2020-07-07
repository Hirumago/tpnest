import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonDto } from './dto/pokemon.dto';
import { Pokemon } from './schemas/pokemon.schema';

@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {}

    @Post()
    async create(@Body() PokemonDto: PokemonDto) {
        await this.pokemonsService.create(PokemonDto);
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
    async update(@Param("id")id,@Body() Pokemon:PokemonDto){
        await this.pokemonsService.update(id, Pokemon);
    }
}
