/**
 * Script de inicialização para a seção de laboratório melhorada
 * Este script carrega os módulos necessários e atualiza a interface do usuário
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando módulos avançados de laboratório...');
    
    // Atualizar a seção de laboratório com os novos recursos
    atualizarSecaoLaboratorio();
    
    // Verificar e adicionar a aba de exames específicos de Moçambique
    adicionarAbaExamesEspecificos();
});

/**
 * Atualiza a interface da seção de laboratório
 */
function atualizarSecaoLaboratorio() {
    // Adicionar CSS personalizado se ainda não estiver presente
    if (!document.querySelector('link[href="css/laboratorio.css"]')) {
        const linkCSS = document.createElement('link');
        linkCSS.rel = 'stylesheet';
        linkCSS.href = 'css/laboratorio.css';
        document.head.appendChild(linkCSS);
    }
    
    // Melhorar a interface de hemograma existente
    melhorarInterfaceHemograma();
    
    // Melhorar a interface de bioquímica existente
    melhorarInterfaceBioquimica();
}

/**
 * Melhora a interface de análise de hemograma
 */
function melhorarInterfaceHemograma() {
    const hemogramaDiv = document.querySelector('#hemograma .result-content');
    if (!hemogramaDiv) return;
    
    // Adicionar campo para indexação de eritrócitos
    const formRow = document.querySelector('#hemograma .form-row');
    if (formRow) {
        const novosIndices = `
            <div class="form-group">
                <h4>Índices Eritrocitários</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="vcm">VCM (fL):</label>
                        <input type="number" id="vcm" step="0.1" min="50" max="150">
                    </div>
                    <div class="form-group">
                        <label for="hcm">HCM (pg):</label>
                        <input type="number" id="hcm" step="0.1" min="15" max="50">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="chcm">CHCM (g/dL):</label>
                        <input type="number" id="chcm" step="0.1" min="20" max="50">
                    </div>
                    <div class="form-group">
                        <label for="rdw">RDW (%):</label>
                        <input type="number" id="rdw" step="0.1" min="10" max="30">
                    </div>
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = novosIndices;
        formRow.parentNode.insertBefore(tempDiv, formRow.nextSibling);
    }
    
    // Adicionar contextualização para Moçambique
    const alertasHemograma = document.getElementById('alertas-hemograma');
    if (alertasHemograma) {
        const contextoDiv = document.createElement('div');
        contextoDiv.className = 'contexto-mocambique';
        contextoDiv.innerHTML = `
            <h4>Contexto para Moçambique</h4>
            <p>A anemia é altamente prevalente em Moçambique, afetando cerca de 69% das crianças menores de 5 anos.</p>
            <p>Principais causas: Deficiência de ferro, malária, parasitoses intestinais e hemoglobinopatias.</p>
            <p>Considere sempre o rastreio de malária em casos de anemia inexplicada.</p>
        `;
        
        alertasHemograma.parentNode.insertBefore(contextoDiv, alertasHemograma);
    }
    
    // Adicionar botão para imprimir resultado
    const buttonGroup = document.querySelector('#hemograma .button-group');
    if (buttonGroup) {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn secondary';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Imprimir';
        printBtn.onclick = function() { 
            window.print(); 
        };
        buttonGroup.appendChild(printBtn);
    }
}

/**
 * Melhora a interface de análise bioquímica
 */
function melhorarInterfaceBioquimica() {
    const bioquimicaDiv = document.querySelector('#bioquimica .result-content');
    if (!bioquimicaDiv) return;
    
    // Adicionar campos para exames hepáticos adicionais
    const formRow = document.querySelector('#bioquimica .form-row:last-child');
    if (formRow) {
        const novosExames = `
            <div class="form-row">
                <div class="form-group">
                    <label for="bio-fosfatase">Fosfatase Alcalina (U/L):</label>
                    <input type="number" id="bio-fosfatase" min="30" max="1000">
                </div>
                <div class="form-group">
                    <label for="bio-ggt">GGT (U/L):</label>
                    <input type="number" id="bio-ggt" min="5" max="1000">
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = novosExames;
        formRow.parentNode.insertBefore(tempDiv, formRow.nextSibling);
    }
    
    // Adicionar campos para perfil lipídico
    if (formRow) {
        const perfilLipidico = `
            <div class="form-group">
                <h4>Perfil Lipídico</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bio-colesterol">Colesterol Total (mg/dL):</label>
                        <input type="number" id="bio-colesterol" min="50" max="500">
                    </div>
                    <div class="form-group">
                        <label for="bio-hdl">HDL (mg/dL):</label>
                        <input type="number" id="bio-hdl" min="5" max="120">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bio-ldl">LDL (mg/dL):</label>
                        <input type="number" id="bio-ldl" min="20" max="300">
                    </div>
                    <div class="form-group">
                        <label for="bio-triglicerides">Triglicérides (mg/dL):</label>
                        <input type="number" id="bio-triglicerides" min="20" max="1000">
                    </div>
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = perfilLipidico;
        formRow.parentNode.insertBefore(tempDiv, formRow.nextSibling);
    }
    
    // Adicionar campos para função pancreática
    if (formRow) {
        const funcaoPancreatica = `
            <div class="form-group">
                <h4>Função Pancreática</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bio-amilase">Amilase (U/L):</label>
                        <input type="number" id="bio-amilase" min="10" max="1000">
                    </div>
                    <div class="form-group">
                        <label for="bio-lipase">Lipase (U/L):</label>
                        <input type="number" id="bio-lipase" min="10" max="1000">
                    </div>
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = funcaoPancreatica;
        formRow.parentNode.insertBefore(tempDiv, formRow.nextSibling);
    }
    
    // Adicionar mais eletrólitos importantes
    if (formRow) {
        const maisEletrolitos = `
            <div class="form-group">
                <h4>Outros Eletrólitos</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bio-magnesio">Magnésio (mg/dL):</label>
                        <input type="number" id="bio-magnesio" step="0.1" min="0.5" max="5">
                    </div>
                    <div class="form-group">
                        <label for="bio-fosforo">Fósforo (mg/dL):</label>
                        <input type="number" id="bio-fosforo" step="0.1" min="1" max="10">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bio-cloro">Cloro (mEq/L):</label>
                        <input type="number" id="bio-cloro" min="70" max="130">
                    </div>
                    <div class="form-group">
                        <label for="bio-bicarbonato">Bicarbonato (mEq/L):</label>
                        <input type="number" id="bio-bicarbonato" min="10" max="50">
                    </div>
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = maisEletrolitos;
        formRow.parentNode.insertBefore(tempDiv, formRow.nextSibling);
    }
    
    // Adicionar campos para função renal estimada e cálculos adicionais
    const buttonGroup = document.querySelector('#bioquimica .button-group');
    if (buttonGroup) {
        const calculosAvancados = `
            <div class="form-group">
                <h4>Cálculos Avançados</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bio-calcular-tfg">
                            <input type="checkbox" id="bio-calcular-tfg"> Calcular TFG estimada
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="bio-calcular-risco-cv">
                            <input type="checkbox" id="bio-calcular-risco-cv"> Risco cardiovascular
                        </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bio-calcular-anion-gap">
                            <input type="checkbox" id="bio-calcular-anion-gap"> Ânion gap
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="bio-calcular-framingham">
                            <input type="checkbox" id="bio-calcular-framingham"> Escore Framingham
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = calculosAvancados;
        buttonGroup.parentNode.insertBefore(tempDiv, buttonGroup);
    }
    
    // Adicionar botão para imprimir resultado
    if (buttonGroup) {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn secondary';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Imprimir';
        printBtn.onclick = function() { 
            window.print(); 
        };
        buttonGroup.appendChild(printBtn);
    }
}

