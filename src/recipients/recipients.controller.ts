import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipientsService } from './recipients.service';

@Controller('recipients')
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) {}

  // Crear destinatario guardado
  @Post()
  async create(
    @Body()
    createRecipientDto: {
      userId: number;
      accountNumber: string;
      alias: string;
      bankName?: string;
      accountType?: string;
    },
  ) {
    return this.recipientsService.create(createRecipientDto);
  }

  // Obtener todos los destinatarios - VULNERABLE
  @Get()
  async findAll() {
    return this.recipientsService.findAll();
  }

  // Obtener destinatarios por usuario - VULNERABLE a IDOR
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.recipientsService.findByUserId(+userId);
  }

  // Obtener destinatario por ID - VULNERABLE a IDOR
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipientsService.findOne(+id);
  }

  // Actualizar destinatario - SIN validación
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRecipientDto: any) {
    return this.recipientsService.update(+id, updateRecipientDto);
  }

  // Eliminar destinatario - SIN validación
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipientsService.remove(+id);
  }
}
