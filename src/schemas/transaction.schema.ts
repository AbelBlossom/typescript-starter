import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import { Document } from 'mongoose';

export type TransDocument = Trans & Document;

@Schema()
export class Trans {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  reference: string;

  @Prop()
  access_code: string;

  @Prop()
  authorization_url: string;

  @Prop({ default: null })
  data: string;
}

export const TransSchema = SchemaFactory.createForClass(Trans);
