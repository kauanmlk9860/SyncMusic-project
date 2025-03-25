
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500); 
    }
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".join").addEventListener("click", function () {
        alert("Bem-vindo à SyncMusic!");
    });

    document.querySelector(".login").addEventListener("click", function () {
        window.location.href = "login.html";
    });

    document.querySelector(".cadastro").addEventListener("click", function () {
        alert("Cadastro em desenvolvimento...");
    });

    document.querySelector(".planos").addEventListener("click", function () {
        window.location.href = "planos.html";
    });
});