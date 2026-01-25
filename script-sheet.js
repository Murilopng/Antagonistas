
// --- NO INÍCIO DO SCRIPT DE view-hero.html ---
const urlParams = new URLSearchParams(window.location.search);
const heroId = urlParams.get('id');

// Salva o ID para a página de criação saber quem é o dono
if(heroId) {
    localStorage.setItem('last_viewed_hero_id', heroId);
}

// --- INICIALIZAÇÃO ---
window.onload = function() {
    try {
        if (heroId) {
            loadHero(heroId);
        } else {
            createBlankHero();
        }
        renderAll();
    } catch (e) {
        console.error("Erro ao iniciar:", e);
    }
};

function createBlankHero() {
    hero = {
        id: Date.now(),
        name: "", civil: "", class: "tecnologo", level: 1, age: "", rank: "Iniciante", photo: "",
        attr: { mob: 1, for: 1, rac: 1, car: 1, itg: 1 },
        points: 0,
        hp: { curr: 22, max: 22 },
        pc: { curr: 0, max: 13 },
        special: { curr: 0, max: 100 }, // Transf (75) ou Energia (100)
        rerois: 100,
        flux: 60,
        skills: {},
        inventory: [],
        suit: { name: "Traje Padrão", def: 3, upgrades: [] },
        tactics: [],
        fluxPowers: [],
        history: "", personality: "", powerOrigin: "", relations: "", notes: ""
    };
    if(typeof DB_SKILLS !== 'undefined') DB_SKILLS.forEach(s => hero.skills[s] = 0);
}

function loadHero(id) {
    const list = JSON.parse(localStorage.getItem('bs_heroes')) || [];
    const found = list.find(h => h.id == id);
    if (found) {
        hero = found;
        // Garante integridade dos dados
        if(!hero.special) hero.special = { curr: 0, max: 100 };
        if(!hero.suit) hero.suit = { name: "Traje Padrão", def: 3, upgrades: [] };
        if(!hero.inventory) hero.inventory = [];
        if(!hero.fluxPowers) hero.fluxPowers = [];
        if(!hero.tactics) hero.tactics = [];
        if(typeof DB_SKILLS !== 'undefined') {
            DB_SKILLS.forEach(s => { if (hero.skills[s] === undefined) hero.skills[s] = 0; });
        }
    } else {
        alert("Agente não encontrado.");
        window.location.href = 'heroes.html';
    }
}

// --- FUNÇÃO AUXILIAR SEGURA (Evita o erro "Cannot read property of null") ---
function getVal(id, defaultValue = "") {
    const el = document.getElementById(id);
    return el ? el.value : defaultValue;
}

function setVal(id, value) {
    const el = document.getElementById(id);
    if(el) el.value = value;
}

// --- RENDERIZAÇÃO ---
function renderAll() {
    setVal('name', hero.name);
    setVal('civil', hero.civil);
    setVal('class', hero.class);
    setVal('age', hero.age);
    setVal('rank', hero.rank);
    setVal('photo-url', hero.photo);
    
    setVal('res-rerois', hero.rerois);
    setVal('res-flux', hero.flux);

    setVal('history', hero.history);
    setVal('personality', hero.personality);
    setVal('power-origin', hero.powerOrigin);
    setVal('relations', hero.relations);
    setVal('notes', hero.notes);

    const levelDisplay = document.getElementById('level-display');
    if(levelDisplay) levelDisplay.innerText = hero.level;
    
    const pointsDisplay = document.getElementById('attr-points');
    if(pointsDisplay) pointsDisplay.innerText = hero.points || 0;

    updatePhoto();
    updateClassMechanics(); 
    renderAttributes();
    renderSkills();
    renderInventory();
    renderSuit();
    renderTactics();
    renderFluxList();
    calcStats(); // Isso vai chamar updateBars no final
}

