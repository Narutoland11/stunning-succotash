/**
 * Moz Doctor Dose - Sistema de Notificações de Usuário
 * Gerencia notificações no sistema e preferências do usuário
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referências Firebase
    const auth = firebase.auth();
    const database = firebase.database();
    
    // Elementos DOM
    const notificationBell = document.getElementById('notification-bell');
    const notificationCounter = document.getElementById('notification-counter');
    const notificationList = document.getElementById('notification-list');
    const notificationPanel = document.getElementById('notification-panel');
    
    // Estado
    let currentUser = null;
    let unreadCount = 0;
    let notifications = [];
    let notificationListener = null;
    
    // Listener para alterações no estado de autenticação
    auth.onAuthStateChanged(function(user) {
        if (user) {
            currentUser = user;
            
            // Carregar preferências de notificações
            loadNotificationPreferences();
            
            // Iniciar listener de notificações
            startNotificationListener();
            
            // Mostrar elementos de UI relacionados a notificações se necessário
            if (notificationBell) notificationBell.style.display = 'block';
        } else {
            currentUser = null;
            
            // Remover listener de notificações
            stopNotificationListener();
            
            // Ocultar elementos de UI relacionados a notificações
            if (notificationBell) notificationBell.style.display = 'none';
            if (notificationPanel && notificationPanel.classList.contains('active')) {
                notificationPanel.classList.remove('active');
            }
        }
    });
    
    // Configurar toggle do painel de notificações quando clicado no ícone
    if (notificationBell) {
        notificationBell.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle do painel de notificações
            if (notificationPanel) {
                notificationPanel.classList.toggle('active');
                
                // Se aberto, marcar como lidas
                if (notificationPanel.classList.contains('active')) {
                    markAllAsRead();
                }
            }
        });
    }
    
    // Fechar painel quando clicar fora
    document.addEventListener('click', function(e) {
        if (notificationPanel && notificationPanel.classList.contains('active')) {
            if (!notificationPanel.contains(e.target) && e.target !== notificationBell) {
                notificationPanel.classList.remove('active');
            }
        }
    });
    
    /**
     * Carregar preferências de notificações do usuário
     */
    function loadNotificationPreferences() {
        if (!currentUser) return;
        
        database.ref(`users/${currentUser.uid}/preferences`).once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // Configurar com base nas preferências
                    const preferences = snapshot.val();
                    
                    // Se o usuário desativou todas as notificações
                    if (preferences.notifications === false) {
                        stopNotificationListener();
                        if (notificationBell) notificationBell.style.display = 'none';
                    }
                }
            });
    }
    
    /**
     * Iniciar listener para novas notificações
     */
    function startNotificationListener() {
        if (!currentUser) return;
        
        // Referência para as notificações do usuário
        const notificationRef = database.ref(`notifications/${currentUser.uid}`);
        
        // Remover listener anterior se existir
        stopNotificationListener();
        
        // Configurar novo listener
        notificationListener = notificationRef.orderByChild('timestamp').on('value', (snapshot) => {
            notifications = [];
            unreadCount = 0;
            
            // Processar notificações
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const notification = childSnapshot.val();
                    notification.id = childSnapshot.key;
                    notifications.push(notification);
                    
                    // Contar não lidas
                    if (!notification.read) {
                        unreadCount++;
                    }
                });
                
                // Ordenar por data (mais recentes primeiro)
                notifications.sort((a, b) => b.timestamp - a.timestamp);
            }
            
            // Atualizar UI
            updateNotificationUI();
        });
    }
    
    /**
     * Parar de ouvir por notificações
     */
    function stopNotificationListener() {
        if (notificationListener) {
            database.ref(`notifications/${currentUser?.uid}`).off('value', notificationListener);
            notificationListener = null;
        }
    }
    
    /**
     * Atualizar UI de notificações
     */
    function updateNotificationUI() {
        // Atualizar contador
        if (notificationCounter) {
            if (unreadCount > 0) {
                notificationCounter.textContent = unreadCount > 9 ? '9+' : unreadCount;
                notificationCounter.style.display = 'block';
            } else {
                notificationCounter.style.display = 'none';
            }
        }
        
        // Atualizar lista de notificações
        if (notificationList) {
            notificationList.innerHTML = '';
            
            if (notifications.length === 0) {
                // Mostrar mensagem de nenhuma notificação
                const emptyItem = document.createElement('li');
                emptyItem.className = 'notification-item empty';
                emptyItem.innerHTML = '<p>Nenhuma notificação.</p>';
                notificationList.appendChild(emptyItem);
            } else {
                // Mostrar as notificações (limitar a 10)
                const maxToShow = Math.min(notifications.length, 10);
                
                for (let i = 0; i < maxToShow; i++) {
                    const notification = notifications[i];
                    const notificationItem = createNotificationElement(notification);
                    notificationList.appendChild(notificationItem);
                }
                
                // Se houver mais notificações, mostrar link "Ver todas"
                if (notifications.length > 10) {
                    const viewAllItem = document.createElement('li');
                    viewAllItem.className = 'notification-item view-all';
                    viewAllItem.innerHTML = '<a href="#notificacoes">Ver todas as notificações</a>';
                    notificationList.appendChild(viewAllItem);
                }
            }
        }
    }
    
    /**
     * Criar elemento DOM para uma notificação
     */
    function createNotificationElement(notification) {
        const item = document.createElement('li');
        item.className = 'notification-item';
        if (!notification.read) {
            item.classList.add('unread');
        }
        
        // Determinar ícone com base no tipo
        let icon = 'bell';
        if (notification.type === 'alert') icon = 'exclamation-triangle';
        else if (notification.type === 'info') icon = 'info-circle';
        else if (notification.type === 'success') icon = 'check-circle';
        else if (notification.type === 'login') icon = 'sign-in-alt';
        else if (notification.type === 'update') icon = 'sync';
        
        // Formatar data
        const date = new Date(notification.timestamp);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        // Construir HTML
        item.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-header">
                    <span class="notification-title">${notification.title}</span>
                    <span class="notification-time">${formattedDate}</span>
                </div>
                <p class="notification-message">${notification.message}</p>
            </div>
            <div class="notification-actions">
                <button class="notification-mark-read" data-id="${notification.id}">${notification.read ? '<i class="fas fa-check"></i>' : '<i class="fas fa-circle"></i>'}</button>
                <button class="notification-delete" data-id="${notification.id}"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Event listeners
        const markReadBtn = item.querySelector('.notification-mark-read');
        if (markReadBtn) {
            markReadBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                toggleReadStatus(id);
            });
        }
        
        const deleteBtn = item.querySelector('.notification-delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                deleteNotification(id);
            });
        }
        
        // Clicar na notificação marca como lida
        item.addEventListener('click', function() {
            const id = this.querySelector('[data-id]').getAttribute('data-id');
            if (!notification.read) {
                markAsRead(id);
            }
            
            // Se tiver link, redirecionar
            if (notification.link) {
                window.location.href = notification.link;
            }
        });
        
        return item;
    }
    
    /**
     * Marcar notificação como lida/não lida
     */
    function toggleReadStatus(notificationId) {
        if (!currentUser) return;
        
        const notification = notifications.find(n => n.id === notificationId);
        if (!notification) return;
        
        const notificationRef = database.ref(`notifications/${currentUser.uid}/${notificationId}`);
        notificationRef.update({
            read: !notification.read
        });
    }
    
    /**
     * Marcar notificação específica como lida
     */
    function markAsRead(notificationId) {
        if (!currentUser) return;
        
        const notificationRef = database.ref(`notifications/${currentUser.uid}/${notificationId}`);
        notificationRef.update({
            read: true
        });
    }
    
    /**
     * Marcar todas as notificações como lidas
     */
    function markAllAsRead() {
        if (!currentUser || notifications.length === 0) return;
        
        const updates = {};
        notifications.forEach(notification => {
            if (!notification.read) {
                updates[`notifications/${currentUser.uid}/${notification.id}/read`] = true;
            }
        });
        
        if (Object.keys(updates).length > 0) {
            database.ref().update(updates);
        }
    }
    
    /**
     * Excluir uma notificação
     */
    function deleteNotification(notificationId) {
        if (!currentUser) return;
        
        database.ref(`notifications/${currentUser.uid}/${notificationId}`).remove();
    }
    
    /**
     * Limpar todas as notificações
     */
    function clearAllNotifications() {
        if (!currentUser) return;
        
        database.ref(`notifications/${currentUser.uid}`).remove();
    }
    
    // Expor funções globalmente
    window.sendNotification = sendNotification;
    window.markAllNotificationsAsRead = markAllAsRead;
    window.clearAllNotifications = clearAllNotifications;
});

