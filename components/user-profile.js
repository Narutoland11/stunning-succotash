/**
 * Componente de Perfil de Usuário
 * Este arquivo contém funções para gerenciar o perfil do usuário,
 * evitando duplicação de código entre user-sections.html e index.html
 */

// Função para carregar dados do perfil
function loadUserProfile(userId) {
  return new Promise((resolve, reject) => {
    const userRef = db.collection('users').doc(userId);
    
    userRef.get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        updateProfileUI(userData);
        resolve(userData);
      } else {
        console.warn("Nenhum dado de perfil encontrado!");
        reject("Perfil não encontrado");
      }
    }).catch((error) => {
      console.error("Erro ao carregar perfil:", error);
      reject(error);
    });
  });
}

// Atualiza a interface com os dados do perfil
function updateProfileUI(userData) {
  // Avatar e iniciais
  const profileAvatar = document.getElementById('profile-avatar');
  const profileInitials = document.getElementById('profile-initials');
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const displayNameInput = document.getElementById('displayName');
  
  if (userData.photoURL) {
    profileInitials.style.display = 'none';
    profileAvatar.style.backgroundImage = `url(${userData.photoURL})`;
    profileAvatar.classList.add('has-photo');
  } else {
    const initials = getInitials(userData.displayName || userData.email);
    profileInitials.textContent = initials;
    profileAvatar.classList.remove('has-photo');
    profileInitials.style.display = 'flex';
  }
  
  // Nome e email
  if (profileName) profileName.textContent = userData.displayName || "Usuário";
  if (profileEmail) profileEmail.textContent = userData.email || "";
  if (displayNameInput) displayNameInput.value = userData.displayName || "";
  
  // Outros campos do perfil
  if (document.getElementById('especialidade')) {
    document.getElementById('especialidade').value = userData.especialidade || "";
  }
  
  if (document.getElementById('instituicao')) {
    document.getElementById('instituicao').value = userData.instituicao || "";
  }
  
  if (document.getElementById('telefone')) {
    document.getElementById('telefone').value = userData.telefone || "";
  }
  
  if (document.getElementById('bio')) {
    document.getElementById('bio').value = userData.bio || "";
  }
}

// Obter iniciais do nome
function getInitials(name) {
  if (!name) return "U";
  
  const parts = name.split(' ').filter(part => part.length > 0);
  
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// Inicializar tabs do perfil
function initProfileTabs() {
  const tabs = document.querySelectorAll('.profile-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove classe ativa de todas as tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      // Adiciona classe ativa na tab clicada
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      // Atualiza conteúdo da tab
      const tabId = tab.getAttribute('data-tab');
      const tabContents = document.querySelectorAll('.profile-tab-content');
      
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Função para salvar dados do perfil
function saveUserProfile(userId, profileData) {
  return db.collection('users').doc(userId).update(profileData)
    .then(() => {
      showNotification('Perfil atualizado com sucesso!', 'success');
      return true;
    })
    .catch(error => {
      console.error("Erro ao atualizar perfil:", error);
      showNotification('Erro ao atualizar perfil. Tente novamente.', 'error');
      throw error;
    });
}

// Exibir notificação
function showNotification(message, type = 'info') {
  // Implementação de notificação
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
