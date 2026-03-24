import { Controller, Delete, Get, Param, Put, Req, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getCurrentUser(@Req() req: any) {
    const userId = req.user?.sub;
    if (!userId) return null;
    return this.usersService.findByIdentifier(String(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:identifier')
  async findOne(@Param('identifier') identifier: string) {
    return this.usersService.findByIdentifier(identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:identifier')
  async update(@Param('identifier') identifier: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(identifier, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:identifier')
  async remove(@Param('identifier') identifier: string) {
    return this.usersService.remove(identifier);
  }
}

