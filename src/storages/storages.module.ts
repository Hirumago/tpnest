import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoragesController } from './storages.controller';
import { StoragesService } from './storages.service';
import { Storage, StorageSchema } from './schemas/storage.schema';
import {PokemonsModule} from "../pokemons/pokemons.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: Storage.name, schema: StorageSchema }]), PokemonsModule],
    controllers: [StoragesController],
    providers: [StoragesService],
})
export class StoragesModule {}