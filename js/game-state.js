/** Estado compartilhado entre game.html e shop.html (localStorage, sem backend) */
const GAME_STORAGE_KEY = 'petitPoodleSave_v1';

const SHOP_ITEMS = [
  { id: 'food', name: '🍖 Ração', desc: '+25 de fome', icon: '🍖', price: 15, effect: { hunger: 25 }, type: 'food' },
  { id: 'water', name: '💧 Água', desc: '+20 de água', icon: '💧', price: 10, effect: { water: 20 }, type: 'water' },
  { id: 'treat', name: '🍬 Petisco', desc: '+15 em tudo', icon: '🍬', price: 20, effect: { hunger: 15, water: 15, happy: 15, energy: 15 }, type: 'treat' },
  { id: 'food_pack', name: '📦 Pacote Ração', desc: '+50 de fome (3 usos)', icon: '📦', price: 35, effect: { hunger: 50 }, type: 'food', uses: 3 },
  { id: 'water_pack', name: '💧 Fardo de Água', desc: '+40 de água (3 usos)', icon: '💧', price: 25, effect: { water: 40 }, type: 'water', uses: 3 }
];

function defaultGameState() {
  return {
    hunger: 0,
    water: 0,
    happy: 80,
    energy: 90,
    sleeping: false,
    money: 50,
    level: 1,
    xp: 0,
    inventory: { food: 0, water: 0 }
  };
}

function loadGameState() {
  try {
    const raw = localStorage.getItem(GAME_STORAGE_KEY);
    if (!raw) return defaultGameState();
    const data = JSON.parse(raw);
    return { ...defaultGameState(), ...data, inventory: { ...defaultGameState().inventory, ...(data.inventory || {}) } };
  } catch {
    return defaultGameState();
  }
}

function saveGameState(state) {
  localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
}

function getPoodleName() {
  return sessionStorage.getItem('poodleName') || 'Poodle';
}

function isTimaoSkin() {
  return getPoodleName().toLowerCase() === 'timao';
}

function getXpNeeded(level) {
  return Math.floor(100 + (level - 1) * 25);
}

function clampStat(v) {
  return Math.max(0, Math.min(100, v));
}

function applyTimaoTheme() {
  if (!isTimaoSkin()) return;
  const root = document.documentElement;
  root.style.setProperty('--pink', '#666');
  root.style.setProperty('--pink-d', '#111');
  root.style.setProperty('--pink-l', '#f0f0f0');
  root.style.setProperty('--bg', '#f5f5f5');
  root.style.setProperty('--text', '#1a1a1a');
  root.style.setProperty('--muted', '#555');
}
