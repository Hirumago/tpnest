import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    ForbiddenException,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { StoragesService } from './storages.service';
import { StorageDto } from './dto/storage.dto';
import { Storage } from './schemas/storage.schema';
import { PokemonsService } from '../pokemons/pokemons.service';


@Controller('storages')
export class StoragesController {
    constructor(private readonly storagesService: StoragesService, private readonly pokemonService:PokemonsService) {

    }

    @Post()
    async create(@Body() storageDto: StorageDto) {
        await this.storagesService.create(storageDto);
    }

    @Get()
    async findAll(): Promise<Storage[]> {
        return this.storagesService.findAll();
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() storage: StorageDto){
        await this.storagesService.update(id, storage);
    }

    @Put(':id/add-pokemon/:idPokemon')
    async addPokemon(@Param('id') id, @Param('idPokemon') idPokemon){
        const storage = await this.storagesService.findOne(id);

        let type1Storage = storage.type1;
        let type2Storage = storage.type2;

        const pokemon = await this.pokemonService.findOne(idPokemon);

        const type1Pokemon = pokemon.type1;
        const type2Pokemon = pokemon.type2;

        if (
            (
                (type1Storage === type1Pokemon || type1Storage === type2Pokemon)
                &&
                (type2Storage === type1Pokemon || type2Storage === type2Pokemon)
            )
            || type1Storage === ""
            || type2Storage === ""
            && storage.slots.indexOf(idPokemon) === "-1"
            && storage.slots < 24
        )
        {
            if (type1Storage === "" && type2Storage === "" ){
                type1Storage = type1Pokemon;
                type2Storage = type2Pokemon;
            }
            else if(type2Storage === ""){
                if (type1Storage === type1Pokemon){
                    type2Storage = type2Pokemon;
                }
                else{
                    type2Storage = type1Pokemon;
                }
            }

            storage.slots.push(idPokemon);
            storage.type1 = type1Storage;
            storage.type2 = type2Storage;

            await this.storagesService.update(id, storage);
        }

        throw new HttpException({
            // status: HttpStatus.CONFLICT,
            error: "Impossible d'ajouter le pokemon à la boite."
        }, 400);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.storagesService.delete(id);
    }
}