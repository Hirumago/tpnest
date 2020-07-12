import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    HttpException,
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

    @Put(':id/update/:idOwner')
    async update(@Param('id') id, @Param('idOwner') idOwner, @Body() storageDto: StorageDto){
        const storage = await this.storagesService.findOne(id);

        if (storage.owner !== idOwner){
            throw new HttpException({
                // status: HttpStatus.CONFLICT,
                error: "Mauvais utilisateur"
            }, 400);
        }

        await this.storagesService.update(id, storageDto);
    }

    @Put(':id/add-pokemon/:idPokemon/:idOwner')
    async addPokemon(@Param('id') id, @Param('idPokemon') idPokemon, @Param('idOwner') idOwner){
        const storage = await this.storagesService.findOne(id);

        if (storage.owner !== idOwner){
            throw new HttpException({
                // status: HttpStatus.CONFLICT,
                error: "Mauvais utilisateur"
            }, 400);
        }

        const storages = await this.storagesService.findAllWait(idOwner);

        let idStorage = "";
        let storeSlots = [];
        for (const store of storages) {
            const storedPokemonIndex = store.slots.indexOf(idPokemon);

            if (storedPokemonIndex !== -1 && id != store._id) {
                idStorage = store._id;
                storeSlots = store.slots;

                storeSlots.splice(storedPokemonIndex, 1);

                if (storeSlots.length === 0){
                    store.type1 = "";
                    store.type2 = "";
                }
                else if(storeSlots.length === 1){
                    const lastPokemon = await this.pokemonService.findOne(storeSlots[0]);
                    store.type1 = lastPokemon.type1;
                    store.type2 = lastPokemon.type2;
                }

                store.slots = storeSlots;

                await this.storagesService.update(idStorage, store)
            }
        }

        let type1Storage = storage.type1;
        let type2Storage = storage.type2;

        const pokemon = await this.pokemonService.findOne(idPokemon);

        const type1Pokemon = pokemon.type1;
        const type2Pokemon = pokemon.type2;

        if (storage.slots.length === 24){
            throw new HttpException({
                // status: HttpStatus.CONFLICT,
                error: "Espace de stockage plein"
            }, 400);
        }

        console.log(type1Storage)
        console.log(type2Storage)
        console.log(type1Pokemon)
        console.log(type2Pokemon)

        console.log(type1Pokemon !== type1Storage && type1Pokemon !== type2Storage)
        console.log(type2Pokemon !== type1Storage && type2Pokemon !== type2Storage)
        console.log(type1Storage !== "")
        console.log(type2Storage !== "")

        console.log((type1Pokemon !== type1Storage && type1Pokemon !== type2Storage)
            ||
            (type2Pokemon !== type1Storage && type2Pokemon !== type2Storage)
            && type1Storage !== ""
            && type2Storage !== "")

        if (type1Storage !== "" || type2Storage !== ""){
            if(
                (type1Pokemon !== type1Storage && type1Pokemon !== type2Storage)
                &&
                (type2Pokemon !== type1Storage && type2Pokemon !== type2Storage)
            ){
                throw new HttpException({
                    // status: HttpStatus.CONFLICT,
                    error: "Le(s) type(s) de ce pokemon ne correspondent pas à l'espace de stockage"
                }, 400);
            }
            else if (
                (type1Pokemon !== type1Storage && type1Pokemon !== type2Storage)
                ||
                (type2Pokemon !== type1Storage && type2Pokemon !== type2Storage)
            ){
                throw new HttpException({
                    // status: HttpStatus.CONFLICT,
                    error: "Un des types de ce pokemon ne correspond pas à l'espace de stockage"
                }, 400);
            }
        }

        if (storage.slots.indexOf(idPokemon) !== -1){
            throw new HttpException({
                // status: HttpStatus.CONFLICT,
                error: "Ce pokemon est déjà dans l'espace de stockage"
            }, 400);
        }
        else{
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

            return await this.storagesService.update(id, storage);
        }

        throw new HttpException({
            // status: HttpStatus.CONFLICT,
            error: "Impossible d'ajouter le pokemon à la boite."
        }, 400);
    }

    @Delete(':id/delete/:idOwner')
    async delete(@Param('id') id, @Param('idOwner') idOwner) : Promise<any>{
        const storage = await this.storagesService.findOne(id);

        if (storage.owner !== idOwner){
            throw new HttpException({
                // status: HttpStatus.CONFLICT,
                error: "Mauvais utilisateur"
            }, 400);
        }

        if (storage.slots.length > 0){
            throw new HttpException({
                // status: HttpStatus.CONFLICT,
                error: "La boite n'est pas vide"
            }, 403);
        }

        return this.storagesService.delete(id);
    }
}