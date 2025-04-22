// Remove o spinner quando a página terminar de carregar


// Configura os eventos quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
    // Evento para o botão "Seja membro!"
    document.querySelector(".join").addEventListener("click", function () {
        alert("Bem-vindo à SyncMusic!");
    });

    // Evento para o botão de Login
    document.querySelector(".login").addEventListener("click", function () {
        window.location.href = "login.html";
    });

    // Evento para o botão de Cadastre-se (alterado para redirecionar)
    document.querySelector(".cadastre-se").addEventListener("click", function () {
        window.location.href = "cadastro.html"; // Alterado para página de cadastro
    });

    // Evento para o link de Planos
    document.querySelector(".planos").addEventListener("click", function () {
        window.location.href = "planos.html";
    });
}); 