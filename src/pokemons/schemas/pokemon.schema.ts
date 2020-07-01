import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
    @Prop()
    rank: number;

    @Prop()
    name: string;

    @Prop()
    type1: string;

    @Prop()
    type2: string;

    @Prop()
    level: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);