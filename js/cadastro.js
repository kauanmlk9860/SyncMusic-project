const API_ENDPOINTS = {
    register: 'https://back-spider.vercel.app/user/cadastrarUser'
};

window.addEventListener('load', function () {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

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

document.getElementById('formCadastro')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('#formCadastro button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    const errorMsg = document.getElementById('error-message');

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('contato').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const termos = document.getElementById('termos').checked;

    function showError(message) {
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.style.display = 'block';
        } else {
            alert(message);
        }
    }

    if (!nome || !email || !senha || !termos) {
        showError('Por favor, preencha todos os campos e aceite os termos.');
        return;
    }

    if (senha.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Cadastrando...';
    if (errorMsg) errorMsg.style.display = 'none';

    try {
        const dadosCadastro = {
            nome,
            email,
            senha,
            premium: "1",
            imagemPerfil: "https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg",
            senhaRecuperacao: "Gato12"
        };

        const resultado = await enviarCadastro(dadosCadastro);

        if (resultado.success || resultado.message === "Usuário cadastrado com sucesso!") {
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

// Eventos de navegação
document.querySelector('.login')?.addEventListener('click', () => {
    window.location.href = 'login.html';
});
document.querySelector('.cadastro')?.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
});
