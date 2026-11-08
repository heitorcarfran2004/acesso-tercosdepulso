# 50 Projetos de Terços de Pulso — app de membros (PT-BR)

Entrega do produto **50 Projetos de Terços de Pulso**: apostila de 101 páginas (capa C10 + 50 modelos × 2:
ficha e passo a passo). Mesmo app do terço italiano (`apps/rosario-membros`), escolhido pelo Heitor como base em
08/11/2026, com a paleta madeira/dourado/marfim das capas.

    node servidor.cjs     # http://localhost:4262

No ar: **https://acesso-tercosdepulso.vercel.app** (repo `heitorcarfran2004/acesso-tercosdepulso`, deploy da Vercel a cada push).

**Login:** QUALQUER e-mail com formato válido entra (igual ao app italiano). Não consulta o Supabase.
**Suporte:** suportedigitalht@gmail.com (`CONTATO` no montador; o formulário abre o app de e-mail com a mensagem pronta).

## Como é montado

O `index.html` **não se edita à mão**: ele é gerado.

    node scripts/tpulso-app-arquivos.cjs           # tudo: 101 páginas webp, capas, login e ícones
    node scripts/tpulso-app-arquivos.cjs capas     # só capas (principal, 10 bônus, 4 extras), login e ícones
    node scripts/tpulso-app-montar.cjs             # referencia/guias.html -> index.html (confere sobras do app de origem)
    node scripts/tpulso-app-capturas.cjs           # capturas 390 px em capturas/ e erros de console

(os `scripts/` ficam no repo de trabalho "Visual St - Claude")

| no app | origem |
|---|---|
| `assets/livros/principal/pag-001.webp` | capa `entregaveis/tercos-de-pulso/capa/out/C10.png` |
| `pag-002…021` (modelos 1–10) | `entregaveis/tercos-artesanais/producao/paginas/pag-001…020.png` (a pág. 11 = `corr/006-p1.c3.png`) |
| `pag-022…101` (modelos 11–50) | `entregaveis/tercos-de-pulso/producao/out/NNN-p1/p2.png` |
| `pdf/50-Projetos-de-Tercos-de-Pulso.pdf` (28,9 MB, 101 págs.) | o mesmo PDF do checkout (CDN da Wiapy) |
| Índice, categorias e busca | `entregaveis/tercos-de-pulso/projetos.json` + títulos dos `conteudo/NNN.json` |
| Capas dos bônus | `entregaveis/tercos-de-pulso/bonus/bonus-NN-*.png` |
| Capas dos extras | `Downloads/Terço de Pulso/Order Bumps/<nome> - capa.png` |

- Modelo N = páginas 2N (ficha) e 2N+1 (passo a passo) do app; o app mostra a numeração impressa (pág. do app − 1).
- 4 abas: Início, Suporte, App, Perfil. Favoritos (estrela), página onde parou, perfil e sininho no `localStorage` por e-mail.
- Leitor com zoom (botão ou toque duplo), índice por categoria com filtro de favoritos, PDF.

## Bônus e extras (`bonus.js`, escrito à mão)

- **10 bônus:** todos "Liberado em breve" (conteúdo em produção; piloto do Bônus 1 aguardando o Heitor). Quando
  um ficar pronto, tire o `breve` e ligue o conteúdo (PDF em `pdf/` ou páginas).
- **Extras (order bumps):** Pescoço, Escapulários, Chaveiro e Carro, todos "Liberado em breve". A Entrega Expressa
  no WhatsApp não tem item no app.
- **Regra de liberação:** no topo do `bonus.js`, `ID_COMBO` (combo "Leve todos", R$ 16,90, libera os 4) e `ids` de
  cada extra (o Carro só vem pelo combo desde 08/11). Com o login aberto não há lista de compras
  (`window.COMPRAS` vazio); quando o acesso vier do webhook da Wiapy (modelo `apps/guias-membros`), basta preencher.
