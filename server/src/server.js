const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3001;

// Importando as rotas
const routes = require('./routes/routes');

// Configurando o middleware CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permitir apenas requisições do frontend local
}));

// Configurando o middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use('/', routes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
