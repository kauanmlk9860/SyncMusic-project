const API_ENDPOINTS = {
  registerUser: 'https://back-spider.vercel.app/user/cadastrarUser'
};

const enviarRegistro = async (firstName, lastName, email, password) => {
  const url = API_ENDPOINTS.registerUser;
  const dados = {
    nome: `${firstName} ${lastName}`,
    email,
    senha: password,
    premium: "1",
    imagemPerfil: "https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg"
  };

  const spinner = document.getElementById("spinner");
  const status = document.getElementById("status");

  spinner.style.display = "block";
  status.textContent = "Enviando dados...";

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.success) {
      throw new Error(resultado.message || "Erro ao registrar");
    }

    status.textContent = "Cadastro realizado com sucesso! Redirecionando...";
    setTimeout(() => {
      window.location.href = "perfil.html";
    }, 2000);
  } catch (erro) {
    console.error("Erro ao enviar dados:", erro);
    status.textContent = "Erro ao registrar. Tente novamente.";
  } finally {
    spinner.style.display = "none";
  }
};

// Listener para o envio do formulário
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastro-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      enviarRegistro(firstName, lastName, email, password);
    });
  }
});
