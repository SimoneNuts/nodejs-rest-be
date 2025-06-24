# API REST Node.js con Express

## 📋 Descrizione
Un'API REST robusta e sicura costruita con Node.js ed Express. Il progetto implementa autenticazione JWT, validazione dei dati con Joi, e documentazione API con Swagger.

## 🚀 Caratteristiche Principali
- Autenticazione JWT
- Validazione dei dati con Joi
- Documentazione API con Swagger UI
- Database SQLite con better-sqlite3
- Test con Jest e Supertest
- Gestione sicura delle password con bcrypt

## 🛠️ Tecnologie Utilizzate
- Node.js
- Express 5.1.0
- JWT (jsonwebtoken 9.0.2)
- SQLite (better-sqlite3 11.10.0)
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
   env PORT=3000 JWT_SECRET=il_tuo_secret_jwt
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

## 📁 Struttura del Progetto
```plaintext
.
├── src/
│   ├── app.js
│   ├── middlewares/
│   ├── routes/
│   └── controllers/
├── tests/
├── data/
└── package.json
```

## 🤝 Come Contribuire
1. Fai il fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa i tuoi cambiamenti (`git commit -m 'Add some AmazingFeature'`)
4. Pusha al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## ✍️ Autori
- Il tuo nome - [SimoneNuts](https://github.com/SimoneNuts)
