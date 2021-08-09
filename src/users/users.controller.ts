import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Trans } from 'src/schemas/transaction.schema';
import { User } from 'src/schemas/user.schema';
import { LoginDto, RequestDto, UserUpdateDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() body: User) {
    const _temp = await this.userService.findByEmail(body.email);
    if (_temp) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }
    const user = await this.userService.register(body);
    return user;
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return this.userService.login(email, password);
  }

  @Get('games')
  async getAll(@Req() req) {
    return this.userService.getGames();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Body() body: UserUpdateDto, @Request() req: RequestDto) {
    return this.userService.update(req.user._id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transactions')
  async createTransaction(@Body() body: Trans) {
    return this.userService.addTransaction(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('transactions/:id')
  async updateTransactionData(
    @Body('data') data: string,
    @Param('id') id: string,
    @Request() req: RequestDto,
  ) {
    const user = req.user._id;
    return this.userService.updateTransactionData({ id, user }, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('transaction')
  async getTransactions(@Request() req: RequestDto) {
    return this.getTransactions(req.user._id);
  }
}
