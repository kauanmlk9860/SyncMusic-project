document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".voltar").addEventListener("click", function (e) {
      e.preventDefault();
      history.back();
    });
  
    document.getElementById("senha-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      alert(`Email de recuperação enviado para: ${email}`);
    });
  });
  