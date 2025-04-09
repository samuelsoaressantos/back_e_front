const API_URL = 'http://localhost:3000'; // Endereço da sua API

document.addEventListener('DOMContentLoaded', () => {
  carregarPosts();
});

// Carregar posts
async function carregarPosts() {
  try {
    const response = await fetch(`${API_URL}/post`);
    const posts = await response.json();

    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');

      postDiv.innerHTML = `
        <h2>${post.titulo}</h2>
        <img src="${post.imagem}" alt="Imagem do post">
        <p><strong>Localização:</strong> ${post.localizacao}</p>
        <textarea id="comentario-${post.id}" placeholder="Escreva um comentário..."></textarea>
        <button onclick="comentar(${post.id})">Comentar</button>
        <button onclick="votar(${post.id}, 'like')">👍 Curtir</button>
        <button onclick="votar(${post.id}, 'dislike')">👎 Não curtir</button>
      `;

      container.appendChild(postDiv);
    });
  } catch (err) {
    console.error('Erro ao carregar post:', err);
  }
}

// Comentar em post
async function comentar(postId) {
  const texto = document.getElementById(`comentario-${postId}`).value;
  const usuario_id = getUsuarioId();

  if (!texto || !usuario_id) return alert('Comentário vazio ou usuário não identificado');

  try {
    const response = await fetch(`${API_URL}/comentarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_id: postId, usuario_id, texto })
    });

    const result = await response.json();
    alert(result.message || 'Comentário enviado!');
  } catch (err) {
    console.error('Erro ao comentar:', err);
  }
}

// Curtir ou não curtir
async function votar(postId, tipo) {
  const usuario_id = getUsuarioId();

  try {
    const response = await fetch(`${API_URL}/votos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_id: postId, usuario_id, tipo })
    });

    const result = await response.json();
    alert(result.message);
  } catch (err) {
    console.error('Erro ao votar:', err);
  }
}

// Função para pegar o ID do usuário logado
function getUsuarioId() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.id;
}

// Exibir o formulário de criação de post
document.getElementById('criar-post-btn').addEventListener('click', () => {
  document.getElementById('formulario-post').style.display = 'block';
  document.getElementById('criar-post-btn').style.display = 'none'; // Oculta o botão "Criar Post"
});

// Cancelar o formulário
document.getElementById('cancelar-post-btn').addEventListener('click', () => {
  document.getElementById('formulario-post').style.display = 'none';
  document.getElementById('criar-post-btn').style.display = 'inline'; // Mostra o botão "Criar Post"
});

// Função para salvar o post
document.getElementById('salvar-post-btn').addEventListener('click', async () => {
  const titulo = document.getElementById('titulo-post').value;
  const imagem = document.getElementById('imagem-post').value;
  const localizacao = document.getElementById('localizacao-post').value;
  const usuario_id = getUsuarioId();

  // Validação básica
  if (!titulo || !imagem || !localizacao || !usuario_id) {
    return alert('Preencha todos os campos corretamente!');
  }

  try {
    const response = await fetch(`${API_URL}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        imagem,
        localizacao,
        usuario_id
      })
    });

    const result = await response.json();
    alert(result.message || 'Post criado com sucesso!');
    document.getElementById('formulario-post').style.display = 'none'; // Oculta o formulário após o post ser criado
    document.getElementById('criar-post-btn').style.display = 'inline'; // Mostra o botão "Criar Post"
    carregarPosts(); // Recarregar a lista de posts
  } catch (err) {
    console.error('Erro ao criar post:', err);
  }
});
