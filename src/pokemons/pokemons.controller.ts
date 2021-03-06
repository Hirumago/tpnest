import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonDto } from './dto/pokemon.dto';
import { Pokemon } from './schemas/pokemon.schema';

@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {

    }

    @Post()
    async create(@Body() pokemonDto: PokemonDto) {
        await this.pokemonsService.create(pokemonDto);
    }

    @Get()
    async findAll(): Promise<Pokemon[]> {
        return this.pokemonsService.findAll();
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() pokemon: PokemonDto){
        await this.pokemonsService.update(id, pokemon);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.pokemonsService.delete(id);
    }
}