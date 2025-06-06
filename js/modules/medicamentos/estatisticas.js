// Script para manipular a atualização das estatísticas de medicamentos

document.addEventListener('DOMContentLoaded', function() {
    // Aguardar que o documento esteja completamente carregado
    setTimeout(() => {
        // Configurar botão de atualização das estatísticas
        const btnAtualizarEstatisticas = document.getElementById('atualizar-estatisticas');
        if (btnAtualizarEstatisticas) {
            btnAtualizarEstatisticas.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Efeito visual de atualização
                this.innerHTML = '<i class="fas fa-sync fa-spin"></i> Atualizando...';
                
                // Chamar a função de contagem de medicamentos
                setTimeout(() => {
                    if (typeof contarMedicamentos === 'function') {
                        contarMedicamentos();
                        
                        // Exibir notificação de sucesso
                        if (typeof showAlert === 'function') {
                            showAlert('Estatísticas de medicamentos atualizadas com sucesso!', 'success');
                        }
                    } else {
                        console.error('Função contarMedicamentos não encontrada');
                        if (typeof showAlert === 'function') {
                            showAlert('Erro ao atualizar estatísticas. Verifique o console.', 'danger');
                        }
                    }
                    
                    // Restaurar o texto do botão
                    this.innerHTML = '<i class="fas fa-sync"></i> Atualizar estatísticas';
                }, 500);
            });
        }
        
        // Exibir informações adicionais sobre a contagem
        document.getElementById('estatisticas-detalhadas').innerHTML = `
            <p class="stat-info">As estatísticas incluem todos os medicamentos cadastrados, 
            incluindo os medicamentos adicionais como Ampicilina e Ceftriaxona.</p>
        `;
    }, 1500);
});
