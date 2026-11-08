/* ═══════════ OS 10 BÔNUS E OS 4 EXTRAS de 50 Projetos de Terços de Pulso ═══════════
   Arquivo escrito à mão (o index.html é gerado pelo scripts/tpulso-app-montar.cjs; este não).
   Por enquanto todos estão "Liberado em breve": o conteúdo dos bônus está em produção (piloto do Bônus 1) e os
   extras (order bumps) ainda não existem. Quando um ficar pronto: preencha "pdf" (caminho em /pdf/...) ou
   "paginas" e tire o "breve". Usa as funções globais do index: $, esc, ico, dois. */
var BONUS = (function () {
  var LISTA = [
    { n: 1, tit: 'Guia pra vender + mensagens prontas', sub: 'Onde vender e o que escrever', breve: true,
      promete: ['Onde vender: paróquia, catequese, grupo de oração, feira, loja de artigos religiosos, WhatsApp, Instagram, Shopee e Elo7', '8 mensagens prontas para copiar e mandar'] },
    { n: 2, tit: 'Preços + Calculadora', sub: 'Quanto cobrar por cada peça', breve: true,
      promete: ['O custo de cada peça, do material à embalagem', 'Quanto cobrar, com a calculadora em reais'] },
    { n: 3, tit: 'Calendário religioso', sub: 'As datas do ano para vender', breve: true,
      promete: ['As datas católicas do ano no Brasil', 'O dia certo de começar a preparar cada uma'] },
    { n: 4, tit: 'Primeira Comunhão, Batizado e Crisma', sub: 'Lembrancinhas em série', breve: true,
      promete: ['Quanto comprar para fazer em série', 'Como montar rápido', 'Orçamento pronto para mandar'] },
    { n: 5, tit: 'O significado das cores e das pedras', sub: 'Cores, pedras e 8 combinações', breve: true,
      promete: ['O que cada cor e cada pedra representa', '8 combinações que ficam lindas'] },
    { n: 6, tit: 'Catálogo pra WhatsApp', sub: 'Seu catálogo pronto para enviar', breve: true,
      promete: ['Um exemplo de catálogo pronto', 'O modelo para colocar suas fotos e preços'] },
    { n: 7, tit: 'Plano de 7 dias', sub: 'O que postar em cada dia', breve: true,
      promete: ['O que postar em cada um dos 7 dias', 'O texto de cada post, pronto'] },
    { n: 8, tit: 'Embalagens e etiquetas', sub: 'Para presentear e vender', breve: true,
      promete: ['Ideias de embalagem para presente', 'Etiquetas para imprimir', 'Cartõezinhos com a oração da dezena'] },
    { n: 9, tit: 'Onde comprar os materiais', sub: 'O que pedir e como economizar', breve: true,
      promete: ['Armarinho, 25 de Março, Shopee e AliExpress', 'O que pedir em cada lugar e como economizar'] },
    { n: 10, tit: 'Fotos que vendem', sub: 'Fotos bonitas com o celular', breve: true,
      promete: ['Como fotografar com o celular, sem equipamento', 'Luz, fundo e enquadramento que vendem'] }
  ];
  /* ── REGRA DE LIBERAÇÃO DOS EXTRAS (order bumps) ──
     Cada extra é liberado para quem comprou o produto dele (ids) OU o combo "Leve todos" (ID_COMBO, R$ 16,90,
     que dá os 4). O "Terços para Carro" saiu do checkout em 08/11: hoje ele só vem pelo combo (ids vazio).
     PREENCHA aqui os IDs dos produtos na Wiapy (os mesmos que o webhook manda).
     Enquanto o login aceitar qualquer e-mail (sem consultar compras), COMPRAS fica vazio e os extras aparecem
     como "Em breve"/"Desbloqueie". Quando o acesso passar a vir do webhook (modelo apps/guias-membros), basta
     pôr em window.COMPRAS a lista de IDs comprados pelo e-mail. */
  var ID_COMBO = '';   // ← ID do produto "Leve todos" na Wiapy
  var EXTRAS = [
    { n: 1, tit: '50 Modelos de Terços de Pescoço', sub: 'Extra da compra', breve: true, ids: [/* ID do bump Pescoço */] },
    { n: 2, tit: '30 Modelos de Escapulários Artesanais', sub: 'Extra da compra', breve: true, ids: [/* ID do bump Escapulários */] },
    { n: 3, tit: '25 Modelos de Mini Terços de Chaveiro', sub: 'Extra da compra', breve: true, ids: [/* ID do bump Chaveiro */] },
    { n: 4, tit: '25 Modelos de Terços para Carro', sub: 'Vem no combo Leve todos', breve: true, ids: [] }
  ];
  function compras() { return (window.COMPRAS || []).map(String); }
  function desbloqueado(x) {
    var c = compras();
    return (!!ID_COMBO && c.indexOf(String(ID_COMBO)) >= 0) || (x.ids || []).some(function (id) { return c.indexOf(String(id)) >= 0; });
  }

  function card(tipo, b) {
    var pre = tipo === 'bonus' ? 'b' : 'x';
    var foto = '<img src="/assets/capas/' + pre + dois(b.n) + '-480.webp" srcset="/assets/capas/' + pre + dois(b.n) + '-480.webp 480w, /assets/capas/' + pre + dois(b.n) + '-800.webp 800w" sizes="220px" alt="" width="800" height="600" loading="lazy" decoding="async" onerror="this.style.visibility=\'hidden\'">';
    var rot = tipo === 'bonus' ? 'Bônus ' + b.n + ' · ' + b.sub : b.sub;
    return '<a class="card' + (b.breve ? ' bloq' : ' feito') + '" href="#' + tipo + '/' + b.n + '"><div class="foto">' + foto + (b.breve ? '<span class="fita">Em breve</span>' : '') + '</div>' +
      '<div class="corpo"><h3>' + esc(b.tit) + '</h3><span class="sub">' + esc(rot) + '</span><div class="pe"><span class="acao">' + (b.breve ? 'Liberado em breve' : 'Abrir →') + '</span></div></div></a>';
  }
  function cards() { return LISTA.map(function (b) { return card('bonus', b); }).join(''); }
  function cardsExtras() { return EXTRAS.map(function (b) { return card('extra', b); }).join(''); }

  function abrir(tipo, n) {
    var lista = tipo === 'extra' ? EXTRAS : LISTA, b = lista.filter(function (x) { return x.n === +n; })[0], box = $('bonus-corpo');
    if (!b || !box) { location.hash = '#inicio'; return; }
    var capa = tipo === 'extra' ? '/assets/extras/capa-' + b.n + '.webp' : '/assets/bonus/capa-' + dois(b.n) + '.webp';
    var rotulo = tipo === 'extra' ? 'Extra da compra' : 'Bônus ' + b.n + ' de ' + LISTA.length;
    var aviso = tipo === 'extra'
      ? '<div class="b-breve"><span class="e">⏳</span><span><b>Liberado em breve</b>' + (desbloqueado(b) ? 'Você já tem este extra: ele aparece liberado aqui assim que ficar pronto.' : 'Se você adicionou este extra (ou o combo Leve todos) na compra, ele aparece liberado aqui no app assim que ficar pronto. Você não precisa fazer nada.') + '</span></div>'
      : '<div class="b-breve"><span class="e">⏳</span><span><b>Liberado em breve</b>Este bônus está sendo preparado e vai aparecer aqui no app. Você não precisa fazer nada: é só voltar e abrir.</span></div>';
    box.innerHTML = '<a class="b-voltar" href="#' + (tipo === 'extra' ? 'extras' : 'bonus') + '">' + ico('baixo') + (tipo === 'extra' ? 'Todos os extras' : 'Todos os bônus') + '</a>' +
      '<div class="b-cab"><img src="' + capa + '" alt="" width="240" height="320" onerror="this.remove()"><div><small>' + esc(rotulo) + '</small><h1>' + esc(b.tit) + '</h1><p>' + esc(b.sub) + '</p></div></div>' +
      aviso +
      (b.promete ? '<section class="bloco" style="margin-top:14px"><h3>O que vem neste bônus</h3><ul class="b-promete">' + b.promete.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></section>' : '') +
      '<img class="b-capa-g" src="' + capa + '" alt="Capa: ' + esc(b.tit) + '" loading="lazy">' +
      '<p class="b-nota" style="text-align:center">Dúvidas? Escreva para suportedigitalht@gmail.com</p>';
    window.scrollTo(0, 0);
  }

  return { LISTA: LISTA, EXTRAS: EXTRAS, ID_COMBO: ID_COMBO, desbloqueado: desbloqueado, cards: cards, cardsExtras: cardsExtras, abrir: abrir };
})();
