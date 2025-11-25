import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Login - SIN seguridad
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.usersService.login(loginDto.username, loginDto.password);
  }

  // Crear usuario
  @Post()
  async create(
    @Body()
    createUserDto: {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ) {
    return this.usersService.createUser(createUserDto);
  }

  // Obtener todos los usuarios - VULNERABLE
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Obtener usuario por ID - VULNERABLE a IDOR
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // Actualizar usuario - SIN validación
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Eliminar usuario - SIN validación
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