/**
 * Adiciona a aba de exames específicos para Moçambique
 */
function adicionarAbaExamesEspecificos() {
    const labSection = document.getElementById('laboratorio');
    const tabs = labSection.querySelector('.tabs');
    
    // Adicionar nova aba aos botões existentes
    if (tabs) {
        // Verificar se a aba já existe
        if (!document.querySelector('button[data-tab="exames-especificos"]')) {
            const novoTab = document.createElement('button');
            novoTab.className = 'tab-button';
            novoTab.setAttribute('data-tab', 'exames-especificos');
            novoTab.textContent = 'Exames Específicos';
            tabs.appendChild(novoTab);
            
            // Adicionar funcionalidade do botão
            novoTab.addEventListener('click', function() {
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById('exames-especificos').classList.add('active');
            });
        }
    }
    
    // Criar conteúdo da nova aba se não existir
    if (!document.getElementById('exames-especificos')) {
        const examesEspecificosHTML = `
            <div id="exames-especificos" class="tab-content">
                <div class="exames-tabs">
                    <div class="exame-tab active" data-exame-tab="malaria">Malária</div>
                    <div class="exame-tab" data-exame-tab="hiv">HIV</div>
                    <div class="exame-tab" data-exame-tab="tb">Tuberculose</div>
                </div>
                
                <!-- Malária -->
                <div id="exame-malaria" class="exame-content active">
                    <div class="calculator-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="malaria-teste-rapido">Teste Rápido:</label>
                                <select id="malaria-teste-rapido">
                                    <option value="">Selecione...</option>
                                    <option value="positivo">Positivo</option>
                                    <option value="negativo">Negativo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="malaria-parasitemia">Parasitemia (%):</label>
                                <input type="number" id="malaria-parasitemia" step="0.1" min="0.1" max="20">
                            </div>
                        </div>
                        
                        <h4>Sinais de Gravidade</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="malaria-consciencia">Nível de Consciência:</label>
                                <select id="malaria-consciencia">
                                    <option value="normal">Normal</option>
                                    <option value="alterada">Alterado</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <input type="checkbox" id="malaria-convulsoes">
                                <label for="malaria-convulsoes">Convulsões</label>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" id="malaria-sangramento">
                                <label for="malaria-sangramento">Sangramento anormal</label>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" id="malaria-ictericia">
                                <label for="malaria-ictericia">Icterícia</label>
                            </div>
                        </div>
                        
                        <div class="button-group">
                            <button id="analisar-malaria" class="btn primary"><i class="fas fa-search"></i> Analisar</button>
                            <button id="limpar-malaria" class="btn secondary"><i class="fas fa-broom"></i> Limpar</button>
                        </div>
                        
                        <div id="resultado-malaria" class="result-container hidden">
                            <div class="result-header">
                                <h3>Resultado da Análise de Malária</h3>
                            </div>
                            <div class="result-content">
                                <div id="analise-malaria"></div>
                                <div id="alertas-malaria"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- HIV -->
                <div id="exame-hiv" class="exame-content">
                    <div class="calculator-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="hiv-teste">Teste de HIV:</label>
                                <select id="hiv-teste">
                                    <option value="">Selecione...</option>
                                    <option value="positivo">Positivo</option>
                                    <option value="negativo">Negativo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="hiv-cd4">CD4 (células/mm³):</label>
                                <input type="number" id="hiv-cd4" min="1" max="2000">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="hiv-carga-viral">Carga Viral (cópias/mL):</label>
                                <input type="number" id="hiv-carga-viral" min="20" max="10000000">
                            </div>
                        </div>
                        
                        <div class="button-group">
                            <button id="analisar-hiv" class="btn primary"><i class="fas fa-search"></i> Analisar</button>
                            <button id="limpar-hiv" class="btn secondary"><i class="fas fa-broom"></i> Limpar</button>
                        </div>
                        
                        <div id="resultado-hiv" class="result-container hidden">
                            <div class="result-header">
                                <h3>Resultado da Análise de HIV</h3>
                            </div>
                            <div class="result-content">
                                <div id="analise-hiv"></div>
                                <div id="alertas-hiv"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Tuberculose -->
                <div id="exame-tb" class="exame-content">
                    <div class="calculator-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="tb-baciloscopia">Baciloscopia:</label>
                                <select id="tb-baciloscopia">
                                    <option value="">Selecione...</option>
                                    <option value="Negativo">Negativo</option>
                                    <option value="1+">1+ (1-9 BAAR/100 campos)</option>
                                    <option value="2+">2+ (1-9 BAAR/10 campos)</option>
                                    <option value="3+">3+ (≥ 10 BAAR/campo)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="tb-genexpert">GeneXpert MTB/RIF:</label>
                                <select id="tb-genexpert">
                                    <option value="">Selecione...</option>
                                    <option value="detectado-sensivel">MTB detectado, RIF sensível</option>
                                    <option value="detectado-resistente">MTB detectado, RIF resistente</option>
                                    <option value="nao-detectado">MTB não detectado</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="button-group">
                            <button id="analisar-tb" class="btn primary"><i class="fas fa-search"></i> Analisar</button>
                            <button id="limpar-tb" class="btn secondary"><i class="fas fa-broom"></i> Limpar</button>
                        </div>
                        
                        <div id="resultado-tb" class="result-container hidden">
                            <div class="result-header">
                                <h3>Resultado da Análise de Tuberculose</h3>
                            </div>
                            <div class="result-content">
                                <div id="analise-tb"></div>
                                <div id="alertas-tb"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar após as abas existentes
        const bioquimicaTab = document.getElementById('bioquimica');
        if (bioquimicaTab) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = examesEspecificosHTML;
            bioquimicaTab.parentNode.appendChild(tempDiv.firstElementChild);
            
            // Configurar eventos de navegação entre abas de exames específicos
            document.querySelectorAll('.exame-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remover classe ativa de todas as abas e conteúdos
                    document.querySelectorAll('.exame-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.exame-content').forEach(c => c.classList.remove('active'));
                    
                    // Adicionar classe ativa à aba clicada
                    this.classList.add('active');
                    
                    // Mostrar conteúdo correspondente
                    const exameId = this.getAttribute('data-exame-tab');
                    document.getElementById(`exame-${exameId}`).classList.add('active');
                });
            });
        }
    }
}
