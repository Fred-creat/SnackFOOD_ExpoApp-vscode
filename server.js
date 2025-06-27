const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Estoque inicial (adicione os produtos conforme seu cardápio)
let estoque = [
  { nome: 'Bolo de 15cm ', quantidade: 10 },
  { nome: 'Bolo de 20cm  ', quantidade: 5 },
  { nome: 'Bolo de 25', quantidade: 3 },
  { nome: 'Bolo de 30', quantidade: 2 },
  { nome: 'Trufas-100un', quantidade: 10 },
  { nome: 'Brigadeiro-100un', quantidade: 10 },
  { nome: 'Beijinhos-100un', quantidade: 10 },
  { nome: 'Casadinho-100un', quantidade: 10 },
  { nome: 'Cajuzinho-100un', quantidade: 10 },
  { nome: 'Moranguinho-100un', quantidade: 10 },
  { nome: 'Uva Encapada-100un', quantidade: 10 },
  { nome: 'Cerejinha-100un', quantidade: 10 },
  { nome: 'Coxinha', quantidade: 100 },
  { nome: 'Pastel', quantidade: 100 },
  { nome: 'Bolinha de Queijo', quantidade: 100 },
  { nome: 'Kibe', quantidade: 100 },
  { nome: 'Enroladinho', quantidade: 100 },
  { nome: 'Camarão Empanado', quantidade: 50 },
];

// Lista para armazenar pedidos recebidos
let pedidosRecebidos = [];

// Endpoint para consultar estoque
app.get('/estoque', (req, res) => {
  res.json(estoque);
});

// Endpoint para consultar todos os pedidos recebidos
app.get('/pedidos', (req, res) => {
  res.json(pedidosRecebidos);
});

// Endpoint para receber pedidos e atualizar estoque
app.post('/pedidos', (req, res) => {
  const pedido = req.body;
  console.log('DEBUG pedido recebido:', JSON.stringify(pedido, null, 2)); // <-- Adicionado log detalhado
  let erroEstoque = [];
  // Verifica e atualiza estoque
  pedido.itens.forEach(item => {
    const prod = estoque.find(e => e.nome === item.name);
    if (prod) {
      if (prod.quantidade >= item.qty) {
        prod.quantidade -= item.qty;
      } else {
        erroEstoque.push({ nome: prod.nome, disponivel: prod.quantidade });
      }
    }
  });
  if (erroEstoque.length > 0) {
    return res.status(400).json({ status: 'erro', mensagem: 'Estoque insuficiente', erroEstoque });
  }
  pedidosRecebidos.push(pedido);
  console.log('Pedido recebido:', pedido);
  res.json({ status: 'ok', mensagem: 'Pedido recebido com sucesso!', pedido });
});

app.get('/', (req, res) => {
  res.send('Servidor backend rodando!');
});

// Middleware para tratar erros e sempre retornar JSON
app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({ status: 'erro', mensagem: 'Erro interno do servidor', erro: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
