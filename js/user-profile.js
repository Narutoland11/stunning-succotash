/**
 * Moz Doctor Dose - Sistema de Gerenciamento de Perfil de Usuário
 * Responsável pela interface e funcionalidades da página "Meu Perfil"
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
    
    // Firebase Auth e Database
    const auth = firebase.auth();
    const database = firebase.database();
    
    // Estado do usuário atual
    let currentUser = null;
    let isAdmin = false;
    let userProfile = {};
    
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
        
        // Mostrar atividades recentes (se implementado)
        updateRecentActivities();
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
            
            // Verificar se há um novo arquivo de imagem
            if (profilePhotoInput.files && profilePhotoInput.files[0]) {
                // Aqui você pode implementar o upload para o Firebase Storage
                // Por enquanto, vamos apenas atualizar os outros campos
                
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
                
                // Por enquanto, apenas atualizamos o restante dos dados
                saveProfileData(updatedProfile, submitBtn);
            } else {
                // Salvar perfil sem foto nova
                saveProfileData(updatedProfile, submitBtn);
            }
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
