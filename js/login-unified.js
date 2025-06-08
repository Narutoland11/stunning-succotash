/**
 * Sistema unificado de login para Moz Doctor Dose
 * Centraliza toda a lógica do sistema de login, incluindo autenticação Firebase,
 * alternância entre abas de login e registro, e atualização da interface do usuário.
 * 
 * @version 2.1.0
 * @author Moz Doctor Dose Dev Team
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Login script inicializado');
    
    // Evitar múltiplas inicializações de formulário de login (problema reportado no Netlify)
    if (window.loginScriptInitialized) {
        console.warn('Script de login já foi inicializado anteriormente, evitando duplicação');
        return;
    }
    window.loginScriptInitialized = true;

    // Referência ao auth do Firebase - usar a instância já inicializada pelo firebase-init.js
    let auth;
    try {
        // Usar a instância do Firebase que já deveria estar inicializada
        if (firebase && firebase.apps && firebase.apps.length > 0) {
            console.log('Usando instância do Firebase já inicializada');
            auth = firebase.auth();
        } else {
            console.warn('Firebase não encontrado ou não inicializado, tentando inicializar...');
            // Fallback - tentar inicializar se não foi feito antes
            const firebaseConfig = {
                apiKey: "AIzaSyAW2V-AmQEkZPgA6WHdUG2z_n5AizBNDGo",
                authDomain: "mozdoctordose.firebaseapp.com",
                databaseURL: "https://mozdoctordose-default-rtdb.firebaseio.com",
                projectId: "mozdoctordose",
                storageBucket: "mozdoctordose.firebasestorage.app",
                messagingSenderId: "241428315907",
                appId: "1:241428315907:web:297fc71778b21b410b7336",
                measurementId: "G-2WVCDZL9KL"
            };
            firebase.initializeApp(firebaseConfig);
            auth = firebase.auth();
            console.log('Firebase inicializado pelo script de login como fallback');
        }
    } catch (error) {
        console.error('Erro ao obter Firebase Auth:', error);
        console.warn('Continuando sem autenticação...');
    }
    
    setupLoginEventListeners();
});

/**
 * Configura todos os eventos relacionados ao sistema de login
 * Separado para poder ser chamado mesmo quando o container já existe
 */
