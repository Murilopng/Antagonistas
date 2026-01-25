/* --- BANCO DE DADOS: ANTAGONISTAS RPG --- */

// 1. ARSENAL COMPLETO
const DB_WEAPONS = [
    // INICIANTE
    { name: "Faca", dmg: "1d4", crit: "19/x2", range: "Curto", weight: "Leve", type: "Corte", price: 20, rank: "Iniciante" },
    { name: "Punhal", dmg: "1d4", crit: "20/x3", range: "-", weight: "Leve", type: "Perfuração", price: 25, rank: "Iniciante", notes: "Fura coletes (-3 def)" },
    { name: "Cajado", dmg: "1d6", crit: "20/x2", range: "-", weight: "Padrão", type: "Impacto", price: 30, rank: "Iniciante", notes: "+3 Defesa" },
    { name: "Lança", dmg: "1d6", crit: "20/x2", range: "Curto", weight: "Padrão", type: "Perfuração", price: 40, rank: "Iniciante", notes: "+2 Pontaria" },
    { name: "Bastão", dmg: "1d6/1d8", crit: "20/x2", range: "-", weight: "Leve", type: "Impacto", price: 40, rank: "Iniciante" },
    { name: "Machadinha", dmg: "1d6", crit: "20/x3", range: "Curto", weight: "Leve", type: "Corte", price: 45, rank: "Iniciante" },
    { name: "Machete", dmg: "1d6", crit: "19/x2", range: "-", weight: "Padrão", type: "Corte", price: 45, rank: "Iniciante" },
    { name: "Martelo", dmg: "1d6", crit: "20/x2", range: "-", weight: "Leve", type: "Impacto", price: 50, rank: "Iniciante" },
    { name: "Nunchaku", dmg: "1d8", crit: "20/x2", range: "-", weight: "Leve", type: "Impacto", price: 60, rank: "Iniciante" },
    { name: "Corrente", dmg: "1d8", crit: "20/x2", range: "-", weight: "Leve", type: "Impacto", price: 70, rank: "Iniciante", notes: "Agarrar no acerto" },
    { name: "Arco", dmg: "1d6", crit: "20/x3", range: "Médio", weight: "Padrão", type: "Perfuração", price: 80, rank: "Iniciante", notes: "Silencioso" },
    { name: "Besta", dmg: "1d8", crit: "19/x2", range: "Médio", weight: "Pesada", type: "Perfuração", price: 100, rank: "Iniciante", notes: "Recarga: Movimento" },
    { name: "Soqueira", dmg: "1d4", crit: "19/x2", range: "-", weight: "Leve", type: "Impacto", price: 15, rank: "Iniciante" },

    // JUNIOR
    { name: "Florete", dmg: "1d6", crit: "18/x2", range: "-", weight: "Leve", type: "Perfuração", price: 120, rank: "Júnior" },
    { name: "Machado", dmg: "1d8", crit: "20/x3", range: "-", weight: "Padrão", type: "Corte", price: 130, rank: "Júnior", notes: "Ignora 3 Def" },
    { name: "Maça", dmg: "2d4", crit: "20/x2", range: "-", weight: "Padrão", type: "Impacto", price: 140, rank: "Júnior" },
    { name: "Espada", dmg: "1d8/1d10", crit: "19/x2", range: "-", weight: "Padrão", type: "Corte", price: 150, rank: "Júnior" },
    { name: "Marreta", dmg: "3d4", crit: "20/x2", range: "-", weight: "Pesada", type: "Impacto", price: 160, rank: "Júnior" },
    { name: "Katana", dmg: "1d10", crit: "19/x2", range: "-", weight: "Padrão", type: "Corte", price: 180, rank: "Júnior" },
    { name: "Gadanho", dmg: "2d4", crit: "20/x4", range: "-", weight: "Pesada", type: "Corte", price: 180, rank: "Júnior" },
    { name: "Arco Composto", dmg: "1d10", crit: "20/x3", range: "Médio", weight: "Padrão", type: "Perfuração", price: 180, rank: "Júnior" },
    { name: "Balestra", dmg: "1d12", crit: "19/x2", range: "Médio", weight: "Pesada", type: "Perfuração", price: 200, rank: "Júnior" },
    { name: "Acha", dmg: "1d12", crit: "20/x3", range: "-", weight: "Pesada", type: "Corte", price: 200, rank: "Júnior" },
    { name: "Montante", dmg: "2d6", crit: "19/x2", range: "-", weight: "Pesada", type: "Corte", price: 200, rank: "Júnior", notes: "Duas Mãos" },
    { name: "Pistola", dmg: "1d12", crit: "18/x2", range: "Curto", weight: "Leve", type: "Balístico", price: 200, rank: "Júnior" },
    { name: "Revólver", dmg: "2d6", crit: "19/x3", range: "Curto", weight: "Leve", type: "Balístico", price: 210, rank: "Júnior" },
    { name: "Submetralhadora", dmg: "2d6", crit: "19/x3", range: "Curto", weight: "Leve", type: "Balístico", price: 220, rank: "Júnior" },
    { name: "Fuzil de Caça", dmg: "2d8", crit: "19/x3", range: "Médio", weight: "Pesada", type: "Balístico", price: 240, rank: "Júnior" },
    { name: "Motosserra", dmg: "3d6", crit: "20/x2", range: "-", weight: "Pesada", type: "Corte", price: 250, rank: "Júnior", notes: "Barulhenta" },
    { name: "Espingarda", dmg: "4d6", crit: "20/x3", range: "Curto", weight: "Pesada", type: "Balístico", price: 280, rank: "Júnior" },

    // SENIOR
    { name: "Fuzil de Assalto", dmg: "2d10", crit: "19/x3", range: "Médio", weight: "Pesada", type: "Balístico", price: 500, rank: "Sênior" },
    { name: "Metralhadora", dmg: "2d12", crit: "19/x3", range: "Médio", weight: "Pesada", type: "Balístico", price: 650, rank: "Sênior" },

    // OPERADOR
    { name: "Fuzil de Precisão", dmg: "2d10", crit: "19/x3", range: "Longo", weight: "Pesada", type: "Balístico", price: 800, rank: "Operador", notes: "Mira: -3 Margem Ameaça" },
    { name: "Lança-Chamas", dmg: "6d6", crit: "20/x2", range: "Curto", weight: "Pesada", type: "Fogo", price: 900, rank: "Operador", notes: "Cone" },
    { name: "Bazuca", dmg: "10d8", crit: "20/x2", range: "Médio", weight: "Pesada", type: "Impacto", price: 1500, rank: "Operador", notes: "Área" }
];

