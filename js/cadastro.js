const API_ENDPOINTS = {
    register: 'https://back-spider.vercel.app/user/cadastrarUser'
};

// Remove o spinner quando a página terminar de carregar
window.addEventListener('load', function () {
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
    cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os 3 primeiros dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os 3 seguintes
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen antes dos dois últimos dígitos
    return cpf;
}

// Função para enviar cadastro para a API
async function enviarCadastro(dados) {
    try {
        const response = await fetch(API_ENDPOINTS.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Erro ao cadastrar usuário');
        }

        return result;
    } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error;
    }
}

// Validação do formulário
document.getElementById('formCadastro')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Elementos da UI
    const submitBtn = document.querySelector('#formCadastro button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    const errorMsg = document.getElementById('error-message');
    
    // Validação básica
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const contato = document.getElementById('contato').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const termos = document.getElementById('termos').checked;
    
    // Validações
    if (!nome || !cpf || !contato || !senha || !termos) {
        showError('Por favor, preencha todos os campos e aceite os termos.');
        return;
    }
    
    if (senha.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    if (cpf.length !== 11) {
        showError('CPF inválido. Deve conter 11 dígitos.');
        return;
    }

    function showError(message) {
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.style.display = 'block';
        } else {
            alert(message);
        }
    }

    // Configuração do botão durante o processamento
    submitBtn.disabled = true;
    submitBtn.textContent = 'Cadastrando...';
    if (errorMsg) errorMsg.style.display = 'none';

    try {
        // Dados para a API
        const dadosCadastro = {
            nome,
            cpf,
            contato,
            senha,
            premium: "1",  // Valor padrão conforme endpoint
            imagemPerfil: "https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg"  // Valor padrão
        };

        // Envia para a API
        const resultado = await enviarCadastro(dadosCadastro);
        
        // Sucesso no cadastro
        if (resultado.success) {
            alert('Cadastro realizado com sucesso! Redirecionando para login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            showError(resultado.message || 'Erro ao cadastrar usuário');
        }
    } catch (error) {
        showError(error.message || 'Erro ao conectar com o servidor');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// Máscara para CPF
document.getElementById('cpf')?.addEventListener('input', function (e) {
    e.target.value = formatarCPF(e.target.value);
});

// Eventos para os botões do header
document.querySelector('.login')?.addEventListener('click', function () {
    window.location.href = 'login.html';
});

document.querySelector('.cadastro')?.addEventListener('click', function () {
    window.location.href = 'cadastro.html';
});