/**
 * Enviar nova notificação para um usuário
 * @param {string} userId - ID do usuário que receberá a notificação
 * @param {string} title - Título da notificação
 * @param {string} message - Mensagem da notificação
 * @param {string} type - Tipo da notificação: info, success, alert, login, update
 * @param {string} link - Link opcional para redirecionar ao clicar
 * @returns {Promise} - Promise com resultado da operação
 */
function sendNotification(userId, title, message, type = 'info', link = null) {
    if (!userId) {
        return Promise.reject(new Error('ID de usuário é necessário'));
    }
    
    const database = firebase.database();
    const notificationsRef = database.ref(`notifications/${userId}`);
    
    // Nova notificação
    const notification = {
        title: title,
        message: message,
        type: type,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        read: false
    };
    
    // Se tiver link, adicionar
    if (link) {
        notification.link = link;
    }
    
    // Push para o database
    return notificationsRef.push(notification);
}

/**
 * Enviar notificação de login para um usuário
 * @param {string} userId - ID do usuário
 * @param {string} deviceInfo - Informações sobre o dispositivo
 * @returns {Promise}
 */
function sendLoginNotification(userId, deviceInfo) {
    const title = 'Novo acesso detectado';
    const message = `Novo login na sua conta foi detectado em: ${deviceInfo}`;
    return sendNotification(userId, title, message, 'login');
}