// --- LÓGICA DE STATUS E BARRAS ---
function calcStats() {
    let bonusPV = 0, bonusPC = 0;
    const cls = getVal('class');
    const lvl = hero.level;

    if(cls === 'tecnologo') { bonusPV = 2 * lvl; }
    if(cls === 'monstruoso') { bonusPV = 5 * lvl; bonusPC = 2 * lvl; }
    if(cls === 'catalisador') { bonusPV = 3 * lvl; bonusPC = 4 * lvl; }

    hero.hp.max = 20 + (hero.attr.itg * 2) + bonusPV;
    hero.pc.max = 10 + (Math.max(hero.attr.mob, hero.attr.for) * 3) + bonusPC;

    setVal('hp-max', hero.hp.max);
    setVal('pc-max', hero.pc.max);
    
    updateBars();
}

function updateBars() {
    // --- LEITURA SEGURA DOS DADOS ---
    // Pega o valor dos inputs. Se estiver vazio ou inválido, considera o valor atual do objeto hero.
    let hpInput = parseInt(document.getElementById('hp-curr').value);
    let pcInput = parseInt(document.getElementById('pc-curr').value);
    let spInput = parseInt(document.getElementById('special-curr').value);

    // Se for NaN (campo vazio), vira 0 para cálculo visual, mas não altera o input ainda
    if (isNaN(hpInput)) hpInput = 0;
    if (isNaN(pcInput)) pcInput = 0;
    if (isNaN(spInput)) spInput = 0;

    // Atualiza o objeto hero (Sem travar limites máximos no valor numérico)
    hero.hp.curr = hpInput;
    hero.pc.curr = pcInput;
    hero.special.curr = spInput;

    // --- ATUALIZAÇÃO VISUAL (BARRAS) ---
    // A barra visual limita em 100% para não quebrar o layout, mas o número é livre.
    
    // Vida
    const hpElem = document.getElementById('hp-bar');
    const hpTxt = document.getElementById('hp-overlay'); // Texto dentro da barra
    const hpLabel = document.getElementById('hp-txt');   // Texto no label
    
    if(hpElem) {
        const hpPct = (hero.hp.curr / hero.hp.max) * 100;
        hpElem.style.width = Math.max(0, Math.min(100, hpPct)) + "%"; // Trava visual entre 0 e 100%
        if(hpTxt) hpTxt.innerText = hero.hp.curr; // Mostra só o atual dentro da barra
        if(hpLabel) hpLabel.innerText = `${hero.hp.curr} / ${hero.hp.max}`;
    }

    // Cansaço
    const pcElem = document.getElementById('pc-bar');
    const pcTxt = document.getElementById('pc-overlay');
    const pcLabel = document.getElementById('pc-txt');

    if(pcElem) {
        const pcPct = (hero.pc.curr / hero.pc.max) * 100;
        pcElem.style.width = Math.max(0, Math.min(100, pcPct)) + "%";
        if(pcTxt) pcTxt.innerText = hero.pc.curr;
        if(pcLabel) pcLabel.innerText = `${hero.pc.curr} / ${hero.pc.max}`;
    }

    // Especial (Transformação / Energia)
    if(hero.class !== 'catalisador') {
        const spElem = document.getElementById('special-bar');
        const spTxt = document.getElementById('special-overlay-txt');
        
        if(spElem) {
            // Usa o max definido na updateClassMechanics (75 ou 100) apenas para a porcentagem visual
            const baseMax = hero.special.max || 100; 
            const spPct = (hero.special.curr / baseMax) * 100;
            
            spElem.style.width = Math.max(0, Math.min(100, spPct)) + "%";
            
            // Texto mostra o valor real, sem limites
            if(spTxt) spTxt.innerText = `${hero.special.curr} / ${baseMax}`;
        }
    }
}

