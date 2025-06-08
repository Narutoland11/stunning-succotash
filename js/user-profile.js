/**
 * Moz Doctor Dose - Sistema de Gerenciamento de Perfil de Usuário
 * Responsável pela interface e funcionalidades da página "Meu Perfil"
 * Versão aprimorada com melhor integração mobile
 */

// Disparado quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const profileSection = document.getElementById('perfil');
    const profileContent = document.getElementById('profile-content');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');
    const profileInitials = document.getElementById('profile-initials');
    const profileRole = document.getElementById('profile-role');
    const profileForm = document.getElementById('profile-form');
    const profilePhotoInput = document.getElementById('profile-photo-input');
    const photoPreview = document.getElementById('photo-preview');
    const profileTabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.profile-tab-content');
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.getElementById('nav-overlay');
    
    // Firebase Auth e Database
    const auth = firebase.auth();
    const database = firebase.database();
    
    // Estado do usuário atual
    let currentUser = null;
    let isAdmin = false;
    let userProfile = {};
    let isMobile = window.innerWidth <= 768;
    
    // Função para verificação de dispositivo móvel
    function checkMobileState() {
        isMobile = window.innerWidth <= 768;
        return isMobile;
    }
    
    // Detectar mudanças de tamanho da tela
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        const nowMobile = checkMobileState();
        
        if (wasMobile !== nowMobile) {
            // O estado mudou entre desktop/mobile, ajustar a interface
            updateProfileUILayout();
        }
    });
    
    // Listener para alterações no estado de autenticação
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // Usuário está logado
            currentUser = user;
            
            // Verificar se o usuário é administrador
            const adminRef = database.ref('admins/' + user.uid);
            adminRef.once('value').then((snapshot) => {
                isAdmin = snapshot.exists() && snapshot.val() === true;
                
                // Mostrar seção de perfil no menu
                const profileMenuItem = document.getElementById('menu-perfil');
                if (profileMenuItem) {
                    profileMenuItem.style.display = 'block';
                }
                
                // Carregar dados do perfil
                loadUserProfile();
            });
        } else {
            // Usuário não está logado
            currentUser = null;
            isAdmin = false;
            
            // Ocultar seção de perfil no menu
            const profileMenuItem = document.getElementById('menu-perfil');
            if (profileMenuItem) {
                profileMenuItem.style.display = 'none';
            }
            
            // Ocultar seção de perfil se estiver visível
            if (profileSection) {
                profileSection.classList.remove('active');
            }
        }
    });
    
    // Carrega os dados do perfil do usuário
    function loadUserProfile() {
        if (!currentUser) return;
        
        // Referência ao perfil do usuário
        const userRef = database.ref('users/' + currentUser.uid);
        
        // Buscar dados do perfil
        userRef.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                userProfile = snapshot.val();
            } else {
                // Criar perfil básico se não existir
                userProfile = {
                    displayName: currentUser.displayName || '',
                    email: currentUser.email,
                    photoURL: currentUser.photoURL || '',
                    createdAt: currentUser.metadata.creationTime,
                    especialidade: '',
                    instituicao: '',
                    bio: '',
                    telefone: '',
                    preferences: {
                        darkMode: false,
                        notifications: true,
                        newsletter: true
                    }
                };
                
                // Salvar perfil básico
                userRef.set(userProfile);
            }
            
            // Atualizar a interface
            updateProfileUI();
        });
    }
    
    // Atualiza a interface do perfil com dados do usuário
    function updateProfileUI() {
        if (!profileContent || !currentUser) return;
        
        // Atualizar nome, email e papel
        if (profileName) profileName.textContent = userProfile.displayName || currentUser.displayName || 'Usuário';
        if (profileEmail) profileEmail.textContent = currentUser.email;
        
        // Definir papel (administrador ou usuário)
        if (profileRole) {
            if (isAdmin) {
                profileRole.textContent = 'Administrador';
                profileRole.classList.add('admin');
            } else {
                profileRole.textContent = 'Usuário';
                profileRole.classList.remove('admin');
            }
        }
        
        // Atualizar avatar
        updateProfileAvatar();
        
        // Preencher formulário com dados existentes
        if (profileForm) {
            profileForm.elements['displayName'].value = userProfile.displayName || '';
            profileForm.elements['especialidade'].value = userProfile.especialidade || '';
            profileForm.elements['instituicao'].value = userProfile.instituicao || '';
            profileForm.elements['telefone'].value = userProfile.telefone || '';
            profileForm.elements['bio'].value = userProfile.bio || '';
        }
        
        // Ajustar o layout com base no dispositivo
        updateProfileUILayout();
        
        // Mostrar atividades recentes (se implementado)
        updateRecentActivities();
    }
    
    // Ajusta o layout da UI do perfil com base no tipo de dispositivo
    function updateProfileUILayout() {
        if (!profileSection) return;
        
        checkMobileState(); // Atualiza a variável isMobile
        
        // Ajustes específicos para mobile
        if (isMobile) {
            // Garantir que os botões de perfil tenham tamanho adequado
            const profileButtons = profileSection.querySelectorAll('.profile-btn');
            profileButtons.forEach(btn => {
                btn.classList.add('mobile-optimized');
            });
            
            // Ajustar tamanho do formulário para dispositivos menores
            if (profileForm) {
                profileForm.classList.add('mobile-layout');
            }
            
            // Ajustar lista de atividades para formato mobile
            const activityList = document.getElementById('activities-list');
            if (activityList) {
                activityList.classList.add('mobile-view');
            }
        } else {
            // Reverter ajustes para desktop
            const profileButtons = profileSection.querySelectorAll('.profile-btn');
            profileButtons.forEach(btn => {
                btn.classList.remove('mobile-optimized');
            });
            
            if (profileForm) {
                profileForm.classList.remove('mobile-layout');
            }
            
            const activityList = document.getElementById('activities-list');
            if (activityList) {
                activityList.classList.remove('mobile-view');
            }
        }
        
        // Verificar se o modo escuro está ativo para ajustes específicos
        if (document.body.classList.contains('dark-mode')) {
            profileSection.querySelectorAll('.profile-avatar, .profile-avatar-edit')
                .forEach(el => el.classList.add('dark-mode-adjusted'));
        }
    }
    
    // Atualiza o avatar do perfil
    function updateProfileAvatar() {
        if (!profileAvatar || !profileInitials) return;
        
        const photoURL = userProfile.photoURL || currentUser.photoURL;
        
        if (photoURL) {
            // Se o usuário tem uma foto de perfil
            profileInitials.style.display = 'none';
            
            // Criar elemento de imagem
            const img = document.createElement('img');
            img.src = photoURL;
            img.alt = 'Foto de perfil';
            
            // Limpar avatar e adicionar a imagem
            profileAvatar.innerHTML = '';
            profileAvatar.appendChild(img);
        } else {
            // Se o usuário não tem foto, mostrar iniciais
            profileInitials.style.display = 'flex';
            
            // Obter iniciais do nome
            const name = userProfile.displayName || currentUser.displayName || currentUser.email;
            const initials = name.split(' ')
                .map(part => part[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();
            
            profileInitials.textContent = initials;
            profileAvatar.innerHTML = '';
            profileAvatar.appendChild(profileInitials);
        }
    }
    
    // Função para lidar com o redirecionamento para a seção de perfil
    function handleProfileNavigation() {
        // Verificar se estamos em dispositivo móvel e o menu está aberto
        if (window.innerWidth <= 768 && mainNav && mainNav.classList.contains('visible')) {
            // Fechar o menu móvel
            if (typeof toggleMenu === 'function') {
                toggleMenu(false);
            } else {
                // Fallback se a função toggleMenu não estiver disponível
                mainNav.classList.remove('visible');
                if (navOverlay) navOverlay.classList.remove('visible');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    navToggle.classList.remove('active');
                }
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        }
        
        // Exibir a seção de perfil
        if (profileSection) {
            // Ocultar todas as seções primeiro
            const allSections = document.querySelectorAll('.tool-section');
            allSections.forEach(section => section.classList.remove('active'));
            
            // Mostrar a seção de perfil
            profileSection.classList.add('active');
            
            // Atualizar o hash da URL
            history.replaceState(null, null, '#perfil');
            
            // Scroll suave para a seção
            setTimeout(() => {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = profileSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({top: targetPosition, behavior: 'smooth'});
            }, 100);
        }
    }

    // Manipulador de eventos para cliques em links de perfil no menu
    const profileMenuLinks = document.querySelectorAll('a[href="#perfil"]');
    if (profileMenuLinks) {
        profileMenuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handleProfileNavigation();
            });
        });
    }

    // Eventos para tabs do perfil
    if (profileTabs) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover classe ativa de todas as tabs
                profileTabs.forEach(t => t.classList.remove('active'));
                
                // Adicionar classe ativa na tab clicada
                tab.classList.add('active');
                
                // Mostrar conteúdo correspondente
                const targetId = tab.getAttribute('data-tab');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetId) {
                        content.classList.add('active');
                        
                        // Animação de fade in
                        content.style.opacity = '0';
                        setTimeout(() => {
                            content.style.opacity = '1';
                        }, 50);
                    }
                });
            });
        });
    }
    
    // Preview de foto de perfil
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    photoPreview.src = event.target.result;
                    photoPreview.style.display = 'block';
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
    
    // Evento para salvar alterações no perfil
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar carregamento
            const submitBtn = profileForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Salvando...';
            submitBtn.disabled = true;
            
            // Obter dados do formulário
            const updatedProfile = {
                displayName: profileForm.elements['displayName'].value,
                especialidade: profileForm.elements['especialidade'].value,
                instituicao: profileForm.elements['instituicao'].value,
                telefone: profileForm.elements['telefone'].value,
                bio: profileForm.elements['bio'].value
            };
            
            // Implementará upload de foto quando estiver configurado
            // A verificação condicional estava redundante - removida
            
            // Atualização dos outros campos do perfil
                
                // Exemplo se Firebase Storage estiver configurado:
                /*
                const storageRef = firebase.storage().ref();
                const photoRef = storageRef.child('profile_photos/' + currentUser.uid);
                
                photoRef.put(profilePhotoInput.files[0]).then(function(snapshot) {
                    return snapshot.ref.getDownloadURL();
                }).then(function(downloadURL) {
                    updatedProfile.photoURL = downloadURL;
                    saveProfileData(updatedProfile, submitBtn);
                });
                */
                
                // Salvar perfil com os dados atualizados
                saveProfileData(updatedProfile, submitBtn);
        });
    }
    
    // Salva os dados do perfil no Firebase
    function saveProfileData(profileData, button) {
        if (!currentUser) return;
        
        // Atualizar dados no Firebase
        const userRef = database.ref('users/' + currentUser.uid);
        userRef.update(profileData).then(() => {
            // Atualizar nome de exibição no Auth se foi alterado
            if (profileData.displayName !== currentUser.displayName) {
                currentUser.updateProfile({
                    displayName: profileData.displayName
                });
            }
            
            // Atualizar perfil local
            Object.assign(userProfile, profileData);
            
            // Atualizar UI
            updateProfileUI();
            
            // Mostrar mensagem de sucesso
            showProfileMessage('success', 'Perfil atualizado com sucesso!');
            
            // Restaurar botão
            if (button) {
                button.textContent = 'Salvar Alterações';
                button.disabled = false;
            }
        }).catch(error => {
            // Mostrar erro
            showProfileMessage('error', 'Erro ao atualizar perfil: ' + error.message);
            
            // Restaurar botão
            if (button) {
                button.textContent = 'Salvar Alterações';
                button.disabled = false;
            }
        });
    }
    
    // Mostra mensagem de feedback no perfil
    function showProfileMessage(type, message, duration = 5000) {
        // Remover mensagens anteriores
        const previousMessages = document.querySelectorAll('.profile-message');
        previousMessages.forEach(el => el.remove());
        
        // Criar elemento de mensagem
        const messageEl = document.createElement('div');
        messageEl.className = `profile-message ${type}`;
        messageEl.textContent = message;
        
        // Adicionar ao perfil
        if (profileContent) {
            profileContent.insertBefore(messageEl, profileContent.firstChild);
            
            // Auto-remover após duração
            setTimeout(() => {
                messageEl.classList.add('fade-out');
                setTimeout(() => messageEl.remove(), 500);
            }, duration);
        }
    }
    
    // Função para fazer upload da imagem - Compatível com Netlify
    function uploadProfileImage(file) {
        // Mostrar indicador de progresso
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'upload-progress-indicator';
        progressIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando imagem...';
        profileAvatar.parentNode.appendChild(progressIndicator);
        
        // Verificar se o Firebase Storage está inicializado
        if (!firebase.storage) {
            console.error('Firebase Storage não está inicializado');
            progressIndicator.remove();
            showProfileMessage('error', 'Serviço de armazenamento não disponível');
            return;
        }
        
        // Referência para o arquivo no Storage
        const storageRef = firebase.storage().ref();
        const profileImagesRef = storageRef.child(`profile_images/${currentUser.uid}/profile_${Date.now()}`);
        
        // Upload do arquivo
        const uploadTask = profileImagesRef.put(file);
        
        // Monitorar progresso
        uploadTask.on('state_changed', 
            // Progresso
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload: ' + progress + '%');
                progressIndicator.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Enviando: ${Math.round(progress)}%`;
            },
            // Erro
            (error) => {
                progressIndicator.remove();
                console.error('Erro no upload:', error);
                showProfileMessage('error', 'Falha no upload da imagem');
            },
            // Sucesso
            () => {
                // Obter URL do arquivo
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // Remover indicador
                    progressIndicator.remove();
                    
                    // Salvar URL no perfil
                    userProfile.photoURL = downloadURL;
                    
                    // Atualizar no Firebase Database
                    database.ref('users/' + currentUser.uid).update({
                        photoURL: downloadURL,
                        lastUpdated: firebase.database.ServerValue.TIMESTAMP
                    });
                    
                    // Atualizar no Auth
                    currentUser.updateProfile({
                        photoURL: downloadURL
                    });
                    
                    // Atualizar UI
                    updateProfileAvatar();
                    
                    // Registrar atividade
                    logUserActivity(currentUser.uid, 'profile_update', 'Atualizou foto de perfil');
                    
                    // Mensagem de sucesso
                    showProfileMessage('success', 'Foto de perfil atualizada com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao obter URL:', error);
                    showProfileMessage('error', 'Falha ao processar a imagem');
                });
            }
        );
    }
    
    // Atualiza atividades recentes no perfil
    function updateRecentActivities() {
        const activitiesList = document.getElementById('activities-list');
        if (!activitiesList || !currentUser) return;
        
        // Referência às atividades do usuário
        const activitiesRef = database.ref('user_activities/' + currentUser.uid).limitToLast(10);
        
        // Limpar lista
        activitiesList.innerHTML = '';
        
        // Buscar atividades
        activitiesRef.once('value').then((snapshot) => {
            if (!snapshot.exists()) {
                // Nenhuma atividade registrada
                const noActivity = document.createElement('li');
                noActivity.className = 'activity-item';
                noActivity.innerHTML = '<div class="activity-icon"><i class="fas fa-info-circle"></i></div><div class="activity-details"><p class="activity-message">Nenhuma atividade recente registrada.</p></div>';
                activitiesList.appendChild(noActivity);
                return;
            }
            
            // Processar atividades
            const activities = [];
            snapshot.forEach((childSnapshot) => {
                activities.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            // Ordenar por data (mais recente primeiro)
            activities.sort((a, b) => b.timestamp - a.timestamp);
            
            // Adicionar à lista
            activities.forEach(activity => {
                const item = document.createElement('li');
                item.className = 'activity-item';
                
                // Determinar ícone com base no tipo
                let icon = 'fa-check-circle';
                switch(activity.type) {
                    case 'login': icon = 'fa-sign-in-alt'; break;
                    case 'logout': icon = 'fa-sign-out-alt'; break;
                    case 'update': icon = 'fa-user-edit'; break;
                    case 'calculation': icon = 'fa-calculator'; break;
                    case 'view': icon = 'fa-eye'; break;
                }
                
                // Formatar data
                const date = new Date(activity.timestamp);
                const formattedDate = date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
                
                // Montar HTML
                item.innerHTML = `
                    <div class="activity-icon"><i class="fas ${icon}"></i></div>
                    <div class="activity-details">
                        <p class="activity-message">${activity.message}</p>
                        <span class="activity-time">${formattedDate}</span>
                    </div>
                `;
                
                activitiesList.appendChild(item);
            });
        });
    }
});

// Registrar atividade de usuário
function logUserActivity(userId, type, message) {
    if (!userId) return;
    
    const database = firebase.database();
    const activityRef = database.ref('user_activities/' + userId).push();
    
    return activityRef.set({
        type: type,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}
