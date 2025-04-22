const container = document.getElementById('storiesContainer');
const next = document.getElementById('nextStory');
const prev = document.getElementById('prevStory');
const storyWidth = 100;

next.addEventListener('click', () => {
  container.scrollLeft += storyWidth * 3;
});

prev.addEventListener('click', () => {
  container.scrollLeft -= storyWidth * 3;
});

const feed = document.getElementById('feed');

async function carregarPublicacoes() {
  try {
    const resposta = await fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes');
    const publicacoes = await resposta.json();

    publicacoes.forEach(pub => {
      const post = document.createElement('div');
      post.classList.add('feed-post');

      // Cabeçalho
      const header = document.createElement('div');
      header.classList.add('post-header');

      const avatar = document.createElement('img');
      avatar.classList.add('post-avatar');
      avatar.src = pub.usuario?.fotoPerfil || 'https://via.placeholder.com/50';
      avatar.alt = pub.usuario?.nome || 'Usuário';

      const nome = document.createElement('span');
      nome.classList.add('post-user');
      nome.textContent = pub.usuario?.nome || 'Usuário';

      header.appendChild(avatar);
      header.appendChild(nome);

      // Imagem com duplo clique
      const doubleLikeContainer = document.createElement('div');
      doubleLikeContainer.classList.add('double-like');

      const imagem = document.createElement('img');
      imagem.classList.add('post-image');
      imagem.src = pub.imagem;
      imagem.alt = 'Imagem da publicação';

      const heart = document.createElement('div');
      heart.classList.add('heart-icon');
      heart.textContent = '❤️';

      doubleLikeContainer.appendChild(imagem);
      doubleLikeContainer.appendChild(heart);

      // Animação de like
      let lastClickTime = 0;
      imagem.addEventListener('click', () => {
        const now = new Date().getTime();
        if (now - lastClickTime < 400) {
          likeBtn.click();
          doubleLikeContainer.classList.add('animate');
          setTimeout(() => {
            doubleLikeContainer.classList.remove('animate');
          }, 800);
        }
        lastClickTime = now;
      });

      // Descrição
      const descricao = document.createElement('div');
      descricao.classList.add('post-description');
      descricao.textContent = pub.descricao;

      // Ações
      const actions = document.createElement('div');
      actions.classList.add('post-actions');

      const likeBtn = document.createElement('button');
      likeBtn.classList.add('action-btn');
      likeBtn.textContent = '❤️ Curtir';

      const commentBtn = document.createElement('button');
      commentBtn.classList.add('action-btn');
      commentBtn.textContent = '💬 Comentar';

      const shareBtn = document.createElement('button');
      shareBtn.classList.add('action-btn');
      shareBtn.textContent = '🔗 Compartilhar';

      actions.appendChild(likeBtn);
      actions.appendChild(commentBtn);
      actions.appendChild(shareBtn);

      // Comentários
      const commentsContainer = document.createElement('div');
      commentsContainer.classList.add('comments');

      const commentInput = document.createElement('div');
      commentInput.classList.add('comment-input');

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Escreva um comentário...';

      const sendBtn = document.createElement('button');
      sendBtn.textContent = 'Enviar';

      sendBtn.addEventListener('click', async () => {
        const texto = input.value.trim();
        if (texto !== '') {
          try {
            const resposta = await fetch(`https://back-spider.vercel.app/publicacoes/commentPublicacao/${pub._id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ comentario: texto })
            });

            if (!resposta.ok) {
              throw new Error(`Erro ao comentar: ${resposta.statusText}`);
            }

            const novoComentario = await resposta.json();

            const comment = document.createElement('div');
            comment.classList.add('comment');

            const author = document.createElement('strong');
            author.textContent = 'Você: ';

            const content = document.createElement('span');
            content.textContent = novoComentario.comentario || texto;

            comment.appendChild(author);
            comment.appendChild(content);
            commentsContainer.insertBefore(comment, commentInput);
            input.value = '';
          } catch (erro) {
            console.error('Erro ao enviar comentário:', erro);
            alert('Não foi possível enviar o comentário.');
          }
        }
      });

      commentInput.appendChild(input);
      commentInput.appendChild(sendBtn);
      commentsContainer.appendChild(commentInput);

      // Monta o post completo
      post.appendChild(header);
      post.appendChild(doubleLikeContainer);
      post.appendChild(descricao);
      post.appendChild(actions);
      post.appendChild(commentsContainer);

      feed.appendChild(post);
    });
  } catch (erro) {
    console.error("Erro ao carregar publicações:", erro);
  }
}

carregarPublicacoes();
