import { Body, Controller, Get, Post } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './schemas/pokemon.schema';

@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {}

    @Post()
    async create(@Body() createPokemonDto: CreatePokemonDto) {
        await this.pokemonsService.create(createPokemonDto);
    }

    @Get()
    async findAll(): Promise<Pokemon[]> {
        return this.pokemonsService.findAll();
    }
}