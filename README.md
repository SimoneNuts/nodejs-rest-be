# API REST Node.js con Express

## 📋 Descrizione
Un'API REST robusta e sicura costruita con Node.js ed Express. Il progetto implementa autenticazione JWT, validazione dei dati con Joi, e documentazione API con Swagger.
Utilizza Knex come query builder per gestire il database SQLite in modo più flessibile e modulare.

## 🚀 Caratteristiche Principali
- Autenticazione JWT
- Validazione dei dati con Joi
- Documentazione API con Swagger UI
- Database SQLite gestito tramite Knex
- Test con Jest e Supertest
- Gestione sicura delle password con bcrypt

## 🛠️ Tecnologie Utilizzate
- Node.js
- Express 5.1.0
- JWT (jsonwebtoken 9.0.2)
- SQLite con Knex 2.x
- Jest 30.0.2
- Swagger UI Express 5.0.1
- Joi 17.13.3
- Bcrypt 6.0.0

## ⚙️ Installazione

1. Clona il repository:
```bash
    git clone <url-repository>
```
2. Installa le dipendenze:
```bash
    npm install
```
3. Crea un file `.env` nella root del progetto:
```ini
   env PORT=3000
   JWT_SECRET=il_tuo_secret_jwt
```
4. Avvia il server:
```bash
    npm start
```

## 🧪 Test
Esegui i test con:
```bash
npm test
```

## 📚 Documentazione API
La documentazione Swagger è disponibile all'indirizzo:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🔒 Sicurezza
- Autenticazione basata su JWT
- Hashing delle password con bcrypt
- Validazione input con Joi
- Middleware di protezione delle route

## ✍️ Autore
- Simone Le Noci - [SimoneNuts](https://github.com/SimoneNuts)
