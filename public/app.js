// Função para realizar a requisição POST com a API
async function sendRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

// Função para exibir mensagens
function showMessage(elementId, message, color) {
  const messageElement = document.getElementById(elementId);
  messageElement.textContent = message;
  messageElement.style.color = color;
}

// Redirecionar para a página index.html
function redirectToIndex() {
  window.location.href = 'index.html'; // Redireciona para index.html após sucesso
}

// Cadastro de usuário
document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email-cadastro').value;
  const senha = document.getElementById('senha-cadastro').value;

  // Validação dos campos
  if (!nome || !email || !senha) {
    showMessage('mensagem-cadastro', 'Todos os campos são obrigatórios!', 'red');
    return;
  }

  try {
    const response = await sendRequest('http://localhost:3000/cadastro', { nome, email, senha });
    showMessage('mensagem-cadastro', response.message, 'green');
    
    // Redireciona para a página index após sucesso
    redirectToIndex();
  } catch (error) {
    showMessage('mensagem-cadastro', error.message, 'red');
  }
});

// Login de usuário
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email-login').value;
  const senha = document.getElementById('senha-login').value;

  // Validação dos campos
  if (!email || !senha) {
    showMessage('mensagem-login', 'E-mail e senha são obrigatórios!', 'red');
    return;
  }

  try {
    const response = await sendRequest('http://localhost:3000/login', { email, senha });
    showMessage('mensagem-login', response.message, 'green');

    // Exibe o token JWT após login bem-sucedido
    alert(`Token JWT: ${response.token}`);
    
    // Redireciona para a página index após sucesso
    redirectToIndex();
  } catch (error) {
    showMessage('mensagem-login', error.message, 'red');
  }
});
