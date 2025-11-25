import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecipientsService {
  constructor(private prisma: PrismaService) {}

  // Crear destinatario guardado
  async create(data: {
    userId: number;
    accountNumber: string;
    alias: string;
    bankName?: string;
    accountType?: string;
  }) {
    return this.prisma.savedRecipient.create({
      data,
    });
  }

  // Obtener todos los destinatarios - VULNERABLE
  async findAll() {
    return this.prisma.savedRecipient.findMany({
      include: {
        user: true,
      },
    });
  }

  // Obtener destinatarios por usuario - VULNERABLE a IDOR
  async findByUserId(userId: number) {
    return this.prisma.savedRecipient.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Obtener destinatario por ID - VULNERABLE a IDOR
  async findOne(id: number) {
    return this.prisma.savedRecipient.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  // Actualizar destinatario - SIN validación
  async update(id: number, data: any) {
    return this.prisma.savedRecipient.update({
      where: { id },
      data,
    });
  }

  // Eliminar destinatario - SIN validación
  async remove(id: number) {
    return this.prisma.savedRecipient.delete({
      where: { id },
    });
  }
}
