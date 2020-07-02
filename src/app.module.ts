import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {PokemonsModule} from "./pokemons/pokemons.module";
import {StoragesModule} from "./storages/storages.module";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PokemonsModule, StoragesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
