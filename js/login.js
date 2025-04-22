const API_ENDPOINTS = {
  login: 'https://back-spider.vercel.app/login'
};

const fazerLogin = async (email, senha) => {
  const url = API_ENDPOINTS.login;
  const dados = {
    email,
    senha
  };

  const errorElement = document.getElementById("error-message");
  const submitButton = document.querySelector(".continue");
  const originalButtonText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Autenticando...";

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    console.log("Resposta da API:", resultado); // Para debug

    if (!resposta.ok || !resultado.success) {
      throw new Error(resultado.message || "Credenciais inválidas");
    }

    // Armazena os dados do usuário
    localStorage.setItem("userToken", resultado.token || "dummy-token-for-test");
    localStorage.setItem("userEmail", email);

    // Debug: Verifica se armazenou corretamente
    console.log("Token armazenado:", localStorage.getItem("userToken"));
    
    // Força o redirecionamento mesmo se houver problemas
    window.location.href = "perfil.html";
    return; // Garante que o código para aqui

  } catch (erro) {
    console.error("Erro completo:", erro);
    errorElement.textContent = erro.message || "Erro ao fazer login. Tente novamente.";
    errorElement.style.display = "block";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
};

// Listener para o formulário
document.getElementById("login-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  fazerLogin(email, senha);
});