// 2. ITEMS (Utilitários e Artefatos)
const DB_ITEMS = [
    // Utilitários
    { name: "Algemas de Aço", desc: "Imobiliza mãos (DT 20/30).", price: 50, type: "Utilitário" },
    { name: "Algemas Anti-Fluxo", desc: "Bloqueia poderes.", price: 500, type: "Utilitário" },
    { name: "Arpéu", desc: "Cabo de 10m. +5 Acrobacia.", price: 150, type: "Utilitário" },
    { name: "Binóculos Táticos", desc: "+5 Percepção (Visão).", price: 100, type: "Utilitário" },
    { name: "Cinto de Utilidades", desc: "Saque Livre para 3 itens.", price: 80, type: "Utilitário" },
    { name: "Corda (10m)", desc: "Resiste 300kg.", price: 20, type: "Utilitário" },
    { name: "Lanterna Tática", desc: "Cone de 9m.", price: 30, type: "Utilitário" },
    { name: "Máscara de Gás", desc: "Imune a toxinas inaláveis.", price: 120, type: "Utilitário" },
    { name: "Óculos Térmicos", desc: "Visão calor. Ignora camuflagem.", price: 400, type: "Utilitário" },
    { name: "Pé de Cabra", desc: "+5 Força/Crime para abrir. Dano 1d6.", price: 40, type: "Utilitário" },
    { name: "Peças Metálicas", desc: "Material para Tecnólogos.", price: 50, type: "Utilitário" },
    
    // Artefatos
    { name: "Moeda da Sorte", desc: "Rerolar dados (Custa 5 PC).", price: 100, type: "Artefato" },
    { name: "Soro Grimm", desc: "+300 PF temp. Risco de Morte.", price: 150, type: "Artefato" },
    { name: "Luva Reação Total", desc: "Contra-ataque como Reação (5 PC).", price: 200, type: "Artefato" },
    { name: "Bolso Infinito", desc: "+5 Espaços de Carga.", price: 500, type: "Artefato" },
    { name: "Máscara Berserk", desc: "+1 FOR/ITG, Ataque obrigatório.", price: 800, type: "Artefato" },
    { name: "Reator Arcano", desc: "Energia Infinita. Explosão se quebrar.", price: 2000, type: "Artefato" },
    { name: "Colar Ancestral", desc: "+200 PF para criar skills.", price: 3000, type: "Artefato" },
    { name: "Botas de Hércules", desc: "Dobra deslocamento (2 Esforço).", price: 0, type: "Artefato" },
    { name: "Anel Bestial", desc: "Invoca Kaiju Nível = Herói.", price: 0, type: "Artefato" },
    { name: "Joia do Tempo", desc: "Ação Extra (50% chance de custo).", price: 0, type: "Artefato" }
];