function setupLoginEventListeners() {
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
    
    // Erro e carregamento
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    
    // Elemento do menu toggle para responsividade
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    // Função para mostrar o modal de login
    function showLoginModal() {
        if (loginContainer) {
            loginContainer.classList.add('active');
            // Resetar para o formulário de login por padrão
            if (loginTab) switchToLoginTab();
        }
    }
    
    // Função para fechar o modal de login
    function closeLoginModal() {
        if (loginContainer) {
            loginContainer.classList.remove('active');
            // Limpar os formulários
            if (loginForm) loginForm.reset();
            if (registerForm) registerForm.reset();
            // Esconder mensagens de erro
            if (loginError) hideError(loginError);
            if (registerError) hideError(registerError);
        }
    }
    
    // Função para alternar para o formulário de login
    function switchToLoginTab() {
        if (!loginTab || !registerTab || !loginForm || !registerForm) return;
        
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        
        document.getElementById('login-form-container').style.display = 'block';
        document.getElementById('register-form-container').style.display = 'none';
        
        // Limpar mensagens de erro
        hideError(loginError);
    }
    
    // Função para alternar para o formulário de registro
    function switchToRegisterTab() {
        if (!loginTab || !registerTab || !loginForm || !registerForm) return;
        
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        
        document.getElementById('login-form-container').style.display = 'none';
        document.getElementById('register-form-container').style.display = 'block';
        
        // Limpar mensagens de erro
        hideError(registerError);
    }
    
    // Função para exibir mensagem de erro
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    }
    
    // Função para esconder mensagem de erro
    function hideError(element) {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    }
    
    // Função melhorada para atualizar UI com estado do usuário
    function updateUIWithUser(user) {
        console.log('Atualizando interface para', user ? 'usuário autenticado' : 'usuário desconectado');
        
        try {
            // Garantir que todos os elementos sejam buscados novamente
            // para evitar problemas de referências nulas após DOM ser atualizado
            const loginBtn = document.getElementById('login-button');
            const userMenuBtn = document.getElementById('user-menu-button');
            const userNameElement = document.getElementById('user-name');
            const userAvatarElement = document.getElementById('user-avatar');
            const logoutBtn = document.getElementById('logout-button');
            
            // Verificar se os elementos existem antes de manipulá-los
            if (user) {
                // Usuário está logado
                console.log('Mostrando UI para usuário logado');
                
                // Esconder botão de login e mostrar menu do usuário
                if (loginBtn) {
                    loginBtn.style.display = 'none';
                    console.log('Botão de login ocultado');
                }
                
                if (userMenuBtn) {
                    userMenuBtn.style.display = 'flex';
                    console.log('Menu do usuário exibido');
                }
                
                // Atualizar avatar e nome com dados do usuário
                if (userNameElement && user.email) {
                    userNameElement.textContent = user.email.split('@')[0];
                    console.log('Nome do usuário atualizado');
                }
                
                if (userAvatarElement && user.email) {
                    userAvatarElement.textContent = user.email.charAt(0).toUpperCase();
                    console.log('Avatar do usuário atualizado');
                }
                
                // Configurar o botão de logout
                if (logoutBtn) {
                    // Garantir que temos apenas um listener para evitar múltiplas chamadas
                    logoutBtn.addEventListener('click', handleLogout);
                    console.log('Botão de logout configurado');
                }
                
                // Verificar se é admin
                const adminSection = document.getElementById('admin-section');
                if (adminSection) {
                    user.getIdTokenResult().then((idTokenResult) => {
                        if (idTokenResult.claims && idTokenResult.claims.admin) {
                            adminSection.style.display = 'block';
                            console.log('Seção de admin exibida para usuário admin');
                        } else {
                            adminSection.style.display = 'none';
                            console.log('Seção de admin ocultada (usuário não é admin)');
                        }
                    }).catch(error => {
                        console.error('Erro ao verificar status de admin:', error);
                        adminSection.style.display = 'none';
                    });
                }
                
                // Atualizar quaisquer outros elementos que dependam do estado de login
                document.body.classList.add('user-logged-in');
                document.body.classList.remove('user-logged-out');
                
            } else {
                // Usuário não está logado
                console.log('Mostrando UI para usuário deslogado');
                
                // Mostrar botão de login e esconder menu do usuário
                if (loginBtn) {
                    loginBtn.style.display = 'flex';
                    console.log('Botão de login exibido');
                }
                
                if (userMenuBtn) {
                    userMenuBtn.style.display = 'none';
                    console.log('Menu do usuário ocultado');
                }
                
                // Limpar informações do usuário anterior
                if (userNameElement) userNameElement.textContent = '';
                if (userAvatarElement) userAvatarElement.textContent = '';
                
                // Esconder seção de admin
                const adminSection = document.getElementById('admin-section');
                if (adminSection) adminSection.style.display = 'none';
                
                // Atualizar quaisquer outros elementos que dependam do estado de login
                document.body.classList.add('user-logged-out');
                document.body.classList.remove('user-logged-in');
            }
        } catch (error) {
            console.error('Erro ao atualizar UI com estado do usuário:', error);
        }
    }
    
    // Event Listeners
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
    userMenuButton.addEventListener('click', function() {
        if (userDropdown) userDropdown.classList.toggle('active');
    });
}

