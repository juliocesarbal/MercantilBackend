import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  // Crear transacción - SIN validación de fondos (VULNERABLE)
  async create(data: {
    accountId: number;
    targetAccount: string;
    amount: number;
    description: string;
    type: string;
  }) {
    // Crear la transacción SIN verificar saldo
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
        status: 'Exitoso', // Siempre exitoso - VULNERABLE
      },
    });

    // Actualizar saldos SIN validación
    const account = await this.prisma.account.findUnique({
      where: { id: data.accountId },
    });

    if (!account) throw new Error('Cuenta no encontrada');

    if (data.type === 'Débito') {
      await this.prisma.account.update({
        where: { id: data.accountId },
        data: {
          balance: account.balance - data.amount,
        },
      });
    } else {
      await this.prisma.account.update({
        where: { id: data.accountId },
        data: {
          balance: account.balance + data.amount,
        },
      });
    }

    return transaction;
  }

  // Transferencia entre cuentas - SIN validación de fondos
  async transfer(data: {
    fromAccountId: number;
    toAccountNumber: string;
    amount: number;
    description: string;
  }) {
    // Buscar cuenta destino
    const toAccount = await this.prisma.account.findUnique({
      where: { accountNumber: data.toAccountNumber },
    });

    if (!toAccount) {
      throw new Error('Cuenta destino no encontrada');
    }

    // Crear transacción de débito
    await this.create({
      accountId: data.fromAccountId,
      targetAccount: data.toAccountNumber,
      amount: data.amount,
      description: data.description,
      type: 'Débito',
    });

    // Crear transacción de crédito
    const fromAccount = await this.prisma.account.findUnique({
      where: { id: data.fromAccountId },
    });

    if (!fromAccount) throw new Error('Cuenta origen no encontrada');

    await this.create({
      accountId: toAccount.id,
      targetAccount: fromAccount.accountNumber,
      amount: data.amount,
      description: data.description,
      type: 'Crédito',
    });

    return { success: true, message: 'Transferencia exitosa' };
  }

  // Obtener todas las transacciones - VULNERABLE
  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        account: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  // Obtener transacción por ID - VULNERABLE a IDOR
  async findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        account: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  // Obtener transacciones por cuenta - VULNERABLE a IDOR
  async findByAccountId(accountId: number) {
    return this.prisma.transaction.findMany({
      where: { accountId },
      orderBy: {
        date: 'desc',
      },
    });
  }

  // Eliminar transacción - SIN validación
  async remove(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
