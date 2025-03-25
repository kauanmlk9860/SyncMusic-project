
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
    const continueButton = document.querySelector(".continue");

    continueButton.addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (email === "kauan.assis.leonel@gmail.com" && senha === "123") {

            window.location.href = "perfil.html";
        } else {
            alert("E-mail ou senha incorretos!");
        }
    });
});
