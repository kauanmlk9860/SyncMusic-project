document.addEventListener("DOMContentLoaded", function () {
  // Ação do botão voltar
  document.querySelector(".voltar").addEventListener("click", function (e) {
      e.preventDefault();
      history.back();
  });

  // Função para enviar email de recuperação de senha
  document.getElementById("senha-form").addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const errorMsg = document.getElementById('error-message');  // Mensagem de erro
      
      // Validação do campo de email
      if (!email) {
          showError('Por favor, insira um email válido.');
          return;
      }

      if (!isValidEmail(email)) {
          showError('Email inválido. Por favor, insira um email válido.');
          return;
      }

      // Exibe mensagem de sucesso antes de chamar a API
      showError(''); // Limpa a mensagem de erro
      alert(`Email de recuperação enviado para: ${email}`);

      // Dados para enviar ao endpoint
      const dados = {
          email: email
      };

      // Envia solicitação de recuperação de senha
      try {
          const response = await fetch('https://back-spider.vercel.app/user/RememberPassword', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(dados)
          });

          const result = await response.json();

          if (!response.ok) {
              throw new Error(result.message || 'Erro ao enviar email de recuperação');
          }

          // Sucesso - Mostra a mensagem
          alert('Instruções de recuperação de senha foram enviadas para o seu email.');

      } catch (error) {
          console.error('Erro na recuperação de senha:', error);
          showError(error.message || 'Erro ao enviar solicitação de recuperação.');
      }

  });

  // Função para mostrar mensagens de erro
  function showError(message) {
      if (errorMsg) {
          errorMsg.textContent = message;
          errorMsg.style.display = message ? 'block' : 'none';
      } else {
          alert(message);
      }
  }

  // Função para validar o email
  function isValidEmail(email) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
  }

});
