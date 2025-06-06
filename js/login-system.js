/**
 * Moz Doctor Dose - Sistema de Login com Firebase
 * Este módulo gerencia a autenticação de usuários usando Firebase Authentication.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao auth do Firebase
    let auth;
    try {
        auth = firebase.auth();
    } catch (error) {
        console.error('Erro ao inicializar Firebase Auth:', error);
        return;
    }
    
    // Elementos DOM
    const loginButton = document.getElementById('login-button');
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const loginContainer = document.getElementById('login-container');
    const loginCloseButton = document.getElementById('login-close');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.getElementById('logout-button');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const adminSection = document.getElementById('admin-section');

    // Erro e carregamento
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    
    // Função para mostrar o modal de login
    function showLoginModal() {
        loginContainer.classList.add('active');
        // Resetar para o formulário de login por padrão
        switchToLoginTab();
    }
    
    // Função para fechar o modal de login
    function closeLoginModal() {
        loginContainer.classList.remove('active');
        // Limpar os formulários
        loginForm.reset();
        registerForm.reset();
        // Esconder mensagens de erro
        hideError(loginError);
        hideError(registerError);
    }
    
    // Função para alternar para a aba de login
    function switchToLoginTab() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        document.getElementById('login-form-container').classList.add('active');
        document.getElementById('register-form-container').classList.remove('active');
    }
    
    // Função para alternar para a aba de registro
    function switchToRegisterTab() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        document.getElementById('register-form-container').classList.add('active');
        document.getElementById('login-form-container').classList.remove('active');
    }
    
    // Função para mostrar erro - Removida pois não está sendo usada
    // Esta função foi removida por não estar em uso no código atual
    
    // Função para esconder erro
    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('active');
    }
    
    // Função para mostrar o menu do usuário
    function toggleUserMenu() {
        userDropdown.classList.toggle('active');
    }

    // Atualizar UI baseado no estado de autenticação
    function updateUIForUser(user) {
        if (user) {
            // Usuário logado
            if (loginButton) loginButton.style.display = 'none';
            if (userMenuButton) userMenuButton.style.display = 'flex';
            
            // Definir avatar e nome do usuário
            if (userName) {
                const displayName = user.displayName || user.email.split('@')[0];
                userName.textContent = displayName;
            }
            
            if (userAvatar) {
                const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
                userAvatar.textContent = initial;
            }

            // Se o usuário tiver permissões de administrador, mostrar seção de admin
            checkAdminPermissions(user);
        } else {
            // Usuário não logado
            if (loginButton) loginButton.style.display = 'flex';
            if (userMenuButton) userMenuButton.style.display = 'none';
            
            // Esconder área de administração
            if (adminSection) adminSection.style.display = 'none';
        }
    }

    // Verificar se o usuário tem permissões de administrador
    function checkAdminPermissions(user) {
        // Em uma implementação real, você verificaria no banco de dados ou em claims personalizadas
        // Para este exemplo, vamos considerar administrador se o email terminar com "@admin.com"
        const isAdmin = user.email.endsWith('@admin.com');
        
        if (isAdmin && adminSection) {
            adminSection.style.display = 'block';
        } else if (adminSection) {
            adminSection.style.display = 'none';
        }

        // Também podemos verificar no banco de dados
        const db = firebase.database();
        db.ref(`admins/${user.uid}`).once('value', (snapshot) => {
            if (snapshot.exists() && adminSection) {
                adminSection.style.display = 'block';
            }
        });
    }
    
    // Configurar listeners de eventos
    if (loginButton) {
        loginButton.addEventListener('click', showLoginModal);
    }
    
    if (loginCloseButton) {
        loginCloseButton.addEventListener('click', closeLoginModal);
    }
    
    if (loginTab) {
        loginTab.addEventListener('click', switchToLoginTab);
    }
    
    if (registerTab) {
        registerTab.addEventListener('click', switchToRegisterTab);
    }
    
    if (userMenuButton) {
        userMenuButton.addEventListener('click', toggleUserMenu);
    }
    
    // Clicar fora do dropdown fecha ele
    document.addEventListener('click', function(event) {
        if (userDropdown && userDropdown.classList.contains('active')) {
            if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
                userDropdown.classList.remove('active');
            }
        }
    });
    
    // Fechar o modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === loginContainer) {
            closeLoginModal();
        }
    });
    
    // Processar o formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            
            // Mostrar carregamento
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            
            // Remover alertas de erro anteriores
            const previousErrors = loginForm.parentElement.querySelectorAll('.auth-error');
            previousErrors.forEach(el => el.remove());
            
            // Tentar fazer login
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Login bem-sucedido
                    closeLoginModal();
                    submitButton.classList.remove('loading');
                })
                .catch((error) => {
                    // Erro no login
                    submitButton.classList.remove('loading');
                    handleAuthError(error, loginForm.parentElement);
                });
        });
    }
    
    // Processar o formulário de registro
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;
            
            // Validar senha
            if (password !== confirmPassword) {
                handleAuthError({
                    code: 'auth/password-mismatch', 
                    message: 'As senhas não coincidem.'
                }, registerForm.parentElement);
                return;
            }
            
            // Mostrar carregamento
            const submitButton = registerForm.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            
            // Remover alertas de erro anteriores
            const previousErrors = registerForm.parentElement.querySelectorAll('.auth-error');
            previousErrors.forEach(el => el.remove());
            
            // Tentar criar conta
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // Registro bem-sucedido
                    closeLoginModal();
                    submitButton.classList.remove('loading');
                })
                .catch((error) => {
                    // Erro no registro
                    submitButton.classList.remove('loading');
                    handleAuthError(error, registerForm.parentElement);
                });
        });
    }
    
    // Processar o botão de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            auth.signOut().then(() => {
                // Logout bem-sucedido
                userDropdown.classList.remove('active');
            }).catch((error) => {
                console.error('Erro ao fazer logout:', error);
                handleAuthError(error, logoutButton.parentNode);
            });
        });
    }
    
    // Login com Google
    const googleLoginButtons = document.querySelectorAll('.google-btn');
    googleLoginButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then(() => {
                    // Login com Google bem-sucedido
                    closeLoginModal();
                })
                .catch((error) => {
                    // Erro no login com Google
                    console.error('Erro ao fazer login com Google:', error);
                    handleAuthError(error, loginContainer);
                });
        });
    });
    
    // Observar mudanças no estado de autenticação
    auth.onAuthStateChanged(function(user) {
        updateUIForUser(user);
    });
    
    // Função genérica para tratar erros de autenticação
    function handleAuthError(error, container) {
        console.error('Erro de autenticação:', error);
        
        let errorMessage = '';
        let errorType = 'error'; // Pode ser 'error', 'warning', ou 'info'
        
        // Mapear códigos de erro para mensagens amigáveis em português
        switch(error.code) {
            // Erros relacionados ao email
            case 'auth/email-already-in-use':
                errorMessage = 'Este e-mail já está sendo utilizado por outra conta.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'O e-mail informado é inválido.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'Não existe uma conta com este e-mail.';
                break;
                
            // Erros relacionados à senha
            case 'auth/weak-password':
                errorMessage = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Senha incorreta. Tente novamente.';
                break;
                
            // Erros relacionados ao ambiente
            case 'auth/operation-not-supported-in-this-environment':
            case 'auth/operation-not-allowed':
                console.warn('Firebase Auth normalmente requer HTTP/HTTPS, mas tentando prosseguir mesmo assim');
                // Prosseguir mesmo com erro de ambiente
                return;
                
            // Limites e restrições
            case 'auth/too-many-requests':
                errorMessage = 'Muitas tentativas em sequência. Por favor, aguarde alguns minutos antes de tentar novamente.';
                errorType = 'warning';
                break;
                
            // Problemas de rede
            case 'auth/network-request-failed':
                errorMessage = 'Problema de conexão com a internet. Verifique sua conexão e tente novamente.';
                break;
                
            // Erros diversos
            case 'auth/popup-blocked':
                errorMessage = 'O pop-up de login foi bloqueado pelo navegador. Por favor, permita pop-ups para este site.';
                errorType = 'info';
                break;
            case 'auth/popup-closed-by-user':
                errorMessage = 'O processo de login foi cancelado. Tente novamente quando estiver pronto.';
                errorType = 'info';
                break;
            case 'auth/cancelled-popup-request':
                return; // Simplesmente ignorar este erro, pois é um comportamento normal
            case 'auth/account-exists-with-different-credential':
                errorMessage = 'Já existe uma conta com este e-mail, mas usando outro método de login.';
                break;
                
            // Erro genérico
            default:
                errorMessage = error.message || 'Ocorreu um erro durante a autenticação. Tente novamente mais tarde.';
        }
        
        // Ignorar erros de ambiente para permitir funcionamento mesmo em file://
        if (error.code === 'auth/operation-not-supported-in-this-environment' || 
            error.code === 'auth/operation-not-allowed') {
            console.warn('Ignorando erro de ambiente para permitir funcionamento');
            return;
        }
        
        // Mostrar mensagem de erro no container
        const errorElement = document.createElement('div');
        errorElement.className = `auth-error auth-${errorType}`;
        
        errorElement.innerHTML = `
            <div class="auth-error-content">
                <i class="fas ${errorType === 'error' ? 'fa-exclamation-circle' : 
                                errorType === 'warning' ? 'fa-exclamation-triangle' : 
                                'fa-info-circle'}"></i>
                <span>${errorMessage}</span>
            </div>
            <button class="auth-error-close" aria-label="Fechar">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Remover mensagens de erro anteriores
        const previousErrors = container.querySelectorAll('.auth-error');
        previousErrors.forEach(el => el.remove());
        
        // Adicionar a nova mensagem
        container.prepend(errorElement);
        
        // Adicionar evento para fechar o erro
        const closeButton = errorElement.querySelector('.auth-error-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                errorElement.remove();
            });
        }
        
        // Rolar para o topo do container para mostrar o erro
        container.scrollTop = 0;
        
        // Auto-remover a mensagem após 10 segundos para tipos info
        if (errorType === 'info') {
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.remove();
                }
            }, 10000);
        }
    }
});
