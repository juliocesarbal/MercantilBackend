import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  // Crear cuenta
  @Post()
  async create(
    @Body()
    createAccountDto: {
      userId: number;
      accountNumber: string;
      balance?: number;
      type: string;
      alias?: string;
    },
  ) {
    return this.accountsService.create(createAccountDto);
  }

  // Obtener todas las cuentas - VULNERABLE
  @Get()
  async findAll() {
    return this.accountsService.findAll();
  }

  // Obtener cuenta por ID - VULNERABLE a IDOR
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  // Obtener cuenta por número
  @Get('number/:accountNumber')
  async findByAccountNumber(@Param('accountNumber') accountNumber: string) {
    return this.accountsService.findByAccountNumber(accountNumber);
  }

  // Obtener cuentas por usuario - VULNERABLE a IDOR
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.accountsService.findByUserId(+userId);
  }

  // Actualizar cuenta - SIN validación
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccountDto: any) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  // Actualizar saldo - VULNERABLE
  @Patch(':id/balance')
  async updateBalance(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ) {
    return this.accountsService.updateBalance(+id, body.amount);
  }

  // Eliminar cuenta - SIN validación
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