// 3. MODIFICAÇÕES DE ARMA (Melhorias e Infusões)
const DB_WEAPON_MODS = [
    // Melhorias Físicas
    { name: "Potencializador", type: "Melhoria", desc: "Aumenta dado de dano em um passo." },
    { name: "Acertadora", type: "Melhoria", desc: "+2 Acerto (+4 se mirar)." },
    { name: "Refinada", type: "Melhoria", desc: "-2 na Margem de Ameaça." },
    { name: "Híbrida", type: "Melhoria", desc: "Permite mudar Tipo de Dano." },
    { name: "Pulso Pesado", type: "Melhoria", desc: "+1 Multiplicador Crítico." },
    { name: "Calibrada", type: "Melhoria", desc: "+1 Dado de Dano (Arma fica Pesada)." },
    { name: "Silenciosa", type: "Melhoria", desc: "Não revela posição." },
    { name: "Tranquilizante", type: "Melhoria", desc: "-1 custo de Cansaço (Min 1)." },
    { name: "Flageladora", type: "Melhoria", desc: "Causa Sangramento (1d4/rodada)." },
    { name: "Térmica", type: "Melhoria", desc: "Visão calor, ignora camuflagem (Longo)." },
    { name: "Saque Rápido", type: "Melhoria", desc: "Sacar é Ação Livre." },

    // Infusões (Requer Habilidade e PF)
    { name: "Munição Predadora", type: "Infusão (Bal)", cost: "3 PF", desc: "Ignora Cobertura (+2 PC)." },
    { name: "Olho da Verdade", type: "Infusão (Bal)", cost: "4 PF", desc: "Ignora Ilusões/Clones." },
    { name: "Lâmina Voraz", type: "Infusão (Corte)", cost: "3 PF", desc: "+1d6 Dano Extra." },
    { name: "Hemofagia", type: "Infusão (Corte)", cost: "6 PF", desc: "Sangramento cumulativo." },
    { name: "Onda de Choque", type: "Infusão (Imp)", cost: "3 PF", desc: "Dano mínimo garantido se errar por pouco." },
    { name: "Quebra-Guarda", type: "Infusão (Imp)", cost: "5 PF", desc: "Chance de desarmar defesa." },
    { name: "Foco Cirúrgico", type: "Infusão (Perf)", cost: "3 PF", desc: "Reduz Margem de Ameaça em ataques repetidos." },
    { name: "Penetração Absoluta", type: "Infusão (Perf)", cost: "3 PF", desc: "Aumenta Multiplicador Crítico em ataques repetidos." },
    { name: "Paralisia Estática", type: "Infusão (Elét)", cost: "4 PF", desc: "Chance de travar movimento." },
    { name: "Sobrecarga Cinética", type: "Infusão (Elét)", cost: "5 PF", desc: "Ganha Movimento ao acertar (4 PC)." },
    { name: "Raiz Parasita", type: "Infusão (Flor)", cost: "5 PF", desc: "Dano recorrente cura usuário." },
    { name: "Toxina Cumulativa", type: "Infusão (Flor)", cost: "5 PF", desc: "Veneno acumula dano." },
    { name: "Incendiária", type: "Infusão (Fogo)", cost: "4 PF", desc: "Causa Em Chamas (1d4/rodada)." },
    { name: "Gatilho Pirotécnico", type: "Infusão (Fogo)", cost: "6 PF", desc: "Reação de contra-ataque de fogo." },
    { name: "Zero Absoluto", type: "Infusão (Gelo)", cost: "4 PF", desc: "Reduz defesa do alvo (Quebra armadura)." },
    { name: "Hipotermia", type: "Infusão (Gelo)", cost: "4 PF", desc: "Chance de reduzir movimento do alvo." },
    { name: "Corrosão", type: "Infusão (Quím)", cost: "2 PF", desc: "-1 Defesa do alvo." },
    { name: "Degradação", type: "Infusão (Quím)", cost: "5 PF", desc: "Acumula redução de defesa." },
    { name: "Morfologia Psíquica", type: "Infusão (Men)", cost: "3 PF", desc: "Vira ferramenta (+5 Perícia)." },
    { name: "Trauma Sináptico", type: "Infusão (Men)", cost: "4 PF", desc: "Pode causar Confusão." },
    { name: "Retorno Magnético", type: "Infusão (Plas)", cost: "3 PF", desc: "Arma volta para mão." },
    { name: "Capacitor de Fluxo", type: "Infusão (Plas)", cost: "15 PF", desc: "Armazena uma habilidade." }
];

