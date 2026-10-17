# AURA ACTIVE — landing page fitness (demonstração)

Landing page estática de uma marca fictícia de moda fitness. HTML5, CSS3 e JavaScript puro, sem build e sem dependências (só a fonte do Google Fonts, com alternativa de sistema).

## Estrutura
```text
aura-active/
├── index.html          conteúdo, SEO e produtos
├── css/styles.css      identidade visual (cores em :root)
├── js/main.js          CONFIG (WhatsApp, contato) e interações
├── assets/images/      imagens (hoje, ilustrações SVG provisórias)
├── assets/icons/       favicon
└── README.md
```

## Abrir localmente
Dê duplo clique em `index.html`. Para simular uma hospedagem, rode na pasta: `python3 -m http.server 8000` e acesse `http://localhost:8000`.

## Personalizar
- **Cores:** variáveis `--bg`, `--brown`, `--sand` etc. no início de `css/styles.css`.
- **Imagens:** as imagens atuais são **ilustrações provisórias**, não fotografias. Baixe fotos de Unsplash ou Pexels (confira a licença), comprima-as (WebP/JPEG, ~1600 px no hero e ~800 px nos produtos), salve em `assets/images/` e troque o `src` no `index.html`. Ajuste `width`/`height` e o `alt`. Se precisar, use `object-position` no CSS. Mantenha `loading="lazy"` fora da primeira dobra e `fetchpriority="high"` só no hero.
- **Produtos e preços:** cada produto é um `<article class="card">` em `#colecao`. Edite nome, categoria, descrição, preço e o atributo `data-produto` do botão (é ele que vai na mensagem).
- **WhatsApp:** em `js/main.js`, altere `CONFIG.whatsapp` (DDI+DDD+número, só dígitos) e os modelos de mensagem. O número atual é **fictício**; enquanto não for trocado, os botões mostram um aviso e não abrem conversa.
- **Contato:** `CONFIG.contato` em `js/main.js` (e-mail e horário). Redes sociais: adicione links no rodapé só quando tiver os endereços reais.
- **SEO:** `<title>`, `meta description` e `og:*` no `<head>`. Ao publicar, acrescente `og:image` e `og:url` com endereços absolutos e `<link rel="canonical">`.

## Antes de publicar, substitua
1. Número de WhatsApp e e-mail fictícios.
2. Imagens provisórias por fotografias licenciadas (e revise os `alt`).
3. Produtos, preços e a oferta “ilustrativa” do Conjunto Aurora.
4. A história da marca (fictícia) e as respostas do FAQ (demonstrativas).
5. Políticas reais (trocas, prazos, entrega), se houver.

## Publicar
Envie a pasta inteira para Netlify, Vercel, Cloudflare Pages ou GitHub Pages. Não há etapa de build.
