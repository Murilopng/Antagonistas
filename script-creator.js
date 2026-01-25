/* --- BANCO DE DADOS (LIVRO) --- */

const DICE_TYPES = [
    { label: "1d4", cost: 4 },
    { label: "1d6", cost: 6 },
    { label: "1d8", cost: 8 },
    { label: "1d10", cost: 10 },
    { label: "1d12", cost: 12 },
    { label: "1d20", cost: 20 }
];

const DAMAGE_TYPES = [
    { name: "Físico (Padrão)", cost: 0 },
    { name: "Elemental (Fogo, Gelo, etc)", cost: 2 },
    { name: "Exótico / Mental", cost: 5 },
    { name: "Plasmático (Instável)", cost: 5 }
];

const MULTI_MODULES = [
    { name: "Múltiplos Alvos (Extra)", cost: 10, desc: "+10 PF por alvo adicional" }
];

// ADICIONADA PROPRIEDADE 'max' PARA DEFINIR O LIMITE
const MODULES_DB = [
    // B. MÓDULOS OFENSIVOS
    { cat: "B. Ofensivos", name: "Projétil (Ataque à Distância)", cost: 0, max: 1 },
    { cat: "B. Ofensivos", name: "Fluxo Contínuo (Dano Duplo)", cost: 30, max: 1 },
    { cat: "B. Ofensivos", name: "Corpo a Corpo Pesado (-1 Margem)", cost: 7, max: 3 }, // Corrigido: Acumula
    { cat: "B. Ofensivos", name: "Vampirismo (Cura 1/3 do Dano)", cost: 40, max: 3 },  // Corrigido: Acumula
    
    // CONDIÇÕES (Regra: Apenas uma por habilidade, pega 1 vez)
    { cat: "Condições", name: "Incômodo (Sangra/Lento/Fogo)", cost: 3, max: 1, uniqueGroup: "cond" },
    { cat: "Condições", name: "Tático (Cego/Fraco/Preso)", cost: 8, max: 1, uniqueGroup: "cond" },
    { cat: "Condições", name: "Controle (Atordoado/Paralisado)", cost: 15, max: 1, uniqueGroup: "cond" },

    // C. MÓDULOS DEFENSIVOS
    { cat: "C. Defensivos", name: "Barreira (RD 10 por nível)", cost: 20, max: 3 },
    { cat: "C. Defensivos", name: "Resistência Elemental (RD 5)", cost: 12, max: 3 },
    { cat: "C. Defensivos", name: "Resiliência Ambiental", cost: 12, max: 1 },
    { cat: "C. Defensivos", name: "Regeneração (Cura)", cost: 25, max: 1 }, // Corrigido: Max 1
    { cat: "C. Defensivos", name: "Intangibilidade", cost: 16, max: 1 },

    // D. MOBILIDADE
    { cat: "D. Mobilidade", name: "Super Velocidade (+3m)", cost: 10, max: 3 }, // Separado
    { cat: "D. Mobilidade", name: "Voo (+3m)", cost: 10, max: 3 },             // Separado
    { cat: "D. Mobilidade", name: "Teleporte (10m)", cost: 15, max: 3 },
    { cat: "D. Mobilidade", name: "Abrir Portais (Grupo)", cost: 25, max: 1 },
    { cat: "D. Mobilidade", name: "Escalada Aprimorada", cost: 10, max: 1 },
    { cat: "D. Mobilidade", name: "Planar (Queda Lenta)", cost: 5, max: 1 },

    // E. CONTROLE & UTILIDADE
    { cat: "E. Utilidade", name: "Aprisionamento (+10 DT)", cost: 18, max: 3 },
    { cat: "E. Utilidade", name: "Manipulação Mental (+10 DT)", cost: 25, max: 3 }, // Corrigido: Max 3
    { cat: "E. Utilidade", name: "Leitura Mental (+10 DT)", cost: 20, max: 3 },     // Corrigido: Max 3
    { cat: "E. Utilidade", name: "Telecinese", cost: 25, max: 1 },                  // Corrigido: Max 1
    { cat: "E. Utilidade", name: "Criação de Suportes", cost: 10, max: 3 },
    { cat: "E. Utilidade", name: "Criação de Itens", cost: 25, max: 1 },
    { cat: "E. Utilidade", name: "Controle de Animais", cost: 10, max: 1 },

    // F. BUFFS & PARCEIROS
    { cat: "F. Buffs & Parceiros", name: "Aumento de Atributo (+1)", cost: 10, max: 1 }, // Corrigido: Max 1
    { cat: "F. Buffs & Parceiros", name: "Bônus de Perícia (+5)", cost: 22, max: 3 },
    { cat: "F. Buffs & Parceiros", name: "Mudar Aparência (Ilusão)", cost: 20, max: 1 },
    { cat: "F. Buffs & Parceiros", name: "Ação Extra (Turno Adicional)", cost: 100, max: 1 },
    { cat: "F. Buffs & Parceiros", name: "Invocação (Parceiro Suporte)", cost: 30, max: 1 },
    { cat: "F. Buffs & Parceiros", name: "Invocação (Parceiro Combate)", cost: 35, max: 1 },
    { cat: "F. Buffs & Parceiros", name: "Invocação (Parceiro Conjurador)", cost: 45, max: 1 }
];