/**
 * Enviar notificação de atualização do sistema
 * @param {string} userId - ID do usuário 
 * @param {string} updateInfo - Informações sobre a atualização
 * @returns {Promise}
 */
function sendUpdateNotification(userId, updateInfo) {
    const title = 'Nova atualização disponível';
    const message = `${updateInfo}`;
    return sendNotification(userId, title, message, 'update');
}

// Criar elemento de notificações na interface se não existir
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se os elementos já existem
    if (!document.getElementById('notification-bell')) {
        // Criar ícone de sino de notificações
        const userControls = document.querySelector('.user-controls');
        
        if (userControls) {
            // Elemento de notificações
            const notifElement = document.createElement('div');
            notifElement.className = 'notification-control';
            notifElement.innerHTML = `
                <a href="#" id="notification-bell" class="notification-bell">
                    <i class="fas fa-bell"></i>
                    <span id="notification-counter" class="notification-counter"></span>
                </a>
                <div id="notification-panel" class="notification-panel">
                    <div class="notification-header">
                        <h3>Notificações</h3>
                        <div class="notification-actions-header">
                            <button id="mark-all-read" title="Marcar todas como lidas">
                                <i class="fas fa-check-double"></i>
                            </button>
                            <button id="clear-all-notifications" title="Limpar todas">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <ul id="notification-list" class="notification-list">
                        <li class="notification-item empty">
                            <p>Nenhuma notificação</p>
                        </li>
                    </ul>
                </div>
            `;
            
            // Inserir antes do elemento de usuário
            const userControl = userControls.querySelector('.user-control');
            if (userControl) {
                userControls.insertBefore(notifElement, userControl);
                
                // Configurar eventos dos botões
                const markAllReadBtn = document.getElementById('mark-all-read');
                const clearAllBtn = document.getElementById('clear-all-notifications');
                
                if (markAllReadBtn) {
                    markAllReadBtn.addEventListener('click', function() {
                        markAllNotificationsAsRead();
                    });
                }
                
                if (clearAllBtn) {
                    clearAllBtn.addEventListener('click', function() {
                        if (confirm('Tem certeza que deseja limpar todas as notificações?')) {
                            clearAllNotifications();
                        }
                    });
                }
            }
        }
    }
});
