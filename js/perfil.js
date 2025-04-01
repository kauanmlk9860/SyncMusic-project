document.addEventListener("DOMContentLoaded", function () {
    const editarPerfil = document.querySelector(".editar");
    const mudarSenha = document.querySelector(".mudar-senha");
    const experimente = document.querySelector(".experimente"); 

    editarPerfil.addEventListener("click", function () {
        alert("Função de edição de perfil em desenvolvimento...");
    });

    mudarSenha.addEventListener("click", function () {
        window.location.href = "mudar_senha.html"; // Redireciona
    });

    experimente.addEventListener("click", function () {
        window.location.href = "planos.html";
    });
});
