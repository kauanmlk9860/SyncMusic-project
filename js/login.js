// Endpoints da API
const API_ENDPOINTS = {
    login: 'https://back-spider.vercel.app/login',
    userData: 'https://back-spider.vercel.app/api/user', // Exemplo de endpoint para dados do usuário
    otherData: 'https://back-spider.vercel.app/api/data' // Exemplo de outro endpoint
  };
  
  // Função genérica para requisições autenticadas
  async function makeAuthenticatedRequest(url, method = 'GET', body = null) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  
    const options = {
      method,
      headers
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (!response.ok) {
      if (response.status === 401) {
        // Token inválido ou expirado - redireciona para login
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
      }
      throw new Error(data.message || 'Erro na requisição');
    }
  
    return data;
  }
  
  // Função de login modificada
  const login = async () => {
    try {
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();
      
      if (!email || !senha) {
        throw new Error("Por favor, preencha todos os campos");
      }
  
      const response = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer login");
      }
  
      const responseData = await response.json();
      
      if (!responseData.token) {
        throw new Error("Token não recebido na resposta da API");
      }
      
      localStorage.setItem('authToken', responseData.token);
      
      // Armazena dados básicos do usuário se disponíveis
      if (responseData.user) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
      }
      
      return responseData;
  
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };
  
  // Função para buscar dados do usuário após login
  async function fetchUserData() {
    try {
      const userData = await makeAuthenticatedRequest(API_ENDPOINTS.userData);
      console.log('Dados do usuário:', userData);
      
      // Atualiza os dados no localStorage se necessário
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      return userData;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw error;
    }
  }
  
  // Função para buscar outros dados da API
  async function fetchOtherData() {
    try {
      const data = await makeAuthenticatedRequest(API_ENDPOINTS.otherData);
      console.log('Dados recebidos:', data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  }
  
  // Integração com o formulário de login (modificada para buscar dados após login)
  document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
      loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const loginButton = document.querySelector(".continue");
        const errorElement = document.querySelector(".error-message") || document.createElement("div");
        errorElement.className = "error-message";
        
        if (!document.querySelector(".error-message")) {
          loginForm.appendChild(errorElement);
        }
        
        try {
          // Mostrar estado de carregamento
          loginButton.disabled = true;
          loginButton.textContent = "Autenticando...";
          errorElement.textContent = "";
          errorElement.style.display = "none";
          
          // Fazer login
          await login();
          
          // Buscar dados adicionais do usuário após login
          await fetchUserData();
          
          // Redirecionar após sucesso
          window.location.href = "perfil.html";
          
        } catch (error) {
          errorElement.textContent = error.message;
          errorElement.style.display = "block";
          
          loginButton.disabled = false;
          loginButton.textContent = "Continuar";
        }
      });
    }
  });
  
  // Verificar autenticação ao carregar páginas protegidas
  function checkAuth() {
    const token = localStorage.getItem('authToken');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!token && currentPage !== 'index.html') {
      window.location.href = 'index.html';
    }
  }
  
  // Spinner de carregamento
  window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 500); 
    }
    
    // Verificar autenticação em páginas protegidas
    checkAuth();
  });