function updateClassMechanics() {
    // 1. Identifica a classe selecionada
    hero.class = getVal('class');
    
    // 2. Pega os elementos da barra especial
    const box = document.getElementById('special-bar-container');
    const label = document.getElementById('special-label');
    const fill = document.getElementById('special-bar');

    // Se o HTML não estiver carregado ainda, para
    if (!box || !fill) return;

    // 3. Aplica a lógica visual
    if(hero.class === 'monstruoso') {
        box.style.display = 'block';
        label.innerText = "TRANSFORMAÇÃO";
        // Remove classes antigas e adiciona a certa
        fill.className = "progress-fill"; 
        fill.classList.add("fill-trans"); // Vermelho
        
        // Define o divisor padrão para cálculo da porcentagem visual (Base do livro)
        hero.special.max = 75; 
        
    } else if(hero.class === 'tecnologo') {
        box.style.display = 'block';
        label.innerText = "ENERGIA / BATERIA";
        // Remove classes antigas e adiciona a certa
        fill.className = "progress-fill";
        fill.classList.add("fill-energy"); // Azul/Ciano
        
        hero.special.max = 100;

    } else {
        // Catalisador não tem barra extra por padrão no layout
        box.style.display = 'none';
    }

    // 4. Força a atualização dos números e tamanho da barra
    updateBars();
}

// --- ATRIBUTOS ---
function renderAttributes() {
    const container = document.getElementById('hex-grid');
    if(!container) return;
    container.innerHTML = '';
    const map = { mob:"MOB", for:"FOR", rac:"RAC", car:"CAR", itg:"ITG" };
    
    for (let key in map) {
        container.innerHTML += `
            <div class="hex">
                <div class="hex-shape">${hero.attr[key]}</div>
                <div style="font-weight:bold; font-size:0.8rem;">${map[key]}</div>
                <div class="hex-btns">
                    <button onclick="modAttr('${key}', -1)">-</button>
                    <button onclick="modAttr('${key}', 1)">+</button>
                </div>
            </div>
        `;
    }
}

function modAttr(key, val) {
    hero.attr[key] += val;
    if(hero.attr[key] < 0) hero.attr[key] = 0;
    renderAttributes();
    calcStats();
}

function changeLevel(val) {
    const newLvl = hero.level + val;
    if (newLvl < 1) return;
    hero.level = newLvl;
    document.getElementById('level-display').innerText = hero.level;
    calcStats();
}

// --- PERÍCIAS ---
function renderSkills() {
    const list = document.getElementById('skills-list');
    if(!list) return;
    list.innerHTML = '';
    
    if(typeof DB_SKILLS !== 'undefined') {
        DB_SKILLS.forEach(skillName => {
            const val = hero.skills[skillName] || 0;
            
            // Estilo visual baseado no nível
            let color = "#fff";
            let fontColor = "#555";
            let border = "1px solid #eee";
            
            if(val === 5) { color = "var(--bs-blue)"; fontColor = "white"; border = "1px solid var(--bs-blue)"; }
            if(val === 10) { color = "var(--bs-yellow)"; fontColor = "var(--dark)"; border = "1px solid var(--dark)"; }
            if(val === 15) { color = "var(--bs-red-light)"; fontColor = "white"; border = "1px solid var(--bs-red-dark)"; }

            list.innerHTML += `
                <div class="skill-row" style="background:${val > 0 ? '#f0f8ff' : '#f8f8f8'}; border-left: 4px solid ${val > 0 ? color : 'transparent'}">
                    <span style="font-weight:${val > 0 ? 'bold' : 'normal'}">${skillName}</span>
                    <select onchange="updateSkill('${skillName}', this.value)" 
                        style="padding:2px; font-size:0.8rem; width:80px; background:${color}; color:${fontColor}; font-weight:bold; border:${border}; border-radius:4px;">
                        <option value="0" ${val==0?'selected':''}>+0</option>
                        <option value="5" ${val==5?'selected':''}>+5</option>
                        <option value="10" ${val==10?'selected':''}>+10</option>
                        <option value="15" ${val==15?'selected':''}>+15</option>
                    </select>
                </div>
            `;
        });
    }
}

function updateSkill(name, val) {
    hero.skills[name] = parseInt(val);
    renderSkills();
}

// --- MODAIS E INVENTÁRIO ---
let modalContext = null; 
let selectedItemIndex = null;