// 4. MODIFICAÇÕES DE TRAJE (Melhorias e Infusões)
const DB_SUIT_MODS = [
    // Melhorias
    { name: "Proteção Aprimorada", type: "Melhoria", desc: "+2 Defesa (Total +5)." },
    { name: "Proteção Revestida", type: "Melhoria", desc: "+7 Defesa (Total +10). Traje Pesado." },
    { name: "Ergonomia Confortável", type: "Melhoria", desc: "-1 custo de Cansaço em habilidades." },
    { name: "Blindagem Parruda", type: "Melhoria", desc: "Chance de anular Crítico." },
    { name: "Acoplamento Modular", type: "Melhoria", desc: "Arma integrada ao traje (Sem peso)." },
    { name: "Logística Otimizada", type: "Melhoria", desc: "Muda atributo de Carga." },
    { name: "Nanofibra Sutil", type: "Melhoria", desc: "+5 Furtividade/Crime/Acrobacia." },
    { name: "Sistema Refrigeração", type: "Melhoria", desc: "Imune Calor, RD 2 Fogo." },
    { name: "Sistema Aquecimento", type: "Melhoria", desc: "Imune Frio, RD 2 Gelo." },
    { name: "Interface Canalizadora", type: "Melhoria", desc: "Exclui aliados de Área de Efeito." },
    { name: "Exo-Estímulo", type: "Melhoria", desc: "+1 em um Atributo." },
    
    // Infusões
    { name: "Campo Espelhado", type: "Infusão (Bal)", cost: "6 PF", desc: "Chance de refletir dano." },
    { name: "Protocolo Sniper", type: "Infusão (Bal)", cost: "6 PF", desc: "Ataque Complexo, Crítico aprimorado." },
    { name: "Coagulação Rápida", type: "Infusão (Corte)", cost: "3 PF", desc: "Imune a Sangramento." },
    { name: "Aerodinâmica", type: "Infusão (Corte)", cost: "3 PF", desc: "+5 Reflexos." },
    { name: "Malha Reativa", type: "Infusão (Perf)", cost: "2 PF", desc: "Ganha PV Temporário (Ação Livre)." },
    { name: "Estrutura Interna", type: "Infusão (Perf)", cost: "3 PF", desc: "+5 Fortitude." },
    { name: "Feedback Cinético", type: "Infusão (Imp)", cost: "9 PF", desc: "Reação causa onda de choque." },
    { name: "Amortecedor Explosivo", type: "Infusão (Imp)", cost: "3 PF", desc: "Arma acoplada explode (+dano)." },
    { name: "Sobrecarga Reflexo", type: "Infusão (Elét)", cost: "11 PF", desc: "Reação para esquiva total." },
    { name: "Algoritmo Preditivo", type: "Infusão (Elét)", cost: "5 PF", desc: "+5 Esquiva contra alvo analisado." },
    { name: "Armadura Espinhos", type: "Infusão (Flor)", cost: "5 PF", desc: "Dano automático em quem te ataca melee." },
    { name: "Bio-Filtro", type: "Infusão (Flor)", cost: "1 PF", desc: "Imune a Gás/Veneno." },
    { name: "Isolamento Térmico", type: "Infusão (Fogo)", cost: "3 PF", desc: "Imune a Em Chamas." },
    { name: "Punhos de Brasa", type: "Infusão (Fogo)", cost: "4 PF", desc: "Ataques viram Fogo + Chance de queimar." },
    { name: "Aura de Geada", type: "Infusão (Gelo)", cost: "4 PF", desc: "+2 Defesa passiva." },
    { name: "Criostase", type: "Infusão (Gelo)", cost: "5 PF", desc: "Ganha RD 5 temporária." },
    { name: "Injetores Toxina", type: "Infusão (Quím)", cost: "3 PF", desc: "Injeta veneno no ataque." },
    { name: "Sistema Detox", type: "Infusão (Quím)", cost: "3 PF", desc: "Remove condições negativas." },
    { name: "Gaiola Psíquica", type: "Infusão (Men)", cost: "2 PF", desc: "+10 Vontade (Mental)." },
    { name: "Decodificador", type: "Infusão (Men)", cost: "3 PF", desc: "Lê tudo, ignora camuflagem/furtividade." },
    { name: "Campo Dispersão", type: "Infusão (Plas)", cost: "3 PF", desc: "RD 5 contra tipo específico." },
    { name: "Conversor Entropia", type: "Infusão (Plas)", cost: "15 PF", desc: "Absorve dano para recuperar PC." }
];

