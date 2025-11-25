# API Documentation - Backend Mercantil

## Base URL
```
http://localhost:3001
```

## Configuración
- **Puerto**: 3001
- **CORS**: Habilitado sin restricciones (*)
- **Seguridad**: NINGUNA (passwords en texto plano, sin JWT, sin validaciones)

---

## USUARIOS (Users)

### POST /users/login
Login de usuario (sin JWT, password en texto plano)

**Body:**
```json
{
  "username": "julio",
  "password": "1234"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "julio",
    "firstName": "Julio",
    "lastName": "Baldiviezo",
    "accounts": [...]
  }
}
```

### POST /users
Crear usuario

**Body:**
```json
{
  "username": "usuario",
  "password": "contraseña",
  "firstName": "Nombre",
  "lastName": "Apellido"
}
```

### GET /users
Obtener todos los usuarios (VULNERABLE - expone todo)

### GET /users/:id
Obtener usuario por ID (VULNERABLE a IDOR)

### PATCH /users/:id
Actualizar usuario (sin validación)

**Body:** Cualquier campo del usuario

### DELETE /users/:id
Eliminar usuario (sin validación)

---

## CUENTAS (Accounts)

### POST /accounts
Crear cuenta bancaria

**Body:**
```json
{
  "userId": 1,
  "accountNumber": "4072432644",
  "balance": 1000.00,
  "type": "Caja de Ahorro",
  "alias": "Mi cuenta"
}
```

### GET /accounts
Obtener todas las cuentas (VULNERABLE)

### GET /accounts/:id
Obtener cuenta por ID (VULNERABLE a IDOR)

### GET /accounts/number/:accountNumber
Obtener cuenta por número

**Ejemplo:** `/accounts/number/4072432644`

### GET /accounts/user/:userId
Obtener cuentas por usuario (VULNERABLE a IDOR)

**Ejemplo:** `/accounts/user/1`

### PATCH /accounts/:id
Actualizar cuenta (sin validación)

### PATCH /accounts/:id/balance
Actualizar saldo manualmente (VULNERABLE - permite manipulación directa)

**Body:**
```json
{
  "amount": 1000.00
}
```

### DELETE /accounts/:id
Eliminar cuenta (sin validación)

---

## TRANSACCIONES (Transactions)

### POST /transactions
Crear transacción (sin validación de fondos)

**Body:**
```json
{
  "accountId": 1,
  "targetAccount": "1234567890",
  "amount": 100.00,
  "description": "Pago de servicios",
  "type": "Débito"
}
```

### POST /transactions/transfer
Realizar transferencia entre cuentas (sin validación de fondos)

**Body:**
```json
{
  "fromAccountId": 1,
  "toAccountNumber": "1234567890",
  "amount": 100.00,
  "description": "Transferencia"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Transferencia exitosa"
}
```

### GET /transactions
Obtener todas las transacciones (VULNERABLE)

### GET /transactions/:id
Obtener transacción por ID (VULNERABLE a IDOR)

### GET /transactions/account/:accountId
Obtener transacciones por cuenta (VULNERABLE a IDOR)

**Ejemplo:** `/transactions/account/1`

### DELETE /transactions/:id
Eliminar transacción (sin validación)

---

## DESTINATARIOS GUARDADOS (Recipients)

### POST /recipients
Guardar destinatario

**Body:**
```json
{
  "userId": 1,
  "accountNumber": "1234567890",
  "alias": "Mamá",
  "bankName": "Banco Mercantil Santa Cruz",
  "accountType": "Caja de Ahorro"
}
```

### GET /recipients
Obtener todos los destinatarios (VULNERABLE)

### GET /recipients/user/:userId
Obtener destinatarios por usuario (VULNERABLE a IDOR)

**Ejemplo:** `/recipients/user/1`

### GET /recipients/:id
Obtener destinatario por ID (VULNERABLE a IDOR)

### PATCH /recipients/:id
Actualizar destinatario (sin validación)

### DELETE /recipients/:id
Eliminar destinatario (sin validación)

---

## Usuarios de Prueba (Seed Data)

### Usuario 1:
- **Username**: `julio`
- **Password**: `1234`
- **Cuenta**: `4072432644`
- **Saldo**: Bs 3.54

### Usuario 2:
- **Username**: `bruno`
- **Password**: `1234`
- **Cuenta**: `1310971001`
- **Saldo**: Bs 5000.00

---

## Configuración de Base de Datos

1. Configurar PostgreSQL en `.env`:
```
DATABASE_URL="postgresql://usuario:password@host:puerto/database"
```

2. Ejecutar migración:
```bash
npm run prisma:migrate
```

3. Sembrar datos iniciales:
```bash
npm run prisma:seed
```

---

## Iniciar el Backend

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

El servidor estará corriendo en `http://localhost:3001`

---

## Vulnerabilidades Intencionales

⚠️ **ESTE BACKEND NO TIENE SEGURIDAD** ⚠️

1. **Passwords en texto plano** - No hay hash
2. **Sin JWT** - No hay autenticación
3. **Sin validación de permisos** - IDOR vulnerable
4. **CORS abierto** - Acepta cualquier origen
5. **Sin validación de fondos** - Permite saldos negativos
6. **Sin rate limiting** - Vulnerable a ataques de fuerza bruta
7. **Expone datos sensibles** - Devuelve passwords, datos de otros usuarios
8. **Sin validación de entrada** - Acepta cualquier dato
9. **SQL Injection potencial** - Sin sanitización
10. **Sin logs de seguridad** - No hay auditoría

---

## Notas Importantes

- Este backend está diseñado específicamente para **pruebas y testing de vulnerabilidades**
- **NO usar en producción**
- Las vulnerabilidades son intencionales para propósitos educativos
- Todos los endpoints están expuestos sin autenticación