function openItemModal(type, index = null) {
    modalContext = type;
    selectedItemIndex = index;
    const modal = document.getElementById('list-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    if(!modal) return;
    
    body.innerHTML = '';
    modal.classList.add('active');

    if(type === 'weapon') {
        title.innerText = "Adicionar Arma";
        DB_WEAPONS.forEach(w => {
            body.innerHTML += `<div onclick="addItem('${w.name}', '${w.dmg} | ${w.type}', 'Arma')"><b>${w.name}</b> <small>(${w.dmg})</small></div>`;
        });
    } else if(type === 'item') {
        title.innerText = "Adicionar Item";
        DB_ITEMS.forEach(i => {
            body.innerHTML += `<div onclick="addItem('${i.name}', '${i.desc}', '${i.type}')"><b>${i.name}</b> <small>${i.desc}</small></div>`;
        });
    } else if (type === 'upgrade') {
        if (selectedItemIndex === 'suit') {
            title.innerText = "Mods de Traje";
            DB_SUIT_MODS.forEach(mod => body.innerHTML += `<div onclick="addUpgrade('${mod.name}')"><b>${mod.name}</b> <small>${mod.desc}</small></div>`);
        } else {
            title.innerText = "Mods de Arma";
            DB_WEAPON_MODS.forEach(mod => body.innerHTML += `<div onclick="addUpgrade('${mod.name}')"><b>${mod.name}</b> <small>${mod.desc}</small></div>`);
        }
    }
}

function addItem(name, desc, type) {
    hero.inventory.push({ name, desc, type, upgrades: [] });
    closeModal('list-modal');
    renderInventory();
}

function addUpgrade(name) {
    if(selectedItemIndex === 'suit') {
        hero.suit.upgrades.push(name);
        renderSuit();
    } else {
        hero.inventory[selectedItemIndex].upgrades.push(name);
        renderInventory();
    }
    closeModal('list-modal');
}

function removeUpgrade(itemIndex, upgradeIndex) {
    if(confirm("Remover esta melhoria?")) {
        if(itemIndex === 'suit') {
            hero.suit.upgrades.splice(upgradeIndex, 1);
            renderSuit();
        } else {
            hero.inventory[itemIndex].upgrades.splice(upgradeIndex, 1);
            renderInventory();
        }
    }
}

function renderInventory() {
    const wList = document.getElementById('weapon-list');
    const iList = document.getElementById('item-list');
    if(!wList || !iList) return;
    wList.innerHTML = ''; iList.innerHTML = '';

    hero.inventory.forEach((item, idx) => {
        let upgradesHtml = "";
        if(item.upgrades && item.upgrades.length > 0) {
            upgradesHtml = item.upgrades.map((u, uIdx) => 
                `<span class="upgrade-tag" onclick="removeUpgrade(${idx}, ${uIdx})">${u} <i class="fa-solid fa-times"></i></span>`
            ).join('');
        }

        const html = `
            <div class="item-row">
                <div style="display:flex; justify-content:space-between;">
                    <strong>${item.name}</strong> 
                    <span class="action-remove" onclick="hero.inventory.splice(${idx},1); renderInventory();"><i class="fa-solid fa-trash"></i></span>
                </div>
                <small>${item.desc}</small>
                <div class="upgrade-container">${upgradesHtml}</div>
                <div class="item-actions">
                    ${item.type === 'Arma' ? `<span class="action-link" onclick="openItemModal('upgrade', ${idx})">+ Melhoria</span>` : ''}
                </div>
            </div>
        `;
        if(item.type === 'Arma') wList.innerHTML += html; else iList.innerHTML += html;
    });
}

function openSuitModal() { openItemModal('upgrade', 'suit'); }

function renderSuit() {
    const div = document.getElementById('suit-display');
    if(!div) return;
    const ups = hero.suit.upgrades.map((u, uIdx) => 
        `<span class="upgrade-tag" onclick="removeUpgrade('suit', ${uIdx})">${u} <i class="fa-solid fa-times"></i></span>`
    ).join('');
    
    div.innerHTML = `
        <div class="item-row" style="border-left-color: var(--bs-yellow);">
            <strong>${hero.suit.name}</strong> (Defesa Base: ${hero.suit.def})
            <div class="upgrade-container">${ups}</div>
            <div class="item-actions">
                <span class="action-link" onclick="openSuitModal()">+ Melhoria/Infusão</span>
            </div>
        </div>
    `;
}

// --- TÁTICAS E FLUXO ---
function openTacticalModal() {
    const modal = document.getElementById('list-modal');
    const body = document.getElementById('modal-body');
    const title = document.getElementById('modal-title');
    if(!modal) return;
    
    title.innerText = "Habilidades Táticas";
    body.innerHTML = '';
    modal.classList.add('active');

    DB_TACTICS.forEach(t => {
        if(t.class === hero.class || t.class === 'geral' || hero.level >= 11) {
            body.innerHTML += `<div onclick="addTactic('${t.name}')"><b>${t.name}</b> <br><small>${t.desc}</small></div>`;
        }
    });
}

function addTactic(name) {
    if(!hero.tactics.includes(name)) hero.tactics.push(name);
    closeModal('list-modal');
    renderTactics();
}

function renderTactics() {
    const list = document.getElementById('tactical-list');
    if(list) list.innerHTML = hero.tactics.map((t, i) => `<div class="item-row">${t} <span class="action-remove" style="float:right;" onclick="hero.tactics.splice(${i},1); renderTactics()">X</span></div>`).join('');
}

function openFluxModal() {
    document.getElementById('flux-modal').classList.add('active');
    setVal('flux-name', ''); setVal('flux-desc', ''); setVal('flux-cost', ''); setVal('flux-use', '');
}

function addFluxPower() {
    const name = getVal('flux-name');
    const desc = getVal('flux-desc');
    const cost = getVal('flux-cost');
    const use = getVal('flux-use');

    if(name) {
        hero.fluxPowers.push({ name, desc, cost, use });
        closeModal('flux-modal');
        renderFluxList();
    }
}

function renderFluxList() {
    const list = document.getElementById('flux-list');
    if(list) list.innerHTML = hero.fluxPowers.map((p, i) => `
        <div class="item-row">
            <b>${p.name}</b> <small>(${p.cost} PF)</small><br>${p.desc}<br>
            <small style="color:var(--bs-blue)">Custo: ${p.use} PC</small>
            <span class="action-remove" style="float:right;" onclick="hero.fluxPowers.splice(${i},1); renderFluxList()">X</span>
        </div>
    `).join('');
}

// --- UTILITÁRIOS ---
function updatePhoto() {
    const url = getVal('photo-url');
    const box = document.getElementById('photo-display');
    if(box) {
        if(url && url.length > 5) box.innerHTML = `<img src="${url}">`;
        else box.innerHTML = `<i class="fa-solid fa-user fa-3x" style="color:#888;"></i>`;
    }
}

function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// --- SALVAR COM SEGURANÇA ---
function saveData() {
    try {
        // Inputs de Texto (Seguros)
        hero.name = getVal('name');
        hero.civil = getVal('civil');
        hero.age = getVal('age');
        hero.rank = getVal('rank');
        hero.photo = getVal('photo-url');
        
        // Recursos Numéricos
        hero.rerois = parseInt(getVal('res-rerois')) || 0;
        hero.flux = parseInt(getVal('res-flux')) || 0;

        // Lore
        hero.history = getVal('history');
        hero.personality = getVal('personality');
        hero.powerOrigin = getVal('power-origin');
        hero.relations = getVal('relations');
        hero.notes = getVal('notes');

        // Status Vital (Garantindo que salva o que está no input)
        updateBars(); // Isso atualiza hero.hp.curr etc com os limites corretos

        // Salvar no Navegador
        let list = JSON.parse(localStorage.getItem('bs_heroes')) || [];
        const index = list.findIndex(h => h.id == hero.id);
        
        if (index >= 0) list[index] = hero;
        else list.push(hero);
        
        localStorage.setItem('bs_heroes', JSON.stringify(list));
        alert("Agente salvo com sucesso!");
        
    } catch (e) {
        console.error(e);
        alert("Erro ao salvar: " + e.message);
    }
}