// 5. HABILIDADES TÁTICAS
const DB_TACTICS = [
    // Tecnólogo
    { name: "Baterizar", class: "tecnologo", desc: "Usa bateria do inv. para recuperar Energia (Livre)." },
    { name: "Desmanche", class: "tecnologo", desc: "Ganha 4 Sucatas (Pode pegar várias vezes)." },
    { name: "Estoque de Energia", class: "tecnologo", desc: "Cria 3 Baterias com 1 Sucata." },
    { name: "Patrocínio Corporativo", class: "tecnologo", desc: "Ganha 200 R$ imediatamente." },
    { name: "Treinamento Intensivo", class: "tecnologo", desc: "Evolui perícias (Qtd = Raciocínio)." },
    
    // Monstruoso
    { name: "Ataque Extra de Fúria", class: "monstruoso", desc: "Zera barra para Ação Padrão extra." },
    { name: "Aumento Monstruoso", class: "monstruoso", desc: "+10 na Barra de Transformação máxima." },
    { name: "Morte Negativa", class: "monstruoso", desc: "Vira besta ao cair a 0 PV (Nível 15)." },
    { name: "Mudança de Gatilho", class: "monstruoso", desc: "Altera como ganha pontos de transformação." },
    { name: "Troca de Atributo", class: "monstruoso", desc: "Inverte atributos ao transformar." },

    // Catalisador
    { name: "Assinatura", class: "catalisador", desc: "-1 Custo PC em uma habilidade escolhida." },
    { name: "Gasto Físico", class: "catalisador", desc: "Paga habilidades com PV em vez de PC." },
    { name: "Remodelar", class: "catalisador", desc: "Recupera PF de uma habilidade para criar outra." },
    { name: "Sustentação Dupla", class: "catalisador", desc: "Mantém 2 efeitos sustentados ao mesmo tempo." },
    { name: "Teleguia", class: "catalisador", desc: "Ignora cobertura (Custa 3 PC)." },

    // Gerais
    { name: "Começando Bem", class: "geral", desc: "1ª habilidade do combate custa metade." },
    { name: "Empunhadura Dupla", class: "geral", desc: "Ataca com duas armas (-1 dado acerto)." },
    { name: "Mochila Otimizada", class: "geral", desc: "Item ocupa -1 slot." },
    { name: "Potência Aprimorada", class: "geral", desc: "Soma atributo no teste de perícia (Nível 10)." },
    { name: "Restaurar", class: "geral", desc: "Revive com 1 PV uma vez na vida (Nível 13)." }
];

// 6. PERÍCIAS
const DB_SKILLS = [
    "Acrobacia (MOB)", "Crime (MOB)", "Furtividade (MOB)", "Pilotagem (MOB)", "Pontaria (MOB)", "Reflexos (MOB)",
    "Atletismo (FOR)", "Luta (FOR)",
    "Atualidades (RAC)", "Ciências (RAC)", "Investigação (RAC)", "Medicina (RAC)", "Poder (RAC)", "Sobrevivência (RAC)", "Tática (RAC)", "Tecnologia (RAC)",
    "Adestramento (CAR)", "Artes (CAR)", "Diplomacia (CAR)", "Enganação (CAR)", "Intimidação (CAR)", "Intuição (CAR)", "Percepção (CAR)", "Religião (CAR)", "Vontade (CAR)",
    "Fortitude (ITG)"
];