/* --- ESTADO --- */
let heroLevel = 1;
let diceCounts = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0 }; 
let multiCounts = { 0:0 }; 
let moduleCounts = {}; // Armazena quantos de cada módulo foram pegos
let damageTypeCost = 0;

window.onload = function() {
    // Inicializa contadores de módulo
    MODULES_DB.forEach((_, i) => moduleCounts[i] = 0);
    
    loadHeroLevel();
    renderUI();
    calcTotal();
};

function loadHeroLevel() {
    const heroId = localStorage.getItem('last_viewed_hero_id');
    if(heroId) {
        const list = JSON.parse(localStorage.getItem('bs_heroes')) || [];
        const hero = list.find(h => h.id == heroId);
        if(hero) heroLevel = hero.level || 1;
    }
}

function goBack() {
    const heroId = localStorage.getItem('last_viewed_hero_id');
    if(heroId) window.location.href = `view-hero.html?id=${heroId}`;
    else window.location.href = 'heroes.html';
}

/* --- RENDERIZAÇÃO DA INTERFACE --- */
function renderUI() {
    // 1. Tipos de Dano
    const dmgList = document.getElementById('damage-list');
    DAMAGE_TYPES.forEach((dmg, idx) => {
        dmgList.innerHTML += `
            <label class="dmg-option">
                <input type="radio" name="dmgType" value="${dmg.cost}" ${idx===0?'checked':''} onchange="updateDamageCost(this.value)">
                ${dmg.name} <span class="cost-badge">${dmg.cost} PF</span>
            </label>
        `;
    });

    // 2. Dados de Dano
    const diceList = document.getElementById('dice-list');
    DICE_TYPES.forEach((die, idx) => {
        diceList.innerHTML += `
            <div class="dice-row">
                <span class="dice-label">${die.label} (${die.cost} PF)</span>
                <div class="dice-controls">
                    <button class="btn-counter" onclick="changeDice(${idx}, -1)">-</button>
                    <span class="dice-qty" id="dice-qty-${idx}">0</span>
                    <button class="btn-counter" onclick="changeDice(${idx}, 1)">+</button>
                </div>
            </div>
        `;
    });

    // 3. Módulos Acumulativos (Multialvo)
    const multiList = document.getElementById('multi-modules');
    MULTI_MODULES.forEach((mod, idx) => {
        multiList.innerHTML += `
            <div class="counter-mod">
                <div><b>${mod.name}</b> <br><small>${mod.desc}</small></div>
                <div class="dice-controls">
                    <button class="btn-counter" onclick="changeMulti(${idx}, -1)">-</button>
                    <span class="dice-qty" id="multi-qty-${idx}">0</span>
                    <button class="btn-counter" onclick="changeMulti(${idx}, 1)">+</button>
                </div>
            </div>
        `;
    });

    // 4. Módulos Gerais (Agora com suporte a Max > 1)
    const modList = document.getElementById('modules-list');
    let currentCat = "";
    
    MODULES_DB.forEach((mod, idx) => {
        if(mod.cat !== currentCat) {
            modList.innerHTML += `<div class="category-header">${mod.cat}</div>`;
            currentCat = mod.cat;
        }

        let controlHTML = "";

        if (mod.max > 1) {
            // Renderiza Contador para itens stackáveis
            controlHTML = `
                <div class="dice-controls small-controls">
                    <button class="btn-counter" onclick="changeModule(${idx}, -1)">-</button>
                    <span class="dice-qty" id="mod-qty-${idx}" style="font-size:1rem;">0</span>
                    <button class="btn-counter" onclick="changeModule(${idx}, 1)">+</button>
                </div>
            `;
        } else {
            // Renderiza Checkbox para itens únicos (Max 1)
            controlHTML = `
                <div class="module-info">
                    <input type="checkbox" id="mod-check-${idx}" onchange="toggleModule(${idx})">
                </div>
            `;
        }

        // Novo HTML estruturado
        modList.innerHTML += `
            <div class="check-item ${mod.max > 1 ? 'stackable' : ''}">
                ${controlHTML}
                <div class="module-label">
                    ${mod.name}
                    ${mod.max > 1 ? `<small style="color:#888; display:block;">(Máx ${mod.max})</small>` : ''}
                </div>
                <span class="cost-badge">${mod.cost} PF</span>
            </div>
        `;
    });
}

