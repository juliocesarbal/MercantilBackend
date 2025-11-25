import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Login SIN seguridad - password en texto plano
  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        accounts: true,
      },
    });

    // Comparación directa de password en texto plano - VULNERABLE
    if (user && user.password === password) {
      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          accounts: user.accounts,
        },
      };
    }

    return { success: false, message: 'Usuario o contraseña incorrectos' };
  }

  // Crear usuario - password en texto plano
  async createUser(data: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.prisma.user.create({
      data,
    });
  }

  // Obtener todos los usuarios (VULNERABLE - expone todo)
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        accounts: true,
        savedRecipients: true,
      },
    });
  }

  // Obtener usuario por ID - SIN validación de permisos (IDOR)
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
        savedRecipients: true,
      },
    });
  }

  // Actualizar usuario - SIN validación
  async update(id: number, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Eliminar usuario - SIN validación
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
