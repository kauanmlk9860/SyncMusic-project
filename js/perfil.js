document.addEventListener("DOMContentLoaded", function () {
    const userToken = localStorage.getItem("userToken");
    const userEmail = localStorage.getItem("userEmail");
  
    // Verifica autenticação
    if (!userToken) {
      window.location.href = "login.html";
      return;
    }
  
    // Exibe email do usuário
    if (userEmail && document.getElementById("user-email")) {
      document.getElementById("user-email").textContent = userEmail;
    }
  
    // Logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userEmail");
        window.location.href = "login.html";
      });
    }
  
    // Botões do perfil
    const editarPerfil = document.querySelector(".editar");
    const mudarSenha = document.querySelector(".mudar-senha");
    const experimente = document.querySelector(".experimente");
  
    if (editarPerfil) {
      editarPerfil.addEventListener("click", function () {
        alert("Função de edição de perfil em desenvolvimento...");
      });
    }
  
    if (mudarSenha) {
      mudarSenha.addEventListener("click", function () {
        window.location.href = "mudar_senha.html";
      });
    }
  
    if (experimente) {
      experimente.addEventListener("click", function () {
        window.location.href = "planos.html";
      });
    }
  
    // Redirecionar para publicações ao clicar em "Início"
    const menuItens = document.querySelectorAll(".sidebar nav .menu li, .sidebar nav .menu-item");
    menuItens.forEach((item) => {
      if (item.textContent.includes("início")) {
        item.addEventListener("click", function () {
          window.location.href = "./publicacao.html";
        });
      }
    });
  });
  