/* --- LÓGICA DE CÁLCULO --- */

function updateDamageCost(val) {
    damageTypeCost = parseInt(val);
    calcTotal();
}

function changeDice(idx, amount) {
    if(diceCounts[idx] + amount >= 0) {
        diceCounts[idx] += amount;
        document.getElementById(`dice-qty-${idx}`).innerText = diceCounts[idx];
        calcTotal();
    }
}

function changeMulti(idx, amount) {
    if(multiCounts[idx] + amount >= 0) {
        multiCounts[idx] += amount;
        document.getElementById(`multi-qty-${idx}`).innerText = multiCounts[idx];
        calcTotal();
    }
}

// Funções para os Módulos Gerais
function changeModule(idx, amount) {
    const mod = MODULES_DB[idx];
    const current = moduleCounts[idx];
    const next = current + amount;

    if (next >= 0 && next <= mod.max) {
        moduleCounts[idx] = next;
        document.getElementById(`mod-qty-${idx}`).innerText = next;
        
        // Estilo visual para indicar ativo
        const row = document.getElementById(`mod-qty-${idx}`).closest('.check-item');
        if(next > 0) row.classList.add('active-mod');
        else row.classList.remove('active-mod');
        
        calcTotal();
    }
}

function toggleModule(idx) {
    const mod = MODULES_DB[idx];
    const checkbox = document.getElementById(`mod-check-${idx}`);
    
    // Regra: Se for do grupo 'cond', verifica se já tem outro ativo
    if (mod.uniqueGroup === 'cond' && checkbox.checked) {
        // Varre todos os módulos para ver se tem outra condição ativa
        const hasCondition = MODULES_DB.some((m, i) => m.uniqueGroup === 'cond' && moduleCounts[i] > 0 && i !== idx);
        
        if(hasCondition) {
            alert("REGRA: Você só pode escolher UMA Categoria de Condição por habilidade.");
            checkbox.checked = false; // Desmarca
            return;
        }
    }

    moduleCounts[idx] = checkbox.checked ? 1 : 0;
    
    const row = checkbox.closest('.check-item');
    if(checkbox.checked) row.classList.add('active-mod');
    else row.classList.remove('active-mod');

    calcTotal();
}

function updateOverload() {
    const val = document.getElementById('overload-slider').value;
    document.getElementById('overload-pc').innerText = val;
    document.getElementById('overload-discount').innerText = val * 3;
    calcTotal();
}

