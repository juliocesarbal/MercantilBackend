import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Configurar el adapter de PostgreSQL
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  // Limpiar datos existentes
  console.log('🗑️  Limpiando datos existentes...');
  await prisma.savedRecipient.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Datos limpiados\n');

  // ========================================
  // CREAR USUARIOS
  // ========================================
  console.log('👤 Creando usuarios...');

  const julio = await prisma.user.create({
    data: {
      username: 'julio',
      password: '1234', // TEXTO PLANO - VULNERABLE
      firstName: 'Julio',
      lastName: 'Baldiviezo Moron',
    },
  });

  const bruno = await prisma.user.create({
    data: {
      username: 'bruno',
      password: '1234',
      firstName: 'Bruno',
      lastName: 'Bulacia Paz',
    },
  });

  const joel = await prisma.user.create({
    data: {
      username: 'joel',
      password: '1234',
      firstName: 'Joel',
      lastName: 'Martinez Lopez',
    },
  });

  const claudia = await prisma.user.create({
    data: {
      username: 'claudia',
      password: '1234',
      firstName: 'Claudia',
      lastName: 'Fernandez Rojas',
    },
  });

  const maria = await prisma.user.create({
    data: {
      username: 'maria',
      password: '1234',
      firstName: 'Maria',
      lastName: 'Garcia Suarez',
    },
  });

  console.log('✅ Usuarios creados:', {
    julio: julio.username,
    bruno: bruno.username,
    joel: joel.username,
    claudia: claudia.username,
    maria: maria.username,
  });
  console.log();

  // ========================================
  // CREAR CUENTAS BANCARIAS
  // ========================================
  console.log('🏦 Creando cuentas bancarias...');

  // Cuentas de Julio (3 cuentas)
  const julioAhorro = await prisma.account.create({
    data: {
      userId: julio.id,
      accountNumber: '4072432644',
      balance: 10000.0,
      type: 'Caja de Ahorro',
      alias: 'Caja de Ahorro',
    },
  });

  const julioCorriente = await prisma.account.create({
    data: {
      userId: julio.id,
      accountNumber: '4072432645',
      balance: 5000.0,
      type: 'Cuenta Corriente',
      alias: 'Cuenta Corriente Principal',
    },
  });

  const julioDolares = await prisma.account.create({
    data: {
      userId: julio.id,
      accountNumber: '4072432646',
      balance: 2500.0,
      type: 'Caja de Ahorro Dólares',
      alias: 'Ahorros en Dólares',
    },
  });

  // Cuentas de Bruno
  const brunoAhorro = await prisma.account.create({
    data: {
      userId: bruno.id,
      accountNumber: '1310971001',
      balance: 10000.0,
      type: 'Caja de Ahorro',
      alias: 'Caja de Ahorro Principal',
    },
  });

  const brunoCorriente = await prisma.account.create({
    data: {
      userId: bruno.id,
      accountNumber: '1310971002',
      balance: 8500.0,
      type: 'Cuenta Corriente',
      alias: 'Cuenta Corriente',
    },
  });

  // Cuentas de Joel
  const joelAhorro = await prisma.account.create({
    data: {
      userId: joel.id,
      accountNumber: '5551234567',
      balance: 10000.0,
      type: 'Caja de Ahorro',
      alias: 'Mi Cuenta de Ahorros',
    },
  });

  const joelCorriente = await prisma.account.create({
    data: {
      userId: joel.id,
      accountNumber: '5551234568',
      balance: 15000.0,
      type: 'Cuenta Corriente',
      alias: 'Cuenta Negocios',
    },
  });

  // Cuentas de Claudia
  const claudiaAhorro = await prisma.account.create({
    data: {
      userId: claudia.id,
      accountNumber: '9876543210',
      balance: 10000.0,
      type: 'Caja de Ahorro',
      alias: 'Caja de Ahorro',
    },
  });

  const claudiaDolares = await prisma.account.create({
    data: {
      userId: claudia.id,
      accountNumber: '9876543211',
      balance: 3000.0,
      type: 'Caja de Ahorro Dólares',
      alias: 'Ahorros USD',
    },
  });

  // Cuenta de Maria
  const mariaAhorro = await prisma.account.create({
    data: {
      userId: maria.id,
      accountNumber: '7778889990',
      balance: 10000.0,
      type: 'Caja de Ahorro',
      alias: 'Cuenta Principal',
    },
  });

  console.log('✅ Cuentas creadas:', {
    julio: '3 cuentas',
    bruno: '2 cuentas',
    joel: '2 cuentas',
    claudia: '2 cuentas',
    maria: '1 cuenta',
  });
  console.log();

  // ========================================
  // CREAR DESTINATARIOS GUARDADOS
  // ========================================
  console.log('📇 Creando destinatarios guardados...');

  // Julio tiene TODOS guardados
  await prisma.savedRecipient.createMany({
    data: [
      {
        userId: julio.id,
        accountNumber: brunoAhorro.accountNumber,
        alias: 'Bruno - Ahorros',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: julio.id,
        accountNumber: brunoCorriente.accountNumber,
        alias: 'Bruno - Corriente',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Cuenta Corriente',
      },
      {
        userId: julio.id,
        accountNumber: joelAhorro.accountNumber,
        alias: 'Joel Martinez',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: julio.id,
        accountNumber: joelCorriente.accountNumber,
        alias: 'Joel - Negocios',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Cuenta Corriente',
      },
      {
        userId: julio.id,
        accountNumber: claudiaAhorro.accountNumber,
        alias: 'Claudia Fernandez',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: julio.id,
        accountNumber: claudiaDolares.accountNumber,
        alias: 'Claudia - USD',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro Dólares',
      },
      {
        userId: julio.id,
        accountNumber: mariaAhorro.accountNumber,
        alias: 'Maria Garcia',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
    ],
  });

  // Bruno tiene algunos guardados
  await prisma.savedRecipient.createMany({
    data: [
      {
        userId: bruno.id,
        accountNumber: julioAhorro.accountNumber,
        alias: 'Julio - Cuenta Principal',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: bruno.id,
        accountNumber: joelAhorro.accountNumber,
        alias: 'Joel - Ahorros',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: bruno.id,
        accountNumber: mariaAhorro.accountNumber,
        alias: 'Maria',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
    ],
  });

  // Joel tiene algunos guardados
  await prisma.savedRecipient.createMany({
    data: [
      {
        userId: joel.id,
        accountNumber: julioAhorro.accountNumber,
        alias: 'Julio Baldiviezo',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: joel.id,
        accountNumber: brunoAhorro.accountNumber,
        alias: 'Bruno Bulacia',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: joel.id,
        accountNumber: claudiaAhorro.accountNumber,
        alias: 'Claudia - Principal',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
    ],
  });

  // Claudia tiene algunos guardados
  await prisma.savedRecipient.createMany({
    data: [
      {
        userId: claudia.id,
        accountNumber: julioAhorro.accountNumber,
        alias: 'Julio',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: claudia.id,
        accountNumber: mariaAhorro.accountNumber,
        alias: 'Maria Garcia',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
    ],
  });

  // Maria tiene algunos guardados
  await prisma.savedRecipient.createMany({
    data: [
      {
        userId: maria.id,
        accountNumber: julioAhorro.accountNumber,
        alias: 'Julio Baldiviezo',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: maria.id,
        accountNumber: claudiaAhorro.accountNumber,
        alias: 'Claudia Fernandez',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
      {
        userId: maria.id,
        accountNumber: joelAhorro.accountNumber,
        alias: 'Joel Martinez',
        bankName: 'Banco Mercantil Santa Cruz',
        accountType: 'Caja de Ahorro',
      },
    ],
  });

  console.log('✅ Destinatarios creados:', {
    julio: '7 destinatarios (TODOS)',
    bruno: '3 destinatarios',
    joel: '3 destinatarios',
    claudia: '2 destinatarios',
    maria: '3 destinatarios',
  });
  console.log();

  // ========================================
  // CREAR TRANSACCIONES
  // ========================================
  console.log('💸 Creando transacciones...');

  // Transacciones de Julio
  const julioTransactions = [
    {
      accountId: julioAhorro.id,
      targetAccount: 'APPLE.COM/BILL',
      amount: 83.57,
      description: 'POS/C.INTERNET APPLE.COM/BILL 866-712-7753 US',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: julioAhorro.id,
      targetAccount: 'NETFLIX',
      amount: 15.99,
      description: 'SUSCRIPCION NETFLIX MENSUAL',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: julioAhorro.id,
      targetAccount: brunoAhorro.accountNumber,
      amount: 500.0,
      description: 'TRANSFERENCIA A BRUNO BULACIA',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: julioAhorro.id,
      targetAccount: 'SPOTIFY',
      amount: 9.99,
      description: 'SUSCRIPCION SPOTIFY PREMIUM',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: julioAhorro.id,
      targetAccount: 'MERCADO LIBRE',
      amount: 250.0,
      description: 'COMPRA MERCADO LIBRE',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: julioAhorro.id,
      targetAccount: 'DEPOSITO',
      amount: 3000.0,
      description: 'DEPOSITO EN EFECTIVO CAJERO',
      type: 'Crédito',
      status: 'Exitoso',
    },
    {
      accountId: julioCorriente.id,
      targetAccount: joelAhorro.accountNumber,
      amount: 1000.0,
      description: 'PAGO SERVICIO JOEL MARTINEZ',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: julioCorriente.id,
      targetAccount: 'ENTEL',
      amount: 150.0,
      description: 'PAGO SERVICIO INTERNET ENTEL',
      type: 'Débito',
      status: 'Exitoso',
    },
  ];

  // Transacciones de Bruno
  const brunoTransactions = [
    {
      accountId: brunoAhorro.id,
      targetAccount: julioAhorro.accountNumber,
      amount: 500.0,
      description: 'CREDITO TRANSFERENCIA JULIO BALDIVIEZO',
      type: 'Crédito',
      status: 'Exitoso',
    },
    {
      accountId: brunoAhorro.id,
      targetAccount: 'AMAZON',
      amount: 125.50,
      description: 'COMPRA AMAZON.COM',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: brunoAhorro.id,
      targetAccount: mariaAhorro.accountNumber,
      amount: 800.0,
      description: 'TRANSFERENCIA A MARIA GARCIA',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: brunoCorriente.id,
      targetAccount: 'SUELDO',
      amount: 5000.0,
      description: 'ACREDITACION SUELDO MENSUAL',
      type: 'Crédito',
      status: 'Exitoso',
    },
  ];

  // Transacciones de Joel
  const joelTransactions = [
    {
      accountId: joelAhorro.id,
      targetAccount: julioCorriente.accountNumber,
      amount: 1000.0,
      description: 'COBRO SERVICIO PRESTADO',
      type: 'Crédito',
      status: 'Exitoso',
    },
    {
      accountId: joelCorriente.id,
      targetAccount: claudiaAhorro.accountNumber,
      amount: 2500.0,
      description: 'PAGO PROVEEDOR CLAUDIA FERNANDEZ',
      type: 'Débito',
      status: 'Exitoso',
    },
    {
      accountId: joelCorriente.id,
      targetAccount: 'ALQUILER',
      amount: 3000.0,
      description: 'PAGO ALQUILER OFICINA',
      type: 'Débito',
      status: 'Exitoso',
    },
  ];

  // Transacciones de Claudia
  const claudiaTransactions = [
    {
      accountId: claudiaAhorro.id,
      targetAccount: joelCorriente.accountNumber,
      amount: 2500.0,
      description: 'PAGO RECIBIDO JOEL MARTINEZ',
      type: 'Crédito',
      status: 'Exitoso',
    },
    {
      accountId: claudiaAhorro.id,
      targetAccount: 'FARMACIA',
      amount: 350.0,
      description: 'COMPRA FARMACIA CHÁVEZ',
      type: 'Débito',
      status: 'Exitoso',
    },
  ];

  // Transacciones de Maria
  const mariaTransactions = [
    {
      accountId: mariaAhorro.id,
      targetAccount: brunoAhorro.accountNumber,
      amount: 800.0,
      description: 'RECIBIDO DE BRUNO BULACIA',
      type: 'Crédito',
      status: 'Exitoso',
    },
    {
      accountId: mariaAhorro.id,
      targetAccount: 'SUPERMERCADO',
      amount: 450.0,
      description: 'COMPRA SUPERMERCADO FIDALGA',
      type: 'Débito',
      status: 'Exitoso',
    },
  ];

  // Crear todas las transacciones
  const allTransactions = [
    ...julioTransactions,
    ...brunoTransactions,
    ...joelTransactions,
    ...claudiaTransactions,
    ...mariaTransactions,
  ];

  for (const tx of allTransactions) {
    await prisma.transaction.create({
      data: tx,
    });
  }

  console.log('✅ Transacciones creadas:', {
    julio: julioTransactions.length,
    bruno: brunoTransactions.length,
    joel: joelTransactions.length,
    claudia: claudiaTransactions.length,
    maria: mariaTransactions.length,
    total: allTransactions.length,
  });
  console.log();

  // ========================================
  // RESUMEN FINAL
  // ========================================
  console.log('=' .repeat(50));
  console.log('✅ SEED COMPLETADO EXITOSAMENTE!');
  console.log('=' .repeat(50));
  console.log('\n📊 RESUMEN DE DATOS:\n');
  console.log('👤 Usuarios creados: 5');
  console.log('   - julio (password: 1234)');
  console.log('   - bruno (password: 1234)');
  console.log('   - joel (password: 1234)');
  console.log('   - claudia (password: 1234)');
  console.log('   - maria (password: 1234)');
  console.log();
  console.log('🏦 Cuentas bancarias: 10');
  console.log('   - Julio: 3 cuentas (Balance: Bs 10,000 c/u)');
  console.log('   - Bruno: 2 cuentas (Balance: Bs 10,000)');
  console.log('   - Joel: 2 cuentas (Balance: Bs 10,000)');
  console.log('   - Claudia: 2 cuentas (Balance: Bs 10,000)');
  console.log('   - Maria: 1 cuenta (Balance: Bs 10,000)');
  console.log();
  console.log('📇 Destinatarios guardados: 18');
  console.log('   - Julio: 7 destinatarios (TODOS los demás)');
  console.log('   - Bruno: 3 destinatarios');
  console.log('   - Joel: 3 destinatarios');
  console.log('   - Claudia: 2 destinatarios');
  console.log('   - Maria: 3 destinatarios');
  console.log();
  console.log(`💸 Transacciones: ${allTransactions.length}`);
  console.log();
  console.log('🚀 Listo para usar!');
  console.log('=' .repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
