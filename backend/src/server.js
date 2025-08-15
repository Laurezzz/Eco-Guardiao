const express = require('express');
const cors = require('cors');
const db = require('./db_config'); 

const app = express();
const porta = 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    const { email, senha } = req.body;

    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    db.query(query, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar.' });
        }
        res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
    });
});


// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    const query = 'SELECT id, email FROM usuarios WHERE email = ? AND senha = ?';
    db.query(query, [email, senha], (err, results) => {
      if (err) {
        console.error('Erro ao fazer login:', err);
        return res.status(500).json({ success: false, message: 'Erro ao fazer login' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'E-mail ou senha incorretos' });
      }
  
      
      const userId = results[0].id;
      db.query(
        'INSERT IGNORE INTO perfis (user_id) VALUES (?)',
        [userId],
        (err) => {
          if (err) console.error('Erro ao verificar perfil:', err);
          
          res.json({ 
            success: true,
            message: 'Login realizado com sucesso',
            user: results[0]
          });
        }
      );
    });
  });
  
  
  app.get('/usuarios', (req, res) => {
      const query = 'SELECT id, email FROM usuarios';
  
      db.query(query, (err, results) => {
          if (err) {
              console.error('Erro ao buscar usuários:', err);
              return res.status(500).json({ success: false, message: 'Erro ao buscar usuários.' });
          }
          res.json({ success: true, usuarios: results });
      });
  });
  
  // Obter usuário por ID
  app.get('/usuarios/:id', (req, res) => {
      const { id } = req.params;
  
      const query = 'SELECT id, email FROM usuarios WHERE id = ?';
      db.query(query, [id], (err, results) => {
          if (err) {
              console.error('Erro ao buscar usuário:', err);
              return res.status(500).json({ success: false, message: 'Erro ao buscar usuário.' });
          }
  
          if (results.length === 0) {
              return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
          }
  
          res.json({ success: true, usuario: results[0] });
      });
  });
  
  // Editar Usuário
  app.put('/usuarios/editar/:id', (req, res) => {
      const { id } = req.params;
      const {email, senha } = req.body;
  
      const query = 'UPDATE usuarios SET  email = ?, senha = ? WHERE id = ?';
      db.query(query, [email, senha, id], (err, result) => {
          if (err) {
              console.error('Erro ao editar usuário:', err);
              return res.status(500).json({ success: false, message: 'Erro ao editar usuário.' });
          }
          res.json({ success: true, message: 'Usuário editado com sucesso!' });
      });
  });
  
  // Deletar Usuário
  app.delete('/usuarios/deletar/:id', (req, res) => {
      const { id } = req.params;
  
      const query = 'DELETE FROM usuarios WHERE id = ?';
      db.query(query, [id], (err, result) => {
          if (err) {
              console.error('Erro ao deletar usuário:', err);
              return res.status(500).json({ success: false, message: 'Erro ao deletar usuário.' });
          }
          res.json({ success: true, message: 'Usuário deletado com sucesso!' });
      });
  });
  



app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));