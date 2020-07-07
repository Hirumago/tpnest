import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {PokemonsModule} from "./pokemons/pokemons.module";
import {StoragesModule} from "./storages/storages.module";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PokemonsModule, StoragesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})

export class AppModule {}
