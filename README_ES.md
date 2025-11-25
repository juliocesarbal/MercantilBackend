# Backend Mercantil - Sistema Bancario Vulnerable

Backend de aplicación bancaria desarrollado con **NestJS** y **Prisma ORM** con **CERO SEGURIDAD** para propósitos de testing y educación en ciberseguridad.

## Tecnologías

- **NestJS** 11.x
- **Prisma ORM** 7.x
- **PostgreSQL**
- **TypeScript**

## Estructura del Proyecto

```
BackendMercantil/
├── prisma/
│   ├── schema.prisma       # Modelos de base de datos
│   ├── seed.ts             # Datos iniciales
│   └── migrations/         # Migraciones de DB
├── src/
│   ├── users/              # Módulo de usuarios
│   ├── accounts/           # Módulo de cuentas
│   ├── transactions/       # Módulo de transacciones
│   ├── recipients/         # Módulo de destinatarios
│   ├── prisma.service.ts   # Servicio de Prisma
│   ├── app.module.ts       # Módulo principal
│   └── main.ts             # Punto de entrada
├── .env                    # Variables de entorno
└── API_DOCUMENTATION.md    # Documentación de endpoints
```

## Modelos de Base de Datos

### User (Usuarios)
- id, username, password (texto plano), firstName, lastName

### Account (Cuentas Bancarias)
- id, userId, accountNumber, balance, type, alias

### Transaction (Transacciones)
- id, accountId, targetAccount, amount, date, description, type, status

### SavedRecipient (Destinatarios Guardados)
- id, userId, accountNumber, alias, bankName, accountType

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar base de datos en `.env`:
```env
DATABASE_URL="postgresql://usuario:password@host:puerto/database"
```

4. Generar cliente de Prisma:
```bash
npm run prisma:generate
```

5. Ejecutar migraciones:
```bash
npm run prisma:migrate
```

6. Sembrar datos iniciales:
```bash
npm run prisma:seed
```

## Ejecutar el Proyecto

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

El servidor estará disponible en: `http://localhost:3001`

## Endpoints Principales

### Autenticación (sin JWT)
- `POST /users/login` - Login

### Usuarios
- `POST /users` - Crear usuario
- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario

### Cuentas
- `POST /accounts` - Crear cuenta
- `GET /accounts/user/:userId` - Cuentas por usuario
- `GET /accounts/number/:accountNumber` - Cuenta por número

### Transacciones
- `POST /transactions/transfer` - Transferir dinero
- `GET /transactions/account/:accountId` - Transacciones por cuenta

### Destinatarios
- `POST /recipients` - Guardar destinatario
- `GET /recipients/user/:userId` - Destinatarios por usuario

Ver [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) para documentación completa.

## Usuarios de Prueba

**Usuario 1:**
- Username: `julio`
- Password: `1234`
- Cuenta: `4072432644`

**Usuario 2:**
- Username: `bruno`
- Password: `1234`
- Cuenta: `1310971001`

## Vulnerabilidades Intencionales

⚠️ **ESTE PROYECTO NO TIENE SEGURIDAD** ⚠️

### Vulnerabilidades Implementadas:

1. **Passwords en texto plano** - Sin hash ni encriptación
2. **Sin autenticación JWT** - No hay tokens
3. **IDOR** - Acceso directo por ID sin validación
4. **CORS abierto** - Acepta cualquier origen
5. **Sin validación de fondos** - Permite saldos negativos
6. **Sin rate limiting** - Vulnerable a brute force
7. **Exposición de datos** - API devuelve passwords
8. **Sin validación de entrada** - Acepta cualquier input
9. **Sin sanitización** - Vulnerable a injection
10. **Sin logs de seguridad** - No hay auditoría

## Propósito Educativo

Este backend está diseñado exclusivamente para:
- Testing de vulnerabilidades
- Educación en ciberseguridad
- Práctica de pentesting
- Demostración de malas prácticas

**⚠️ NO USAR EN PRODUCCIÓN ⚠️**

## Scripts Disponibles

```bash
npm run start:dev       # Iniciar en modo desarrollo
npm run build           # Compilar proyecto
npm run start:prod      # Iniciar en producción
npm run prisma:generate # Generar cliente de Prisma
npm run prisma:migrate  # Ejecutar migraciones
npm run prisma:seed     # Sembrar datos iniciales
```

## Conexión con Frontend

El frontend Next.js debe conectarse a:
```
http://localhost:3001
```

CORS está configurado para aceptar cualquier origen.

## Licencia

Este proyecto es solo para fines educativos. No usar en producción.
