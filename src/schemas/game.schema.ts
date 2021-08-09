import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @IsNumber()
  @Prop({ required: true })
  closeDate: number;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isClosed: boolean;

  @Prop()
  handler: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
GameSchema.pre<GameDocument>('save', function (next) {
  if (!this.isNew) return next();
  const _d = new Date();
  console.log(_d.toLocaleDateString());
  this.handler = _d.toLocaleDateString();
  return next();
});
