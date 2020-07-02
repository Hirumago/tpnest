import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Storage extends Document {
    @Prop()
    rank: number;

    @Prop()
    name: string;

    @Prop()
    slots: any;

    @Prop()
    type1: string;

    @Prop()
    type2: string;
}

export const StorageSchema = SchemaFactory.createForClass(Storage);