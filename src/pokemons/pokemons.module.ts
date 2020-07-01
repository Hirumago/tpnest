import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { Pokemon, PokemonSchema } from './schemas/pokemon.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }])],
    controllers: [PokemonsController],
    providers: [PokemonsService],
})
export class PokemonsModule {}