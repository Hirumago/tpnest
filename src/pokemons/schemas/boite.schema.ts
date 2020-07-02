import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {BoitePokemonDto} from "../dto/boite-pokemon.dto";

@Schema()
export class BoiteSchema extends Document {
    @Prop()
    rank: number;

    @Prop()
    name: string;

    @Prop()
    slot: string;


}

export const PokemonSchema = SchemaFactory.createForClass(BoitePokemonDto);
