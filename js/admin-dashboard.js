/**
 * Moz Doctor Dose - Admin Dashboard
 * Sistema de painéis administrativos e visualização de dados
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referências ao Firebase
    const auth = firebase.auth();
    const db = firebase.database();
    
    // Elementos DOM
    const adminSection = document.getElementById('admin-section');
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminContents = document.querySelectorAll('.admin-content');
    
    // Verificar se o usuário é administrador e mostrar seção de admin
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // Verificar se o usuário é administrador
            checkAdminStatus(user.uid);
        } else if (adminSection) {
            // Esconder seção de admin se o usuário não estiver logado
            adminSection.style.display = 'none';
        }
    });
    
    // Verificar status de administrador
    function checkAdminStatus(uid) {
        db.ref('admins/' + uid).once('value')
            .then(snapshot => {
                if (snapshot.exists() && adminSection) {
                    // Usuário é administrador, mostrar painel
                    adminSection.style.display = 'block';
                    initAdminDashboard();
                } else if (adminSection) {
                    // Não é administrador
                    adminSection.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Erro ao verificar status de administrador:', error);
            });
    }
    
    // Inicializar o dashboard
    function initAdminDashboard() {
        setupTabNavigation();
        loadDashboardData();
        initCharts();
        setupUserManagement();
    }
    
    // Configurar navegação por abas
    function setupTabNavigation() {
        if (!adminTabs || !adminContents) return;
        
        adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                
                // Remover classe ativa de todas as abas e conteúdos
                adminTabs.forEach(t => t.classList.remove('active'));
                adminContents.forEach(c => c.classList.remove('active'));
                
                // Adicionar classe ativa à aba e conteúdo clicados
                tab.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // Carregar dados do dashboard
    function loadDashboardData() {
        // Carregar estatísticas de usuários
        db.ref('statistics/users').once('value')
            .then(snapshot => {
                const data = snapshot.val() || {};
                updateUserStats(data);
            });
        
        // Carregar estatísticas de visitas
        db.ref('visits').once('value')
            .then(snapshot => {
                const data = snapshot.val() || {};
                updateVisitStats(data);
            });
            
        // Carregar estatísticas de dispositivos
        db.ref('devices').once('value')
            .then(snapshot => {
                const data = snapshot.val() || {};
                updateDeviceStats(data);
            });
            
        // Carregar lista de usuários
        loadUsersList();
    }
    
    // Atualizar estatísticas de usuários
    function updateUserStats(data) {
        const totalUsers = document.getElementById('total-users');
        const newUsers = document.getElementById('new-users');
        const activeUsers = document.getElementById('active-users');
        const averageSessionTime = document.getElementById('average-session');
        
        if (totalUsers) totalUsers.textContent = data.total || 0;
        if (newUsers) newUsers.textContent = data.new || 0;
        if (activeUsers) activeUsers.textContent = data.active || 0;
        if (averageSessionTime) averageSessionTime.textContent = formatTime(data.avgSession || 0);
    }
    
    // Atualizar estatísticas de visitas
    function updateVisitStats(data) {
        const totalVisits = document.getElementById('total-visits');
        const todayVisits = document.getElementById('today-visits');
        const weekVisits = document.getElementById('week-visits');
        const monthVisits = document.getElementById('month-visits');
        
        if (totalVisits) totalVisits.textContent = data.total || 0;
        if (todayVisits) todayVisits.textContent = data.today || 0;
        if (weekVisits) weekVisits.textContent = data.week || 0;
        if (monthVisits) monthVisits.textContent = data.month || 0;
    }
    
    // Atualizar estatísticas de dispositivos
    function updateDeviceStats(data) {
        const mobile = document.getElementById('mobile-users');
        const desktop = document.getElementById('desktop-users');
        const tablet = document.getElementById('tablet-users');
        
        if (mobile) mobile.textContent = data.mobile || 0;
        if (desktop) desktop.textContent = data.desktop || 0;
        if (tablet) tablet.textContent = data.tablet || 0;
    }
    
    // Inicializar gráficos
    function initCharts() {
        initUserActivityChart();
        initDeviceDistributionChart();
        initPageViewsChart();
    }
    
    // Gráfico de atividade de usuários
    function initUserActivityChart() {
        const ctx = document.getElementById('user-activity-chart');
        if (!ctx) return;
        
        // Dados simulados - substituir por dados reais do Firebase
        const labels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Usuários Online',
                data: [5, 3, 2, 8, 15, 20, 18, 10],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                fill: true,
                tension: 0.4
            }]
        };
        
        const userActivityChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
    }
    
    // Gráfico de distribuição de dispositivos
    function initDeviceDistributionChart() {
        const ctx = document.getElementById('device-distribution-chart');
        if (!ctx) return;
        
        // Dados simulados - substituir por dados reais do Firebase
        const data = {
            labels: ['Mobile', 'Desktop', 'Tablet'],
            datasets: [{
                data: [65, 30, 5],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12'
                ],
                borderWidth: 0
            }]
        };
        
        const deviceDistributionChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Gráfico de visualizações de página
    function initPageViewsChart() {
        const ctx = document.getElementById('page-views-chart');
        if (!ctx) return;
        
        // Dados simulados - substituir por dados reais do Firebase
        const data = {
            labels: ['Doses', 'Laboratório', 'Eletrólitos', 'Gasometria', 'InteraMed', 'Ferramentas', 'Protocolos'],
            datasets: [{
                label: 'Visualizações',
                data: [120, 80, 65, 50, 75, 40, 90],
                backgroundColor: 'rgba(52, 152, 219, 0.7)'
            }]
        };
        
        const pageViewsChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Configurar gerenciamento de usuários
    function setupUserManagement() {
        const userTable = document.getElementById('users-table-body');
        if (!userTable) return;
        
        // Carregar lista de usuários
        loadUsersList();
        
        // Configurar botão de adicionar usuário
        const addUserBtn = document.getElementById('add-user-btn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => {
                // Implementar lógica para adicionar usuário
                console.log('Adicionar usuário');
            });
        }
    }
    
    // Carregar lista de usuários
    function loadUsersList() {
        const userTable = document.getElementById('users-table-body');
        if (!userTable) return;
        
        // Limpar tabela existente
        userTable.innerHTML = '';
        
        // Buscar usuários do Firebase Authentication (via Firebase Functions - necessário implementar)
        // Como exemplo, usaremos dados simulados
        const sampleUsers = [
            { uid: '1', email: 'admin@example.com', displayName: 'Admin User', lastLogin: '2025-06-05', status: 'active', isAdmin: true },
            { uid: '2', email: 'medico@example.com', displayName: 'Médico Exemplo', lastLogin: '2025-06-04', status: 'active', isAdmin: false },
            { uid: '3', email: 'enfermeiro@example.com', displayName: 'Enfermeiro Exemplo', lastLogin: '2025-05-30', status: 'inactive', isAdmin: false },
            { uid: '4', email: 'estudante@example.com', displayName: 'Estudante Exemplo', lastLogin: '2025-06-03', status: 'pending', isAdmin: false },
        ];
        
        // Renderizar usuários na tabela
        sampleUsers.forEach(user => {
            const row = document.createElement('tr');
            
            // Inicial do avatar
            const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
            
            // Classe de status
            const statusClass = user.status === 'active' ? 'status-active' : 
                               user.status === 'inactive' ? 'status-inactive' : 'status-pending';
            
            // Status label
            const statusLabel = user.status === 'active' ? 'Ativo' : 
                              user.status === 'inactive' ? 'Inativo' : 'Pendente';
                              
            // Role label
            const roleLabel = user.isAdmin ? 'Administrador' : 'Usuário';
            
            row.innerHTML = `
                <td>
                    <div class="user-row">
                        <div class="user-avatar-small">${initial}</div>
                        <div>
                            <div>${user.displayName || 'Usuário'}</div>
                            <div class="text-secondary">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>${roleLabel}</td>
                <td>${user.lastLogin || 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
                <td>
                    <button class="action-button edit-btn" data-uid="${user.uid}">Editar</button>
                    <button class="action-button delete-btn" data-uid="${user.uid}">Remover</button>
                </td>
            `;
            
            userTable.appendChild(row);
        });
        
        // Configurar event listeners para os botões de ação
        setupActionButtons();
    }
    
    // Configurar botões de ação na tabela
    function setupActionButtons() {
        // Botões de editar
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const uid = e.target.getAttribute('data-uid');
                console.log('Editar usuário:', uid);
                // Implementar lógica de edição
            });
        });
        
        // Botões de remover
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const uid = e.target.getAttribute('data-uid');
                console.log('Remover usuário:', uid);
                // Implementar lógica de remoção
            });
        });
    }
    
    // Utilitário para formatar tempo
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }
});
