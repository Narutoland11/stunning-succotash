/**
 * Sistema unificado de login para Moz Doctor Dose
 * Implementação otimizada e corrigida para garantir funcionamento correto
 * 
 * @version 2.2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de login otimizado inicializando...');
    
    // Evitar múltiplas inicializações
    if (window.loginSystemInitialized) {
        console.warn('Sistema de login já inicializado, evitando duplicação');
        return;
    }
    window.loginSystemInitialized = true;

    // Referência ao Firebase Auth
    let auth;
    try {
        // Usar a instância do Firebase já inicializada
        auth = firebase.auth();
        console.log('Firebase Auth obtido com sucesso');
    } catch (error) {
        console.error('Erro ao obter Firebase Auth:', error);
        alert('Erro de autenticação. Por favor, recarregue a página.');
        return;
    }

    // Elementos DOM principais
    const loginButton = document.getElementById('login-button');
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const loginContainer = document.getElementById('login-container');
    const loginCloseButton = document.getElementById('login-close');
    const logoutButton = document.getElementById('logout-button');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    
    // Elementos de formulários e mensagens
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    
    // Menu mobile
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    // ===== FUNÇÕES AUXILIARES =====
    
    // Mostrar modal de login
    function showLoginModal() {
        if (loginContainer) {
            loginContainer.classList.add('active');
            document.body.classList.add('modal-open');
            // Resetar para o formulário de login por padrão
            if (loginTab) switchToLoginTab();
        }
    }
    
    // Fechar modal de login
    function closeLoginModal() {
        if (loginContainer) {
            loginContainer.classList.remove('active');
            document.body.classList.remove('modal-open');
            // Limpar formulários
            if (loginForm) loginForm.reset();
            if (registerForm) registerForm.reset();
            // Esconder erros
            hideError(loginError);
            hideError(registerError);
        }
    }
    
    // Alternar para aba de login
    function switchToLoginTab() {
        if (!loginTab || !registerTab) return;
        
        loginTab.classList.add('active');
        loginTab.setAttribute('aria-selected', 'true');
        registerTab.classList.remove('active');
        registerTab.setAttribute('aria-selected', 'false');
        
        document.getElementById('login-form-container').style.display = 'block';
        document.getElementById('register-form-container').style.display = 'none';
        
        hideError(loginError);
    }
    
    // Alternar para aba de registro
    function switchToRegisterTab() {
        if (!loginTab || !registerTab) return;
        
        registerTab.classList.add('active');
        registerTab.setAttribute('aria-selected', 'true');
        loginTab.classList.remove('active');
        loginTab.setAttribute('aria-selected', 'false');
        
        document.getElementById('register-form-container').style.display = 'block';
        document.getElementById('login-form-container').style.display = 'none';
        
        hideError(registerError);
    }
    
    // Mostrar erro
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
            element.setAttribute('aria-live', 'assertive');
        }
    }
    
    // Esconder erro
    function hideError(element) {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    }
    
    // Atualizar interface com base no usuário
    function updateUIWithUser(user) {
        console.log('Atualizando UI:', user ? 'Usuário logado' : 'Nenhum usuário');
        
        try {
            if (user) {
                // Usuário logado
                if (loginButton) loginButton.style.display = 'none';
                if (userMenuButton) userMenuButton.style.display = 'flex';
                
                // Atualizar informações do usuário
                if (userName) userName.textContent = user.email.split('@')[0];
                if (userAvatar) userAvatar.textContent = user.email.charAt(0).toUpperCase();
                
                // Verificar se é admin
                const adminSection = document.getElementById('admin-section');
                if (adminSection) {
                    user.getIdTokenResult().then((idToken) => {
                        if (idToken.claims && idToken.claims.admin) {
                            adminSection.style.display = 'block';
                        } else {
                            adminSection.style.display = 'none';
                        }
                    }).catch(err => {
                        console.error('Erro ao verificar admin:', err);
                        adminSection.style.display = 'none';
                    });
                }
                
                // Adicionar classes para estilização
                document.body.classList.add('user-logged-in');
                document.body.classList.remove('user-logged-out');
            } else {
                // Usuário não logado
                if (loginButton) loginButton.style.display = 'flex';
                if (userMenuButton) userMenuButton.style.display = 'none';
                
                // Limpar informações
                if (userName) userName.textContent = '';
                if (userAvatar) userAvatar.textContent = '';
                
                // Esconder seção admin
                const adminSection = document.getElementById('admin-section');
                if (adminSection) adminSection.style.display = 'none';
                
                // Atualizar classes
                document.body.classList.add('user-logged-out');
                document.body.classList.remove('user-logged-in');
            }
        } catch (error) {
            console.error('Erro ao atualizar UI:', error);
        }
    }
    
    // Função de logout
    function handleLogout(e) {
        if (e) e.preventDefault();
        
        if (!auth) {
            console.error('Auth não disponível');
            return;
        }
        
        auth.signOut()
            .then(() => {
                console.log('Logout bem-sucedido');
                if (userDropdown) userDropdown.classList.remove('active');
                updateUIWithUser(null);
            })
            .catch(error => {
                console.error('Erro ao fazer logout:', error);
            });
    }

    // ===== CONFIGURAÇÃO DE EVENTOS =====
    
    // Botão de login
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    }
    
    // Fechar modal
    if (loginCloseButton) {
        loginCloseButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeLoginModal();
        });
    }
    
    // Alternar entre abas
    if (loginTab) loginTab.addEventListener('click', switchToLoginTab);
    if (registerTab) registerTab.addEventListener('click', switchToRegisterTab);
    
    // Menu do usuário
    if (userMenuButton) {
        userMenuButton.addEventListener('click', function() {
            if (userDropdown) userDropdown.classList.toggle('active');
        });
    }
    
    // Botão de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // Clicar fora para fechar
    document.addEventListener('click', function(event) {
        // Fechar dropdown
        if (userDropdown && userMenuButton &&
            userDropdown.classList.contains('active') &&
            !userMenuButton.contains(event.target) && 
            !userDropdown.contains(event.target)) {
            userDropdown.classList.remove('active');
        }
        
        // Fechar modal ao clicar fora
        if (loginContainer && 
            event.target === loginContainer && 
            !event.target.closest('.login-panel')) {
            closeLoginModal();
        }
    });
    
    // Menu toggle para mobile
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Se o menu foi aberto, fechar o modal de login
            if (mainNav.classList.contains('active') && loginContainer) {
                loginContainer.classList.remove('active');
            }
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Mostrar loading
            const loginButton = loginForm.querySelector('button[type="submit"]');
            const loadingSpinner = loginButton.querySelector('.loading-spinner');
            const btnText = loginButton.querySelector('.btn-text');
            
            loadingSpinner.style.display = 'inline-block';
            btnText.style.opacity = '0';
            loginButton.disabled = true;
            
            // Limpar mensagens anteriores
            hideError(loginError);
            
            // Fazer login
            // Garantir que o Firebase Auth esteja pronto antes de tentar login
            (window.firebaseAuthReady || Promise.resolve(firebase.auth()))
                .then(auth => auth.signInWithEmailAndPassword(email, password))
                .then(() => {
                    closeLoginModal();
                })
                .catch((error) => {
                    let errorMessage = 'Erro ao fazer login. Tente novamente.';
                    
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        errorMessage = 'Email ou senha incorretos';
                    } else if (error.code === 'auth/too-many-requests') {
                        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
                    } else if (error.code === 'auth/invalid-email') {
                        errorMessage = 'Email inválido';
                    }
                    
                    showError(loginError, errorMessage);
                })
                .finally(() => {
                    // Ocultar loading
                    loadingSpinner.style.display = 'none';
                    btnText.style.opacity = '1';
                    loginButton.disabled = false;
                });
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Verificar senhas
            if (password !== confirmPassword) {
                showError(registerError, 'As senhas não coincidem');
                return;
            }
            
            // Mostrar loading
            const registerButton = registerForm.querySelector('button[type="submit"]');
            const loadingSpinner = registerButton.querySelector('.loading-spinner');
            const btnText = registerButton.querySelector('.btn-text');
            
            loadingSpinner.style.display = 'inline-block';
            btnText.style.opacity = '0';
            registerButton.disabled = true;
            
            // Limpar mensagens
            hideError(registerError);
            
            // Criar conta
            // Usar a promessa de autenticação para garantir que o Firebase está pronto
            (window.firebaseAuthReady || Promise.resolve(firebase.auth()))
                .then(auth => auth.createUserWithEmailAndPassword(email, password))
                .then(() => {
                    closeLoginModal();
                })
                .catch((error) => {
                    let errorMessage = 'Erro ao criar conta. Tente novamente.';
                    
                    if (error.code === 'auth/email-already-in-use') {
                        errorMessage = 'Este email já está sendo utilizado';
                    } else if (error.code === 'auth/invalid-email') {
                        errorMessage = 'Email inválido';
                    } else if (error.code === 'auth/weak-password') {
                        errorMessage = 'A senha é muito fraca';
                    }
                    
                    showError(registerError, errorMessage);
                })
                .finally(() => {
                    // Ocultar loading
                    loadingSpinner.style.display = 'none';
                    btnText.style.opacity = '1';
                    registerButton.disabled = false;
                });
        });
    }
    
    // Ajuste para dispositivos móveis
    function adjustForMobile() {
        if (window.innerWidth <= 768) {
            if (loginButton) {
                loginButton.style.padding = '0.5rem 1rem';
                loginButton.style.fontSize = '0.85rem';
            }
        } else {
            if (loginButton) {
                loginButton.style.padding = '0.6rem 1.2rem';
                loginButton.style.fontSize = '0.9rem';
            }
        }
    }
    
    // Aplicar ajustes mobile
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
    
    // ===== INICIALIZAÇÃO =====
    
    // Monitorar estado de autenticação
    if (auth) {
        console.log('Configurando monitor de autenticação...');
        auth.onAuthStateChanged(function(user) {
            console.log('Estado de autenticação alterado:', user ? 'Logado' : 'Não logado');
            updateUIWithUser(user);
        });
    } else {
        console.warn('Auth não disponível, UI pode não funcionar corretamente');
    }
    
    console.log('Sistema de login inicializado com sucesso');
});
