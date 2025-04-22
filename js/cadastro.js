// Remove o spinner quando a página terminar de carregar
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

// Validação do formulário
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const contato = document.getElementById('contato').value;
    const senha = document.getElementById('senha').value;
    const termos = document.getElementById('termos').checked;
    
    if (!nome || !cpf || !contato || !senha || !termos) {
        alert('Por favor, preencha todos os campos e aceite os termos.');
        return;
    }
    
    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    
    // Se tudo estiver válido
    alert('Cadastro realizado com sucesso! Redirecionando...');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
});

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    e.target.value = formatarCPF(e.target.value);
});

// Eventos para os botões do header
document.querySelector('.login').addEventListener('click', function() {
    window.location.href = 'login.html';
});

document.querySelector('.cadastro').addEventListener('click', function() {
    window.location.href = 'cadastro.html';
});