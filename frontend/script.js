// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do modal de cadastro
    const abrirModalBtn = document.querySelector('.abrirModal');
    const fecharModalBtn = document.getElementById('fecharModal');
    const modal = document.getElementById('modal');
    const fundoModal = document.getElementById('fundoModal');
    const formCadastro = document.getElementById('formCadastro');
    
    // Elementos do modal de login
    const abrirModal2Btn = document.querySelector('.abrirModal2');
    const fecharModal2Btn = document.getElementById('fecharModal2');
    const modal2 = document.getElementById('modal2');
    const fundoModal2 = document.getElementById('fundoModal2');
    const formLogin = document.getElementById('formLogin');
    
    // Links para alternar entre modais
    const alternarModalLinks = document.querySelectorAll('.alternarModal');
    
    // Função para abrir/fechar modais com animação
    function toggleModal(modalElement, fundoElement) {
        modalElement.classList.toggle('hide');
        fundoElement.classList.toggle('hide');
        
        // Adiciona/remove a classe para animação
        if (!modalElement.classList.contains('hide')) {
            modalElement.classList.add('show');
        } else {
            modalElement.classList.remove('show');
        }
    }
    
    // Event listeners para cadastro
    abrirModalBtn.addEventListener('click', () => toggleModal(modal, fundoModal));
    fecharModalBtn.addEventListener('click', () => toggleModal(modal, fundoModal));
    fundoModal.addEventListener('click', () => toggleModal(modal, fundoModal));
    
    // Event listeners para login
    abrirModal2Btn.addEventListener('click', () => toggleModal(modal2, fundoModal2));
    fecharModal2Btn.addEventListener('click', () => toggleModal(modal2, fundoModal2));
    fundoModal2.addEventListener('click', () => toggleModal(modal2, fundoModal2));
    
    // Alternar entre modais
    alternarModalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Fecha o modal atual e abre o outro
            if (modal.classList.contains('hide')) {
                toggleModal(modal2, fundoModal2);
                toggleModal(modal, fundoModal);
            } else {
                toggleModal(modal, fundoModal);
                toggleModal(modal2, fundoModal2);
            }
        });
    });
    
    // Enviar formulário de cadastro
    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('cadastroEmail').value;
        const senha = document.getElementById('cadastroSenha').value;
        const confirmarSenha = document.getElementById('cadastroConfirmarSenha').value;
        
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3005/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                toggleModal(modal, fundoModal);
                formCadastro.reset();
            } else {
                alert(data.mensagem || 'Erro ao cadastrar');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        }
    });
    
    // Enviar formulário de login
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;
        
        try {
            const response = await fetch('http://localhost:3005/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Login bem-sucedido!');
                // Armazenar token ou dados do usuário se necessário
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                toggleModal(modal2, fundoModal2);
                formLogin.reset();
                // Redirecionar ou atualizar a página
                window.location.href = 'dashboard.html'; // ou outra página
            } else {
                alert(data.mensagem || 'E-mail ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        }
    });
});