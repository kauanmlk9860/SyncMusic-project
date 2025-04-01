// Interação com os itens do menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove a classe 'active' de todos os itens
        document.querySelectorAll('.menu-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Adiciona a classe 'active' apenas ao item clicado
        this.classList.add('active');
    });
});

// Interação com o botão Experimente
document.querySelector('.try-button').addEventListener('click', function() {
    alert('Você clicou em "Experimente"! Em breve você poderá conversar com seus artistas favoritos.');
});

// Efeito hover no botão
const tryButton = document.querySelector('.try-button');
tryButton.addEventListener('mouseenter', () => {
    tryButton.style.transform = 'scale(1.05)';
});
tryButton.addEventListener('mouseleave', () => {
    tryButton.style.transform = 'scale(1)';
});