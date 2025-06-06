/**
 * Moz Doctor Dose - Sistema de Estatísticas em Tempo Real
 * Este módulo utiliza Firebase Realtime Database para rastrear usuários online
 * e outras métricas importantes para o administrador do site.
 */

// Configuração do Firebase
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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
firebase.analytics();

// Inicialização do sistema de estatísticas
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const usuariosOnlineEl = document.getElementById('usuarios-online');
  const visitasHojeEl = document.getElementById('visitas-hoje');
  const visitasSemanaEl = document.getElementById('visitas-semana');
  const visitasTotalEl = document.getElementById('visitas-total');
  const tempoPermanenciaEl = document.getElementById('tempo-permanencia');
  const paginasVistaEl = document.getElementById('paginas-vistas');
  const ultimaEntradaEl = document.getElementById('ultima-entrada');
  const conversaoEl = document.getElementById('taxa-conversao');
  const deviceTypeEl = document.getElementById('device-type');
  
  const adminPanelEl = document.getElementById('admin-panel-btn');
  const dashboardEl = document.getElementById('stats-dashboard');
  
  // Verificar se os elementos existem (para evitar erros)
  if (!usuariosOnlineEl) return;
  
  // Referências para os nós de estatísticas no Firebase
  const refUsuariosOnline = db.ref('stats/usuariosOnline');
  const refVisitas = db.ref('stats/visitas');
  const refDispositivos = db.ref('stats/dispositivos');
  const refEngajamento = db.ref('stats/engajamento');
  
  // Dados iniciais para estatísticas
  let statsData = {
    usuariosOnline: 0,
    visitasHoje: 0,
    visitasSemana: 0,
    visitasTotal: 0,
    tempoPermanencia: "0:00",
    paginasVistas: 0,
    ultimaEntrada: new Date().toLocaleTimeString(),
    taxaConversao: "0%",
    deviceStats: {
      mobile: 0,
      desktop: 0,
      tablet: 0
    }
  };
  
  // Função para atualizar as estatísticas na UI
  function atualizarEstatisticas() {    
    if(usuariosOnlineEl) usuariosOnlineEl.textContent = statsData.usuariosOnline;
    if(visitasHojeEl) visitasHojeEl.textContent = statsData.visitasHoje;
    if(visitasSemanaEl) visitasSemanaEl.textContent = statsData.visitasSemana;
    if(visitasTotalEl) visitasTotalEl.textContent = statsData.visitasTotal;
    if(tempoPermanenciaEl) tempoPermanenciaEl.textContent = statsData.tempoPermanencia;
    if(paginasVistaEl) paginasVistaEl.textContent = statsData.paginasVistas;
    if(ultimaEntradaEl) ultimaEntradaEl.textContent = statsData.ultimaEntrada;
    if(conversaoEl) conversaoEl.textContent = statsData.taxaConversao;
    
    // Atualizar o gráfico de dispositivos
    if(deviceTypeEl) {
      deviceTypeEl.innerHTML = `
        <div class="device-stat">
          <span>Mobile:</span> <span class="device-value">${statsData.deviceStats.mobile}%</span>
          <div class="progress-bar">
            <div class="progress" style="width: ${statsData.deviceStats.mobile}%"></div>
          </div>
        </div>
        <div class="device-stat">
          <span>Desktop:</span> <span class="device-value">${statsData.deviceStats.desktop}%</span>
          <div class="progress-bar">
            <div class="progress" style="width: ${statsData.deviceStats.desktop}%"></div>
          </div>
        </div>
        <div class="device-stat">
          <span>Tablet:</span> <span class="device-value">${statsData.deviceStats.tablet}%</span>
          <div class="progress-bar">
            <div class="progress" style="width: ${statsData.deviceStats.tablet}%"></div>
          </div>
        </div>
      `;
    }
    
    // Atualizar gráficos se existirem
    if (window.statsCharts) {
      window.statsCharts.usuariosChart.data.datasets[0].data.push(statsData.usuariosOnline);
      window.statsCharts.usuariosChart.data.datasets[0].data.shift();
      window.statsCharts.usuariosChart.update();
      
      window.statsCharts.visitasChart.data.datasets[0].data = [
        statsData.visitasHoje, 
        statsData.visitasSemana/7, 
        statsData.visitasTotal/30
      ];
      window.statsCharts.visitasChart.update();
    }
  }
  
  // Inicializar gráficos para as estatísticas
  function inicializarGraficos() {
    if (!window.Chart || !document.getElementById('usuarios-chart') || !document.getElementById('visitas-chart')) return;
    
    const usuariosCtx = document.getElementById('usuarios-chart').getContext('2d');
    const visitasCtx = document.getElementById('visitas-chart').getContext('2d');
    
    // Dados iniciais para o gráfico de usuários online (últimos 10 minutos)
    const usuariosData = Array(10).fill(0);
    const labels = Array(10).fill(0).map((_, i) => `-${10-i} min`);
    labels[labels.length-1] = 'agora';
    
    // Configuração do gráfico de usuários
    const usuariosChart = new Chart(usuariosCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Usuários Online',
          data: usuariosData,
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 30
          }
        }
      }
    });
    
    // Configuração do gráfico de visitas
    const visitasChart = new Chart(visitasCtx, {
      type: 'bar',
      data: {
        labels: ['Hoje', 'Média Diária (Semana)', 'Média Diária (Mês)'],
        datasets: [{
          label: 'Visitas',
          data: [mockStats.visitasHoje, mockStats.visitasSemana/7, mockStats.visitasTotal/30],
          backgroundColor: [
            'rgba(37, 99, 235, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
    // Salvar referências para atualizações
    window.statsCharts = {
      usuariosChart,
      visitasChart
    };
  }
  
  // Alternar visibilidade do painel de estatísticas detalhadas
  if (adminPanelEl) {
    adminPanelEl.addEventListener('click', function(e) {
      e.preventDefault();
      if (dashboardEl) {
        dashboardEl.classList.toggle('active');
        
        // Inicializar gráficos apenas quando o painel for exibido pela primeira vez
        if (dashboardEl.classList.contains('active') && !window.statsCharts) {
          setTimeout(inicializarGraficos, 100);
        }
      }
    });
  }
  
  // Atualizar estatísticas iniciais
  atualizarEstatisticas();
  
  // Atualizar estatísticas a cada 30 segundos
  window.setInterval(atualizarEstatisticas, 30000);
  
  // Registrar a sessão do usuário e rastrear presença online
  function registrarSessao() {
    // Gerar um ID de sessão único
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    localStorage.setItem('sessionId', sessionId);
    
    // Referência à presença desse usuário específico
    const usuarioPresencaRef = db.ref(`usuariosOnline/${sessionId}`);
    
    // Registrar quando o usuário estiver online
    usuarioPresencaRef.set({
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      pagina: window.location.pathname
    });
    
    // Registrar evento de fim de sessão
    window.addEventListener('beforeunload', function() {
      // Remover do registro de usuários online
      usuarioPresencaRef.remove();
    });
    
    // Registrar visita
    const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    db.ref(`visitas/${hoje}`).transaction(function(visitas) {
      return (visitas || 0) + 1;
    });
    
    // Registrar tipo de dispositivo
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    const deviceType = isMobile ? (isTablet ? 'tablet' : 'mobile') : 'desktop';
    
    db.ref(`dispositivos/${deviceType}`).transaction(function(count) {
      return (count || 0) + 1;
    });
  }
  
  // Escutar mudanças nas estatísticas
  refUsuariosOnline.on('value', function(snapshot) {
    const usuariosCount = snapshot.numChildren() || 0;
    statsData.usuariosOnline = usuariosCount;
    if (usuariosOnlineEl) usuariosOnlineEl.textContent = usuariosCount;
  });
  
  // Obter estatísticas de visitas
  refVisitas.once('value', function(snapshot) {
    const visitas = snapshot.val() || {};
    const hoje = new Date().toISOString().split('T')[0];
    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);
    
    // Calcular visitas de hoje
    statsData.visitasHoje = visitas[hoje] || 0;
    
    // Calcular visitas da semana
    let visitasSemana = 0;
    for (let i = 0; i < 7; i++) {
      const data = new Date();
      data.setDate(data.getDate() - i);
      const dataStr = data.toISOString().split('T')[0];
      visitasSemana += visitas[dataStr] || 0;
    }
    statsData.visitasSemana = visitasSemana;
    
    // Total de visitas
    let total = 0;
    Object.values(visitas).forEach(count => { total += count; });
    statsData.visitasTotal = total;
    
    // Atualizar UI
    atualizarEstatisticas();
  });
  
  // Obter estatísticas de dispositivos
  refDispositivos.once('value', function(snapshot) {
    const dispositivos = snapshot.val() || { mobile: 0, desktop: 0, tablet: 0 };
    const total = dispositivos.mobile + dispositivos.desktop + dispositivos.tablet;
    
    if (total > 0) {
      statsData.deviceStats.mobile = Math.round((dispositivos.mobile / total) * 100);
      statsData.deviceStats.desktop = Math.round((dispositivos.desktop / total) * 100);
      statsData.deviceStats.tablet = Math.round((dispositivos.tablet / total) * 100);
    }
    
    // Atualizar UI
    atualizarEstatisticas();
  });
  
  // Obter métricas de engajamento
  refEngajamento.once('value', function(snapshot) {
    const engajamento = snapshot.val() || {};
    statsData.tempoPermanencia = engajamento.tempoPermanencia || "0:00";
    statsData.paginasVistas = engajamento.paginasVistas || 0;
    statsData.taxaConversao = engajamento.taxaConversao || "0%";
    
    // Atualizar UI
    atualizarEstatisticas();
  });
  
  // Verificar se já existe uma sessão
  if (!localStorage.getItem('sessionId')) {
    registrarSessao();
  }
});
