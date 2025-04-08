const API_URL = 'http://localhost:3000'; // Endereço da sua API

document.addEventListener('DOMContentLoaded', () => {
  carregarPosts();
});

// Carregar posts
async function carregarPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`); // rota GET /posts (você ainda vai precisar criar essa no backend)
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
    console.error('Erro ao carregar posts:', err);
  }
}

// Comentar em post
async function comentar(postId) {
  const texto = document.getElementById(`comentario-${postId}`).value;
  const usuario_id = getUsuarioId(); // Função que você precisa implementar

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
  const usuario_id = getUsuarioId(); // mesma coisa aqui

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

// Essa função você pode adaptar para pegar o id do usuário logado
function getUsuarioId() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.id;
}