function calcTotal() {
    let total = 0;

    // 1. Chassi
    total += parseInt(document.getElementById('sel-time').value);
    total += parseInt(document.getElementById('sel-range').value);
    total += parseInt(document.getElementById('sel-area').value);
    total += parseInt(document.getElementById('sel-duration').value);

    // 2. Potência (Dados)
    total += damageTypeCost;
    DICE_TYPES.forEach((die, idx) => {
        total += (die.cost * diceCounts[idx]);
    });

    // 3. Módulos Acumulativos (Sistema)
    MULTI_MODULES.forEach((mod, idx) => {
        total += (mod.cost * multiCounts[idx]);
    });

    // 4. Módulos da Lista (Contagem * Custo)
    MODULES_DB.forEach((mod, idx) => {
        total += (moduleCounts[idx] * mod.cost);
    });

    // 5. Sobrecarga
    const isPassive = parseInt(document.getElementById('sel-duration').value) === 30;
    const slider = document.getElementById('overload-slider');
    const warning = document.getElementById('passive-warn');
    
    let overload = 0;

    if (isPassive) {
        slider.disabled = true;
        slider.value = 0;
        warning.style.display = 'block';
    } else {
        slider.disabled = false;
        warning.style.display = 'none';
        overload = parseInt(slider.value);
        total -= (overload * 3);
    }

    if (total < 1) total = 1;

    // ATUALIZAÇÃO VISUAL
    document.getElementById('display-total').innerText = total + " PF";
    document.getElementById('final-pc-cost').innerText = isPassive ? 0 : (1 + overload);

    // Validação de Tier
    let maxPF = 25;
    if (heroLevel >= 5) maxPF = 50;
    if (heroLevel >= 10) maxPF = 75;
    if (heroLevel >= 15) maxPF = 100;

    document.getElementById('limit-pf').innerText = maxPF;
    const status = document.getElementById('tier-display');
    const btn = document.getElementById('btn-save');

    if (total <= maxPF) {
        status.innerText = "PROJETO APROVADO";
        status.className = "tier-status status-ok";
        btn.disabled = false;
        btn.innerText = "SINTETIZAR PODER";
    } else {
        status.innerText = `LIMITE EXCEDIDO (${total}/${maxPF})`;
        status.className = "tier-status status-error";
        btn.disabled = true;
        btn.innerText = "REDUZA O CUSTO";
    }
}

function savePower() {
    const name = document.getElementById('power-name').value;
    if (!name.trim()) { alert("Nome da habilidade é obrigatório."); return; }

    const desc = document.getElementById('power-desc').value;
    const costPF = document.getElementById('display-total').innerText;
    const costPC = document.getElementById('final-pc-cost').innerText;

    // Monta detalhes dos dados
    let diceDesc = [];
    DICE_TYPES.forEach((d, i) => {
        if(diceCounts[i] > 0) diceDesc.push(`${diceCounts[i]}x${d.label}`);
    });

    // Monta detalhes dos módulos
    let modsDesc = [];
    MODULES_DB.forEach((m, i) => {
        if(moduleCounts[i] > 0) {
            modsDesc.push(`${m.name} (${moduleCounts[i]})`);
        }
    });

    const newPower = {
        name: name,
        desc: desc,
        cost: costPF,
        use: costPC,
        dice: diceDesc.length > 0 ? diceDesc.join(" + ") : "Sem Dano",
        effects: modsDesc.join(", ")
    };

    const heroId = localStorage.getItem('last_viewed_hero_id');
    if (!heroId) return;

    let list = JSON.parse(localStorage.getItem('bs_heroes')) || [];
    const idx = list.findIndex(h => h.id == heroId);

    if (idx >= 0) {
        if (!list[idx].fluxPowers) list[idx].fluxPowers = [];
        list[idx].fluxPowers.push(newPower);
        localStorage.setItem('bs_heroes', JSON.stringify(list));
        alert("Poder salvo!");
        goBack();
    }
}