// Função de logout separada para poder ser referenciada em qualquer lugar
function handleLogout(event) {
    if (event) event.preventDefault();
    
    console.log('Iniciando processo de logout...');
    if (!auth) {
        console.error('Auth não disponível, não é possível fazer logout');
        return;
    }
    
    auth.signOut()
        .then(() => {
            console.log('Logout bem-sucedido');
            // Esconder menu dropdown se existir
            const userDropdown = document.getElementById('user-dropdown');
            if (userDropdown) userDropdown.classList.remove('active');
            
            // Atualizar interface imediatamente sem esperar pelo onAuthStateChanged
            updateUIWithUser(null);
            !userMenuButton.contains(event.target) && 
            !userDropdown.contains(event.target)) {
            userDropdown.classList.remove('active');
        }
        
        // Fechar o modal de login ao clicar fora dele
        if (loginContainer && 
            event.target === loginContainer && 
            !event.target.closest('.login-panel')) {
            closeLoginModal();
        }
    });
    
    // Monitorar o estado de autenticação - CRUCIAL para atualizar a UI
    if (auth) {
        console.log('Configurando listener de estado de autenticação');
        auth.onAuthStateChanged(function(user) {
            console.log('Estado de autenticação alterado:', user ? 'Usuário logado' : 'Usuário não logado');
            updateUIWithUser(user);
            
            // Armazenar estado de login para referência
            if (user) {
                localStorage.setItem('userLoggedIn', 'true');
            } else {
                localStorage.removeItem('userLoggedIn');
            }
        });
    } else {
        console.warn('Auth não disponível, não é possível monitorar estado de autenticação');
    }
    
    // Configurar o menu toggle para dispositivos móveis
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Se o usuário abrir o menu, feche o login se estiver aberto
            if (loginContainer && loginContainer.classList.contains('active')) {
                closeLoginModal();
            }
        });
        
        // Ajustar posição do botão de login quando em dispositivo móvel
        function adjustLoginButtonPosition() {
            if (window.innerWidth <= 768) {
                if (loginButton) {
                    // Em dispositivos móveis, posicionar o botão de login adequadamente
                    loginButton.style.padding = '0.5rem 1rem';
                    loginButton.style.fontSize = '0.85rem';
                }
            } else {
                if (loginButton) {
                    // Restaurar o estilo padrão em dispositivos maiores
                    loginButton.style.padding = '0.6rem 1.2rem';
                    loginButton.style.fontSize = '0.9rem';
                }
            }
        }
        
        // Ajustar no carregamento e quando a janela for redimensionada
        adjustLoginButtonPosition();
        window.addEventListener('resize', adjustLoginButtonPosition);
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
            
            // Limpar mensagens de erro anteriores
            hideError(loginError);
            
            // Fazer login
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Login bem-sucedido, fechar modal
                    closeLoginModal();
                })
                .catch((error) => {
                    // Exibir mensagem de erro
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
                    // Esconder loading
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
            
            // Verificar se as senhas são iguais
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
            
            // Limpar mensagens de erro anteriores
            hideError(registerError);
            
            // Criar conta
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Registro bem-sucedido, fechar modal
                    closeLoginModal();
                })
                .catch((error) => {
                    // Exibir mensagem de erro
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
                    // Esconder loading
                    loadingSpinner.style.display = 'none';
                    btnText.style.opacity = '1';
                    registerButton.disabled = false;
                });
        });
    }
    
    // Verificar estado de autenticação do usuário
    auth.onAuthStateChanged(function(user) {
        updateUIWithUser(user);
    });
    
    // Estilização do botão de login e posicionamento
    if (loginButton) {
        const styleButton = () => {
            loginButton.style.background = '#2563eb';
            loginButton.style.color = '#fff';
            loginButton.style.border = 'none';
            loginButton.style.padding = '0.6rem 1.2rem';
            loginButton.style.borderRadius = '50px';
            loginButton.style.fontWeight = '600';
            loginButton.style.fontSize = '0.9rem';
            loginButton.style.transition = 'all 0.3s ease';
        };
        
        // Aplicar estilo
        styleButton();
    }
    
    // Posicionamento dos botões de autenticação
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.style.position = 'absolute';
        authButtons.style.top = '1rem';
        authButtons.style.right = '1.5rem';
        authButtons.style.display = 'flex';
        authButtons.style.alignItems = 'center';
        authButtons.style.zIndex = '100';
    }
    
    console.log('Sistema unificado de login inicializado com sucesso');
});
