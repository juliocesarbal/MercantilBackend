import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  // Crear cuenta bancaria
  async create(data: {
    userId: number;
    accountNumber: string;
    balance?: number;
    type: string;
    alias?: string;
  }) {
    return this.prisma.account.create({
      data,
    });
  }

  // Obtener todas las cuentas - VULNERABLE
  async findAll() {
    return this.prisma.account.findMany({
      include: {
        user: true,
        transactions: true,
      },
    });
  }

  // Obtener cuenta por ID - VULNERABLE a IDOR
  async findOne(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        user: true,
        transactions: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
  }

  // Obtener cuenta por número - VULNERABLE
  async findByAccountNumber(accountNumber: string) {
    return this.prisma.account.findUnique({
      where: { accountNumber },
      include: {
        user: true,
        transactions: {
          orderBy: {
            date: 'desc',
          },
          take: 20,
        },
      },
    });
  }

  // Obtener cuentas por usuario - VULNERABLE a IDOR
  async findByUserId(userId: number) {
    return this.prisma.account.findMany({
      where: { userId },
      include: {
        transactions: {
          orderBy: {
            date: 'desc',
          },
          take: 10,
        },
      },
    });
  }

  // Actualizar cuenta - SIN validación
  async update(id: number, data: any) {
    return this.prisma.account.update({
      where: { id },
      data,
    });
  }

  // Actualizar saldo - SIN validación (VULNERABLE a manipulación)
  async updateBalance(id: number, amount: number) {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) throw new Error('Cuenta no encontrada');

    return this.prisma.account.update({
      where: { id },
      data: {
        balance: account.balance + amount,
      },
    });
  }

  // Eliminar cuenta - SIN validación
  async remove(id: number) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
