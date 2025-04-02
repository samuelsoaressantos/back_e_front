// Função para realizar a requisição POST com a API
async function sendRequest(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Erro no servidor');
      }
  
      return result;
    } catch (error) {
      throw new Error(error.message || 'Erro desconhecido');
    }
  }
  
  // Cadastro de usuário
  document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;
  
    try {
      const response = await sendRequest('http://localhost:5000/cadastro', { nome, email, senha });
      document.getElementById('mensagem-cadastro').textContent = response.message;
      document.getElementById('mensagem-cadastro').style.color = 'green';
    } catch (error) {
      document.getElementById('mensagem-cadastro').textContent = error.message;
      document.getElementById('mensagem-cadastro').style.color = 'red';
    }
  });
  
  // Login de usuário
  document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;
  
    try {
      const response = await sendRequest('http://localhost:5000/login', { email, senha });
      document.getElementById('mensagem-login').textContent = response.message;
      document.getElementById('mensagem-login').style.color = 'green';
  
      // Exibe o token JWT após login bem-sucedido
      alert(`Token JWT: ${response.token}`);
    } catch (error) {
      document.getElementById('mensagem-login').textContent = error.message;
      document.getElementById('mensagem-login').style.color = 'red';
    }
  });
  