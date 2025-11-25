import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // Crear transacción - SIN validación
  @Post()
  async create(
    @Body()
    createTransactionDto: {
      accountId: number;
      targetAccount: string;
      amount: number;
      description: string;
      type: string;
    },
  ) {
    return this.transactionsService.create(createTransactionDto);
  }

  // Realizar transferencia - SIN validación de fondos
  @Post('transfer')
  async transfer(
    @Body()
    transferDto: {
      fromAccountId: number;
      toAccountNumber: string;
      amount: number;
      description: string;
    },
  ) {
    return this.transactionsService.transfer(transferDto);
  }

  // Obtener todas las transacciones - VULNERABLE
  @Get()
  async findAll() {
    return this.transactionsService.findAll();
  }

  // Obtener transacción por ID - VULNERABLE a IDOR
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  // Obtener transacciones por cuenta - VULNERABLE a IDOR
  @Get('account/:accountId')
  async findByAccountId(@Param('accountId') accountId: string) {
    return this.transactionsService.findByAccountId(+accountId);
  }

  // Eliminar transacción - SIN validación
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
