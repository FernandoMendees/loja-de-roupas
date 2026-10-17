'use strict';

/* ===== CONFIGURAÇÃO CENTRAL: edite aqui antes de publicar ===== */
const CONFIG = {
  marca: 'AURA ACTIVE',
  // NÚMERO FICTÍCIO. Troque por DDI + DDD + número, só dígitos (ex.: 5511999999999).
  whatsapp: '5500000000000',
  mensagemGeral: 'Olá! Vim pela página da {marca} e gostaria de conhecer a coleção.',
  mensagemProduto: 'Olá! Tenho interesse em: {produto} ({marca}). Pode me ajudar com tamanhos e disponibilidade?',
  contato: {
    email: 'contato@exemplo.com.br',
    atendimento: 'Atendimento demonstrativo: dias úteis, horário comercial'
  }
};

const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];
const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Número real = 12 ou 13 dígitos e diferente do exemplo (DDD 00 não existe). */
const numeroConfigurado = () => /^\d{12,13}$/.test(CONFIG.whatsapp) && !CONFIG.whatsapp.startsWith('5500');

function montarLinkWhatsApp(produto) {
  const modelo = produto ? CONFIG.mensagemProduto : CONFIG.mensagemGeral;
  const texto = modelo.replace('{marca}', CONFIG.marca).replace('{produto}', produto || '');
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}

let temporizadorAviso;
function mostrarAviso(mensagem) {
  const aviso = $('#aviso');
  if (!aviso) return;
  aviso.textContent = mensagem;
  aviso.hidden = false;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => { aviso.hidden = true; }, 6000);
}

function iniciarWhatsApp() {
  $$('[data-produto]').forEach((botao) => {
    botao.setAttribute('aria-label', `Tenho interesse em ${botao.dataset.produto}`);
  });
  document.addEventListener('click', (evento) => {
    const alvo = evento.target.closest('[data-produto], [data-whats]');
    if (!alvo) return;
    evento.preventDefault();
    if (!numeroConfigurado()) {
      mostrarAviso('Canal de demonstração: defina o número real em js/main.js (CONFIG.whatsapp) para abrir a conversa.');
      return;
    }
    window.open(montarLinkWhatsApp(alvo.dataset.produto), '_blank', 'noopener,noreferrer');
  });
}

function iniciarMenu() {
  const botao = $('.menu-btn');
  const menu = $('#menu');
  if (!botao || !menu) return;
  const definir = (aberto) => {
    botao.setAttribute('aria-expanded', String(aberto));
    menu.classList.toggle('open', aberto);
  };
  botao.addEventListener('click', () => definir(botao.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) definir(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { definir(false); botao.focus(); }
  });
  window.matchMedia('(min-width: 56rem)').addEventListener('change', () => definir(false));
}

function iniciarFaq() {
  $$('.faq-item button').forEach((botao) => {
    botao.addEventListener('click', () => {
      const aberto = botao.getAttribute('aria-expanded') === 'true';
      botao.setAttribute('aria-expanded', String(!aberto));
      document.getElementById(botao.getAttribute('aria-controls')).hidden = aberto;
    });
  });
}

function iniciarRodape() {
  $('#ano').textContent = new Date().getFullYear();
  $$('[data-cfg]').forEach((el) => {
    const valor = CONFIG.contato[el.dataset.cfg];
    if (!valor) return;
    el.textContent = valor;
    if (el.dataset.cfg === 'email') el.href = `mailto:${valor}`;
  });
}

function iniciarAnimacoes() {
  if (reduzMovimento || !('IntersectionObserver' in window)) return;
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('in');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });
  $$('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    el.classList.add('reveal');
    observador.observe(el);
  });
}

function iniciarLinkAtivo() {
  if (!('IntersectionObserver' in window)) return;
  const links = $$('#menu a[href^="#"]');
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((l) => l.toggleAttribute('aria-current', l.getAttribute('href') === `#${entrada.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((secao) => observador.observe(secao));
}

[iniciarWhatsApp, iniciarMenu, iniciarFaq, iniciarRodape, iniciarAnimacoes, iniciarLinkAtivo].forEach((fn) => {
  try { fn(); } catch (erro) { console.warn(`Falha em ${fn.name}:`, erro); }
});
