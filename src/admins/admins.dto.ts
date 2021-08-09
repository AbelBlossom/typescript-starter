import { PartialType } from '@nestjs/mapped-types';
import { Game } from 'src/schemas/game.schema';

export class GameUpdateDto extends PartialType(Game) {}
