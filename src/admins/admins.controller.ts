import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Game } from 'src/schemas/game.schema';
import { GameUpdateDto } from './admins.dto';
import { AdminsGuard } from './admins.guard';
import { AdminsService } from './admins.service';

@UseGuards(AdminsGuard)
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}
  @Post()
  createGame(@Body() body: Game) {
    return this.adminsService.createGame(body);
    return 'yeah';
  }

  @Put(':id')
  updateGame(@Body() body: GameUpdateDto, @Param('id') id: string) {
    return this.adminsService.updateGame(id, body);
  }

  @Get()
  getGames() {
    return this.adminsService.getGames();
  }

  @Delete(':id')
  deleteGame(@Param('id') id: string) {
    return this.adminsService.deleteGame(id);
  }
}
