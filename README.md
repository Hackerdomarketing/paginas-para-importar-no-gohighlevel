# Páginas para importar no GoHighLevel

Páginas HTML vestidas com a anatomia do ClickFunnels Classic, publicadas aqui (GitHub Pages) só para o importador do GoHighLevel conseguir baixá-las. Geradas pela skill `html-para-clickfunnels`.

Endereço público: `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/`

- `sondas/` — sete páginas-sonda da Fase 0 (A a D: mesmo conteúdo, quantidades diferentes da "roupa" do ClickFunnels; E: a Sonda A com as correções de cor e fonte descobertas na primeira importação real; F: laboratório em que cada elemento escreve peso, itálico, ícone de lista e altura de linha de um jeito diferente; G: o conversor já com as regras que a Sonda F revelou, mais um laboratório curto para a bolinha das listas)
- `paginas/<nome>/` — páginas convertidas, uma pasta por página: o `index.html` e a **ficha de importação** (`ficha-de-importacao.md` para ler, `.json` para o robô), que diz o ícone de cada lista da página para escolher no painel do editor depois de importar

Este repositório recebe apenas HTML, CSS e imagens. Nenhuma senha ou identificador de sessão entra aqui.

---

# 2026-09-17/18 — o conversor automático não dá conta do arranjo da página (e o que vem no lugar)

Tentativa: converter a página de upsell da Mentoria SLL (`upsell-mentoria-sll-v2.html`, projeto do Open Design
`1fe2cd3b-5ae4-49bd-a331-328d9398745d`) rodando o conversor da skill `html-para-clickfunnels` e corrigindo a skill
a cada defeito encontrado. Sete rodadas de conversão (v1 a v7). **Resultado: não chegou perto da original.**

## O que estava errado e o que foi corrigido na skill

Cada defeito abaixo foi encontrado olhando a página convertida no navegador, lado a lado com a original publicada
em `paginas/upsell-mentoria-sll-v2-original/`. Os três primeiros foram corrigidos e as correções ficam valendo.

1. **O conversor era cego para CSS Grid.** A decisão de "isto são colunas lado a lado" só olhava
   `flex-direction: row`; `display: grid` nunca era lido (a palavra `grid` aparecia uma única vez em todo o código
   do conversor, e mesmo assim era ele *escrevendo* uma grade, não lendo). Páginas do Open Design montam quase todo
   lado a lado com grade, então 32 das 36 colunas saíam com largura cheia, uma coisa embaixo da outra.
   **Corrigido:** `transformar_grades_em_colunas` na ponte lê `grid-template-columns` e reescreve como flex com as
   larguras proporcionais. As placas de PARE voltaram para as laterais e os cartões de três em três se alinharam.
2. **A linha não sabia desenhar moldura.** `abrir_linha` aceitava só identificador e espaçamento, enquanto a coluna
   aceitava fundo, borda, raio e sombra. Por isso um cartão com moldura *e* duas metades dentro não tinha como ser
   gerado: ou se perdia a moldura, ou se perdia o lado a lado. **Era engano meu ter chamado isso de limite do
   ClickFunnels** — o próprio `modelos/esqueleto-classic.html` traz uma `row` com `borderSolid border3px shadow0`.
   **Corrigido:** `abrir_linha` recebeu os mesmos parâmetros de moldura da coluna, e o tradutor passa a moldura do
   cartão para a linha quando o cartão tem uma linha dentro.
3. **Container com muitos filhos virava "linha".** As sete ofertas empilhadas eram tratadas como sete colunas
   irmãs, quebradas em blocos de quatro e achatadas antes de alguém olhar o que cada cartão tinha dentro.
   **Corrigido:** só vira linha quem tem de dois a quatro filhos; acima disso é pilha vertical.
4. **Fileiras de cinco caixas continuam empilhando.** O Classic vai até quatro colunas por linha, então
   `repeat(5, …)` é recusado e as cinco caixinhas verdes viram lista comum. **Em aberto.**

## Como a página ficou depois de tudo isso

| Trecho | Estado |
|---|---|
| Topo, barra de progresso, "ESPERE!", vídeo | fiel |
| Cupom de cashback e placas de PARE | fiel |
| Caixa de preço, Risco Zero | bom, com desvios de alinhamento |
| Pilha de sete ofertas | 2 certas, 5 desalinhadas e sem moldura |
| Zona de detalhes (sete cartões) | fraca: as imagens laterais somem, as caixas verdes viram lista, o cupom "VOCÊ GANHA" vira texto solto |

## Por que parar por aqui

O conversor **adivinha** a estrutura a partir de padrões de CSS. Quando o padrão não está no repertório dele, ele
erra — e cada correção destravava um grupo de blocos revelando outro caso logo adiante. É conserto de adivinhador,
não construção de página.

E a pergunta do Rafa fecha o assunto: se ele monta essa página à mão no editor do ClickFunnels e ela fica 100%
idêntica, então o formato dá conta — não existe limite de plataforma aqui. O que existe é diferença de método.
Montando à mão, se olha a página e se decide "isto é uma linha com duas colunas, a imagem vai nesta, o texto
naquela". O conversor tenta deduzir isso do CSS.

**Importante, para não criar expectativa errada:** o importador do GoHighLevel *lê* a estrutura do HTML, não a
conserta. O que está torto no arquivo continua torto depois de importado. A importação só melhora cor, fonte
(depois do Save no editor) e o ícone das listas (escolhido no painel).

## A forma que vai ser testada agora

Escrever a estrutura do ClickFunnels **à mão, seção por seção**, do jeito que se montaria dentro do editor:
olhar cada bloco da página original, decidir quantas linhas e colunas ele tem e onde vai cada elemento, em vez de
esperar que um algoritmo deduza isso do CSS.

O conversor continua no fluxo para o que ele acerta, que não é pouco e veio das sondas: endereço https absoluto das
imagens, as classes que sobrevivem ao importador, as cores que não viram cinza (`#ffffff` → `#fffffe`), o peso do
texto dentro de `<span>`, o ícone de cada lista na ficha de importação e o SEO. **O arranjo espacial passa a ser
decidido à mão; o resto continua automático.**

Material desta rodada: a original publicada em `paginas/upsell-mentoria-sll-v2-original/` e os recortes de
`.playwright-mcp/` (as imagens `orig-01` a `orig-24` são a página original vista bloco por bloco, e servem de
referência para montar a versão nova).

## Páginas reais do ClickFunnels baixadas para consulta (2026-09-18)

O Rafa baixou páginas de verdade do ClickFunnels, que ficam em
`/Volumes/Expansion/DOWNLOADS/us.sitesucker.mac.sitesucker/`. Elas valem mais que qualquer dedução: dá para abrir e
ver como o ClickFunnels monta cada bloco, em vez de adivinhar.

| Pasta | Versão |
|---|---|
| `summit.dotcomsecrets.com/registernow-1/index.html` | 1.0 (provável) |
| `www.marketingsecrets.com/backstage.html` | 2.0 |
| `www.funnelhackinglive.com/fhl2026.html` | 2.0 |
| `www.aisecretschallenge.com/register-b/…` | 2.0 |
| `www.onefunnelaway.com/index.html` | 2.0 (provável) |
| `www.sellingonline.com/index.html` | 2.0 (a pasta tem várias outras) |

**O 2.0 não muda a anatomia.** Contando as marcas estruturais de uma página 1.0 e de uma 2.0, aparece o mesmo
vocabulário nas duas: `row`, `col-md-N`, `elHeadline`, `elButton`, `col-inner`. O que a skill já gera serve para as
duas versões; não há um "formato 2.0" a aprender.

**Coluna desigual é rotina, não caso difícil.** As páginas reais usam `col-md-7` + `col-md-5`, `col-md-8` +
`col-md-4`, `col-md-2` + `col-md-10` à vontade. Molde tirado de `www.sellingonline.com` (uma linha, duas colunas
desiguais, cada uma com o seu `col-inner`):

```
row
  col-md-7 innerContent col_left
    col-inner
      elHeadlineWrapper
  col-md-5 innerContent col_right
    col-inner
```

É exatamente o que o cartão de oferta da Mentoria SLL precisa, e `abrir_coluna` já recebe a largura em doze avos
como parâmetro. Ou seja: a peça sempre esteve disponível — faltava decidir usá-la.

As seis pastas foram copiadas para `referencias-clickfunnels-reais/` dentro deste projeto (63 MB, 1.197 arquivos,
conferidos byte a byte). A pasta está no `.gitignore`: é conteúdo de terceiros, só para estudo, não publica.

### Escavação 1 — a cabeça (`<head>`) das seis páginas

| | 1.0 (`summit.dotcomsecrets`) | 2.0 (as outras cinco) |
|---|---|---|
| Tamanho da cabeça | 9 KB, um `<style>` | 200 a 310 KB, cinco ou seis `<style>` (o CSS da página vem embutido) |
| Folha de estilo | `../assets/lander.css` — **o mesmo `lander.css` que a skill usa** | `assets/projects/user_pages/user_pages-<hash>.css` + uma folha por recurso (`video-`, `checkout-v2-`, `countdown-v1-`, `rebilly-checkout-`) |
| `<html>` | `class="clickfunnels-com wf-proximanova-… wf-active"` (Web Font Loader) | `<html lang="en">` limpo |
| `<body>` | `data-affiliate-param="affiliate_id" data-show-progress="true"` | `<body>` limpo |
| Scripts | `../assets/userevents/application.js` | jQuery 3.5.1, jquery-cookie, lazysizes, fitvids, video.js (cdnjs) |
| Font Awesome | 5.9.0 | 5.15.0 |
| `<meta name="generator">` | nenhum | nenhum |
| Metas `cf:*` | nenhuma | nenhuma |

O que isso diz:

- **A "anatomia Classic" que a skill imita é a do 1.0.** `lander.css`, a classe `clickfunnels-com` no `<html>` e o
  `data-show-progress` no `<body>` são a assinatura dessa geração; `modelos/esqueleto-classic.html` da skill é isso.
- **O 2.0 troca a cabeça inteira, mas não o corpo.** A folha muda de nome (`user_pages-<hash>.css`), o CSS da página
  passa a vir embutido e chegam jQuery, lazysizes e video.js. O vocabulário do corpo (`row`, `col-md-N`, `col-inner`,
  `elHeadline`, `elButton`) é o mesmo — contado nas seis.
- **Para o importador do GoHighLevel a cabeça é indiferente**: a Sonda H mostrou que ele descarta o `<head>` inteiro.
  Logo a diferença 1.0 × 2.0 que importa está toda no corpo, e é lá que a escavação continua.
- As metas `cf:*` que o conversor escreve "de mentira" não existem em nenhuma página real das duas gerações. Não é
  motivo para tirar (as sondas é que dizem o que o importador exige), mas é bom saber que não são assinatura real.

### Escavação 2 — o corpo: a espinha é a mesma, o 2.0 tirou o estilo de dentro dela

Filhos diretos do `<body>`: **1.0** = `containerWrapper` + `nodoBadge` (selo "Powered by") + `otoloading` +
`fb-root` + `email_suggestion`; **2.0** = `payment-gateway-keys` (ou `rebilly-keys`) + `containerWrapper` +
`otoloading`. O `containerWrapper` é a página nas duas; `otoloading` é a cortina de carregamento nas duas.

Esqueleto de uma seção, lado a lado (tirado de `summit` e de `sellingonline`):

```
1.0                                                    2.0
div.containerWrapper                                   div.containerWrapper
  div.container containerModal noTopMargin               div.container fullContainer id-6Z-LLVQKN-7
      padding40-top … style="margin-top:100px;…"           (sem classe utilitária, sem style)
    div.containerInner ui-sortable                         div.containerInnerV2
      div.row bgCover noBorder borderSolid border3px         div.row id-6Z-LLVQKN-8
          shadow0 P0-top … style="padding:20px 40px;           (sem classe utilitária, sem style;
          background-color:…"                                   às vezes bgRepeat)
        div.col-md-6 innerContent col_left ui-resizable        div.col-md-4 innerContent col_left id-…
          div.col-inner bgCover noBorder borderSolid …           div.col-inner
            div.de elHeadlineWrapper ui-droppable                  div.elHeadlineWrapper id-6Z-r7KB5-23
                de-editable data-de-type="headline"                  (sem data-de-type, sem data-title)
                data-title="Headline"
```

O que isso diz:

- **A espinha é idêntica nas duas gerações:** `containerWrapper → container → (containerInner | containerInnerV2)
  → row → col-md-N → col-inner → el*Wrapper`. Quem sabe escrever uma, sabe escrever a outra.
- **No 1.0 o estilo mora no corpo.** A linha carrega a string longa de classes (`bgCover noBorder borderSolid
  border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin` — a mesma `CLASSES_DE_LINHA` da skill) e
  `style` inline com fundo e espaçamento. A seção carrega `padding40-top`, `noTopMargin` e `style`. **A linha real
  do 1.0 tem `background-color` inline** — confirma o conserto de `abrir_linha` (moldura na linha é normal).
- **No 2.0 o estilo saiu do corpo.** Cada nó estrutural ganhou uma classe `id-<hash>` e é só isso que ele tem; o
  visual inteiro mora nos 200–310 KB de CSS embutidos na cabeça, endereçando essas classes. `containerInner` virou
  `containerInnerV2`. Somem `data-de-type`, `data-title`, `de`, `ui-droppable`, `de-editable` (as marcas do editor).
- **Consequência para o importador (raciocínio, não sonda):** a Sonda H mostrou que o importador descarta o `<head>`.
  Uma página 2.0 importada perde, portanto, o estilo inteiro — sobra a estrutura pelada. O alvo certo para o que a
  skill gera continua sendo o jeito 1.0, com o estilo dentro do corpo, mesmo quando a página de origem é 2.0.
- **Corrigido na Escavação 6:** o 2.0 não tem `data-de-type`, mas tem o equivalente — `data-page-element="Headline/V1"`,
  `"Paragraph/V1"`, `"FlexContainer/V1"`… A identidade do elemento continua no HTML, só mudou de atributo. O que
  fica em aberto é se o importador lê um, o outro, ou as classes.
- Larguras de coluna vistas nas seis páginas: 12, 6+6, 4+4+4, 4+8, 8+4, 5+7, 7+5, 2+…, 3+…. Desigual é rotina.
- O dump sugere `elImageWrapper` dentro de `elImageWrapper` (três níveis) e `elHeadlineWrapper` contendo
  `elCountdown` no 2.0 — pode ser elemento-container novo do 2.0 ou artefato da leitura. **Conferir na tela.**

### Escavação 3 — a 1.0 na tela, seção por seção (`summit.dotcomsecrets`)

Mapa: 10 seções, 16.004 px de altura. Duas invisíveis: a 0 é o popup (`containerModal`) e uma linha `3+9`
"Featuring" tem `display: none !important` (desligada no editor, ficou no código). Cada seção abaixo foi vista
na tela e lida no código.

| Seção | Estrutura | Na tela |
|---|---|---|
| Barra do topo (80 px) | `fullContainer` fundo `#131313`, uma linha `4+8` | logo (`elImageWrapper`) à esquerda, menu (headline com links) à direita |
| Hero | seção com `background-image` (mosaico de rostos) + cor de véu `rgba(0,50,100,.11)`; linhas `col-md-12` com títulos empilhados | títulos grandes centralizados, o vídeo entrando por baixo |
| Vídeo | seção `data-title="videoSection"`; a linha tem `style="margin: -520px 0 0"` | **margem negativa é o truque 1.0 para o vídeo invadir o hero por cima** |
| Botão | `elButton` com `elButtonSub` | "Click Here To Register Now!" + "Gain FREE access…" — o subtexto que a skill já emite |
| Carta, linha 1 | `3+9` | foto pequena à esquerda, "From The Desk Of: Russell Brunson" à direita |
| Carta, linha 7 | `4+8` | desenho à esquerda, título "Page 1: here's what I did…" à direita |
| Palestrantes | `6+6` | **duas colunas, cada uma empilhando 17 cartões-imagem** |
| Seção 7, linha 2 | `4+8` | desenhos à esquerda, parágrafos longos à direita |
| Seção 7, linha 7 | `6+6` | **texto à esquerda, imagem à direita** — o lado invertido |
| Fotos (733 px) | uma linha `2+2+2+2+2+2` | **seis colunas `col-md-2`, cada uma com 5–6 fotos redondas uma sob a outra** |
| Rodapé | `fullContainer` fundo `#252525`, `col-md-12` | logo, isenção de responsabilidade, links |

O que isso ensina:

- **Imagem ao lado de texto, no mundo real 1.0, é `3+9`, `4+8` ou `6+6`.** Para inverter o lado (texto à
  esquerda, imagem à direita) não há mecanismo nenhum: só o conteúdo troca de coluna. É exatamente a alternância
  dos sete cartões de detalhe da Mentoria.
- **Grade de muitos itens = colunas que empilham, não várias linhas.** A fileira `2×6` é uma grade de 6×6 fotos
  feita com uma linha só; os 34 palestrantes são uma linha `6+6` com 17 itens por coluna. Uma linha por fileira de
  fotos não aparece em lugar nenhum.
- **Cinco em linha não existe.** Combinações vistas nas seis páginas: `12`, `6+6`, `7+5`, `5+7`, `4+8`, `8+4`,
  `3+9`, `4+4+4`, `2+10`, `2×6`. A grade é de 12 e cinco não divide 12 — esse sim é limite real de plataforma.
  Para as cinco caixinhas verdes da Mentoria (o `repeat(5, …)` que o conversor recusa) a tradução é `4+4+4`
  seguido de `6+6`, ou seis `col-md-2` com uma vazia.
- **Anatomia exata da linha `3+9`** (a que o card de oferta precisa), copiada do código:

  ```
  div.row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H
      style="padding-top:0; padding-bottom:0; margin:0" data-title="2 column row"
    div.innerContent col_left ui-resizable col-md-3  data-title="1st column"
      div.col-inner bgCover noBorder … style="padding: 0 10px"
        div.de elImageWrapper de-image-block elAlign_center elMargin0  data-de-type="img" data-title="image"
          img.elIMG.ximg
    div.innerContent col_right ui-resizable col-md-9  data-title="2nd column"
      div.col-inner … style="padding: 0 10px"
        div.de elHeadlineWrapper  style="margin-top:20px; font-family: Montserrat…"  data-de-type="headline"
          h1.ne.elHeadline.hsSize3.lh1.mfs_22.elBGStyle0.hsTextShadow0  style="text-align:left; font-size:50px; color:…"
  ```

  Detalhes que valem: a coluna leva `innerContent col_left|col_right`; o `col-inner` tem `padding: 0 10px`; a
  imagem é `div.elImageWrapper.de-image-block > img.elIMG.ximg`; o título carrega `lhN` (altura de linha) e
  **`mfs_NN` = tamanho da fonte no celular** (`mfs_22`, `mfs_18`), com `font-size`, `text-align` e `color` inline.
- O banner de cookies da página é o `osano.js` da cabeça — lixo de terceiro; some junto com o `<head>`.

### Escavação 4 — a 2.0 na tela e no CSS (`sellingonline`)

Mapa: 8 seções, 22.742 px. O caminho até a seção tem três camadas a mais que no 1.0:
`containerWrapper › elPageContentWrapper › elPageContent › pageRoot.id-… › container.fullContainer|wideContainer`.
A seção 0 é uma barra fixa (altura 0 no fluxo). A seção 4 sozinha tem 12.866 px e 32 linhas — a carta de vendas.

| Trecho | Estrutura | Na tela / no CSS |
|---|---|---|
| Barra do topo (80 px) | `fullContainer` fundo `#161616`, linha `4+8` | igual ao 1.0: logo \| menu |
| Hero (806 px) | `fullContainer` fundo preto + imagem, `col-md-12` | títulos empilhados |
| Depoimentos | linha `4+4+4`; em cada coluna um **container flex** com fundo branco, raio 12 e sombra; dentro, aspas, texto e um flex interno com foto + nome + estrelas | três cartões lado a lado |
| Carta, linha `7+5` | `col-md-7` texto (parágrafos + um flex "THE PROBLEM" com `border-left` e fundo tingido) \| `col-md-5` imagem | o "callout" da Mentoria (caixa roxa "POR EXEMPLO") é isso |
| Carta, `5+7` e `6+6` | imagem \| texto e texto \| imagem, alternando | a alternância dos cartões de detalhe |

**Como o 2.0 veste um nó — o princípio, confirmado no CSS da cabeça (166 KB):** cada `id-<hash>` tem uma regra
com o seletor duplicado para ganhar peso, e é só ali que o visual mora:

```
.id-6Z-r7KB5-10.id-6Z-r7KB5-10      { background: rgb(22,22,22); padding…; border-color… }        ← seção
.id-6Z-WkXYKy-23938.id-6Z-WkXYKy-23938 { width: 1050px; border-radius: 12px; … }                 ← linha
.id-6Z-mjnZrx-6.id-6Z-mjnZrx-6      { width:100%; border-radius:12px; flex-direction:column; gap:0; padding…; background… }  ← flex (cartão)
.id-6Z-WkXYKy-26497.id-6Z-WkXYKy-26497 .elHeadline { color: rgb(221,77,77); font-size: 1.69rem; line-height: 105%; … } ← texto
```

**Onde mora a moldura no 2.0** (censo na tela, `getComputedStyle`): seção 8/8 com fundo; **linha 20 de 57** com
fundo, 12 com raio, 12 com sombra, 9 com borda; **container flex 45 de 77** com fundo, 34 com raio, 16 com sombra;
**`col-inner` zero** (fundo, borda, raio); elementos zero. Ou seja: moldura vai na **linha** ou no **flex**, nunca
na coluna — no mundo real, "linha com moldura" é rotina (confirma o conserto de `abrir_linha` da skill).

**Peça nova do 2.0, sem par no 1.0: o container flex** (`elFlexNoWrap` 53×, `elFlexNoWrapMobile` 77×,
`elFlexWrap` 24× nesta página). Enfileira elementos na horizontal ou vertical (`flex-direction` no CSS), aninha
(flex › imagem + flex › imagem + flex › imagem = tira de três ícones), e carrega a moldura do cartão. O que o 1.0
fazia com `col-inner` com fundo, o 2.0 faz com flex. **O importador não foi testado com flex** — outra sonda.

**Imagens:** 1.0 = `img.elIMG.ximg` com `src` local; foto redonda = classe `el_media_theme3 img-circle` na
própria imagem. 2.0 = `img.elImage` com `src` remoto em `images.clickfunnels.com/cdn-cgi/image/width=…` (redimensiona
no CDN) ou `statics.myclickfunnels.com`, mais `loading="lazy"`, `srcset`, `sizes` e um `data-parent-container` em
JSON. O download local não trouxe essas imagens (por isso saem em branco sem rede) — não é falha de estrutura.

### Escavação 5 — inventário de elementos: o que cada geração tem

Contagem das classes `el*` nas seis páginas (leitor de HTML correto, não regex):

| | 1.0 (`summit`, 25 classes) | 2.0 (152–157 classes numa página com checkout) |
|---|---|---|
| Texto | **só `elHeadlineWrapper`** (63×). Não existe parágrafo nem subtítulo: todo texto é "headline" | **três elementos**: `elHeadlineWrapper`, `elSubheadlineWrapper` (88× no aisecrets), `elParagraphWrapper` (120× no sellingonline) |
| Botão | `elButtonWrapper › elButton elButtonMain elButtonFull elButtonBlock elButtonShadowFlatHighlight` + `elButtonSub` | `elButtonWrapper › elButton elButtonMain › elButtonText elButtonMainText` + `elButtonSub` + `elButtonSpinner` |
| Lista | `elBulletList elBulletListNew` + `elBullet` | `elBulletList elBulletLisNew` (erro de grafia da própria CF) + `elBulletListTextWrapper` |
| Imagem | `elImageWrapper de-image-block › img.elIMG.ximg` | `elImageWrapper de-image-block › img.elImage` |
| Vídeo | `elVideoWrapper › elVideoplaceholder › elVideo` | `elVideoWrapper de-video-block › elVideo` |
| Divisor | `elDivider elDividerInner`, `elSeperator` (erro de grafia) | `elDividerWrapper › elDivider` |
| HTML próprio | `elCustomJs`, `elCustomJSBg` | `elCustomHtmlJs › elCustomHtmlJsWidget › elCustomHtmlJsCodeWrapper › elCustomHtmlJsCode` |
| Só no 2.0 | — | `elFlexNoWrap`/`elFlexWrap` (container flex), `elProgressBar`, `elCountdown*`, `elModal*` (popup), `elCheckout*`/`elProductCard*` (checkout inteiro, ~90 classes), `elTypographyLink`, `elRadio*`, `elCheckbox*`, `elSelect*` |

O que isso diz para a skill:

- **Emitir todo texto como `headline` é fiel ao 1.0**, não uma gambiarra: o 1.0 não tem outro elemento de texto.
  A regra do guia ("nunca use o Text Block") continua certa para o alvo Classic.
- **A Mentoria tem barra de progresso, e o 2.0 tem `elProgressBar` nativo** — no 1.0 não existe. Hoje a conversão
  transformou a barra em imagem; se o importador aceitar `elProgressBar`, vira elemento editável. Sonda.
- **Listas existem nas duas gerações com anatomia diferente**; o `elBulletList` do 2.0 (17× no onefunnelaway) é o
  próximo a comparar com o que o importador faz com a bolinha (Sonda G).
- Os erros de grafia (`elSeperator`, `elBulletLisNew`) são da própria ClickFunnels — se a skill precisar casar
  essas classes, tem que casar com o erro.

### Escavação 6 — a anatomia de cada elemento, código lado a lado

**A identidade do elemento no 2.0 é `data-page-element`.** O 1.0 escreve `data-de-type="headline|img|button|list|
video|divider|customjs"` + `data-title`; o 2.0 escreve `data-page-element="Headline/V1"`, `"SubHeadline/V1"`,
`"Paragraph/V1"`, `"Image/V1"`, `"Button/V1"`, `"FlexContainer/V1"`, `"ProgressBar/V1"`, `"Countdown/V1"`,
`"IconNode"`, `"ContentEditableNode"`. Com o mesmo `/V1` de versão. (A Escavação 2 dizia "sem identidade" — estava
errada: o regex só procurava `data-de-type`.)

**Texto no 2.0** — três elementos, mesma anatomia: `div.el{Headline|Subheadline|Paragraph}Wrapper.id-…
[data-page-element="…/V1"] › h1.elHeadline | h2.elSubheadline | p.elParagraph [data-style-guide-headline="xl|m|s"
ou data-style-guide-content="m"] › span › span.ne.id-…[data-page-element="ContentEditableNode"]
[data-align-selector=".elHeadline"]`. O texto editável mora no `span.ne` mais interno; os tamanhos vêm de um
"style guide" (`xl`, `m`, `s`), não de `font-size` inline como no 1.0.

**Lista** — nas duas gerações o ícone de cada item é **`<i class="fa fa-check">`** na frente do texto:
1.0 `ul.ne.elBulletList.elBulletListNew.elBulletList2 › li[style="font-size:20px"] › i.fa.fa-fw.fa-check[style="color:…"]`;
2.0 `ul.ne.elBulletList.elBulletLisNew.elBulletList2 › span.ne[ContentEditableNode] › li.id-… › i.fa-fw.fa_icon.fa.fa-check
[data-page-element="IconNode"] + span.elBulletListTextWrapper`. **A Sonda F mostrou que o importador apaga `<i>`**
— logo uma lista real do ClickFunnels, das duas gerações, também perde o ícone ao importar. A ficha de importação
(escolher o ícone no painel) não é remendo: é o único caminho, e é o que a própria CF faz (o ícone é um nó próprio,
`IconNode`).

**Botão 1.0** — `div.de.elBTN.elAlign_center[data-de-type="button"] › a.elButton.elButtonSize1.elButtonColor1
.elButtonPadding2.elBtnVP_10… [style="color; background; font-size"] › span.elButtonMain (› i.fa_prepended.fa
.fa-angle-double-right) + span.elButtonSub.mfs_14[style="font-size:12px"]`. Ícone antes do texto = `i.fa_prepended`.

**Barra de progresso (só 2.0)** — `div.elProgressBar.id-…[data-page-element="ProgressBar/V1"] › p.progress-label
.hide + div.progress › div.progress-bar[style="width:66%"] › p.progress-label`. Bootstrap puro; a largura é o
`style` do `.progress-bar`. É o elemento que a barra "etapa 2 de 3" da Mentoria pediria.

**Countdown (só 2.0)** — `div.elCountdown[data-page-element="Countdown/V1"] › span.elCountdownRow › span
.elCountdownGroupDate + span.elCountdownGroupTime › span.elCountdownColumn / span.elCountdownAmount`. Depende de
script (`data-state-node-script-id`).

**Botão 2.0** — `div.elBTN.id-…[data-page-element="Button/V1"] › a.elButton[data-show-button-ids, data-hide-button-ids…]
› span.elButtonMain › i.fas.fa-spinner.fa-spin.elButtonSpinner.elButtonText + span.elButtonMainText.elButtonText ›
i.id-… «RESERVE YOUR SEAT»` + `span.elButtonSub`. O envoltório é `elBTN` nas duas gerações. **O texto do botão
2.0 mora dentro de um `<i>`** (usado como envoltório inline, não como itálico) — a tag que a Sonda F mostrou que o
importador apaga. Se isso valer para botão, um botão 2.0 real chega sem texto; a skill não usa `<i>` no botão.

### Escavação 7 — o vocabulário completo do 2.0 (`data-page-element`, cinco páginas)

| Nó | Valor | Total | Observação |
|---|---|---|---|
| texto editável | `ContentEditableNode` | 1002 | o `span.ne` mais interno de todo texto |
| parágrafo | `Paragraph/V1` | 451 | o texto corrido |
| coluna | `ColContainer/V1` | 385 | **até a estrutura é marcada** |
| título | `Headline/V1` | 350 | |
| container flex | `FlexContainer/V1` | 314 | cartão, tira, callout |
| linha | `RowContainer/V1` | 279 | |
| ícone | `IconNode` | 233 | o `<i class="fa …">` da lista, do botão, do parágrafo |
| imagem | `Image/V2` | 229 | única com `/V2` entre os básicos |
| subtítulo | `SubHeadline/V1` | 143 | |
| campo | `Input/V1` | 112 | |
| seção | `SectionContainer/V1` | 75 | |
| botão | `Button/V1` | 75 | |
| divisor | `Divider/V1` | 53 | |
| lista | `BulletList/V1` | 44 | |
| bloco reutilizável | `UniversalBlock/<número>` | 66 | bloco salvo pelo usuário e repetido (`/23549201`, `/23172072`, `/11331061`) |
| popup | `Modal/V1` + `ModalContainer/V1` | 24 | |
| HTML próprio | `CustomHtmlJs/V1` | 19 | 18 deles no fhl2026 |
| barra de progresso | `ProgressBar/V1` | 4 | fhl2026 e onefunnelaway |
| contagem regressiva | `Countdown/V1` | 3 | |
| vídeo | `Video/V1` | 4 | |
| checkout | `Checkout/V2` e ~30 `Checkout*/V1|V2`, `SelectBox/V2`, `Radio/V1`, `Checkbox/V1`, `Spinner/V1` | | só nas páginas com carrinho |

Leitura: no 2.0 a página inteira é uma árvore de nós tipados — seção, linha, coluna, flex, elemento, nó de texto,
nó de ícone — cada um com `data-page-element` e um `id-<hash>` que o CSS da cabeça veste. O 1.0 tipa só os
elementos (`data-de-type`) e veste tudo no próprio corpo.

### Escavação 8 — FAQ, rótulo lateral e outros padrões do `fhl2026` (2.0, 16 seções, 21.700 px)

- **Sanfona de FAQ não é elemento nativo, nem no 2.0.** A seção "Frequently Asked Questions" da página oficial da
  ClickFunnels é um título + **`CustomHtmlJs/V1`** com `div.fhlfaq` e uma `<link>` de estilo própria dentro do
  bloco. O que a skill faz com o `<details>` da Mentoria (virar blocos de título + parágrafo) é a saída honesta;
  a alternativa fiel é um bloco de HTML próprio, que o importador recebe como `customjs`.
- **Rótulo curto à esquerda, conteúdo à direita = linha `2+10`.** "DAY / ONE" (dois títulos empilhados na
  `col-md-2`) | data + título + parágrafo (`col-md-10`). A linha leva `bgCoverV2`. Serve para qualquer "etapa N |
  descrição", "dia N | programa", numeração lateral.
- Ícone no botão: `i.fa_prepended` antes do texto (1.0 e 2.0), `i.fa_apended` depois (2.0). Ambos `<i>`.
- A barra de navegação pode morar **dentro da seção do hero** (seção 0 do fhl: linhas `4+8 | 12`, 1.396 px, fundo
  `rgba(9,19,41,.9)` sobre imagem) — não precisa ser seção própria.
- Duas seções com altura 0 são popups/escondidas; os dois `elProgressBar` da página estão nelas (por isso não
  aparecem na tela).

### Escavação 9 — larguras e calhas, com número (`lander.css` do 1.0 + medição na tela do 2.0)

| Tipo de seção | Largura útil | De onde vem |
|---|---|---|
| `container` (comum) | **1170 px** em tela ≥1200; 970 em ≥992; 750 em ≥768; `padding 0 15px` | Bootstrap 3, `.container{width:…}` no `lander.css` |
| `wideContainer` | **1120 px** (`max-width`), `containerInner` com `padding 0 20px` | `lander.css` |
| `midWideContainer` | **960 px** (`max-width`), `containerInner` com `padding 0 20px` | `lander.css` |
| `fullContainer` | **100 %** da tela (1280 na medição) | medido no fhl2026 |
| `containerWrapper` | `min-width: 320px` | `lander.css` |

É a esse conjunto que o `--largura auto|mid|wide|full` do conversor corresponde (`auto` = `container` 1170,
`mid` = 960, `wide` = 1120, `full` = 100 %).

Coluna: no 1.0 `col-md-N` é o Bootstrap puro — `float:left`, largura em `%` (`col-md-6` = 50 %, `col-md-4` =
33,33 %…) e **calha de 15 px de cada lado**; `col-md-12` = 100 %. **No 2.0 a calha da coluna é 0** (medido:
`col-md-6` = 570 px sem padding) e o respiro foi para a linha (`row` com `padding: 20px 15px`). Quem monta à mão no
alvo 1.0 conta com os 15 px de calha; quem copia medidas do 2.0 precisa lembrar que lá a calha não existe.

`mfs_NN { font-size: NNpx !important }` (de `mfs_10` em diante) existe no `lander.css` dentro da media query de
celular — é o tamanho de fonte no celular que o título carrega junto de `lhN` e `hsSizeN`.

**Bug achado e corrigido na skill (2026-09-18):** `_classe_de_largura` em `traduzir_esqueleto_para_classic.py`
devolvia `midContainer` para seções estreitas e para `--largura mid` — classe que não existe no `lander.css`; a
de 960 px chama `midWideContainer`. Na prática a seção "estreita" saía na largura padrão de 1170 px do Bootstrap.
Corrigido para `midWideContainer` (testado: `--largura mid` passa a emitir 11 seções `midWideContainer`).
Sobrou `midContainer` no molde do popup (`gerador_html_classic.py:750`, `modelos/esqueleto-classic.html:39`) e nas
sete sondas — inerte (classe sem CSS, e as sondas importaram assim); deixado como está de propósito, para não
mexer em código já validado no importador. O popup real do 1.0 (`summit`) não tem classe de largura nenhuma.

Para completar o quadro das outras duas páginas 2.0: **`aisecrets`** (6 seções visíveis, 6.300 px) é uma página
de registro curta — corpo em `wideContainer` com **cinco linhas `7+5` seguidas** (o programa dia a dia, imagem \|
texto repetido), `4+4+4`, e o `Countdown/V1` ("0 Days 00 Hours : 00 Minutes : 00 Seconds", quatro colunas, depende
de script — não sobrevive à importação). **`marketingsecrets`** (`backstage`) é página de checkout: ~90 classes
`elCheckout*`/`elProductCard*`, `SelectBox/V2`, `Radio`, `Checkbox`, `Modal` — inventariada no código, sem passagem
visual, porque nada disso tem par no importador nem na Mentoria.

### Escavação 10 — `onefunnelaway` (2.0, 20 seções, 21.765 px): a carta de vendas típica

- **Corpo da carta em `wideContainer` (1120 px)**, quase todas as seções; `fullContainer` só na barra fixa, no
  aviso legal e no rodapé; `midWideContainer` (960) no popup de cadastro. É o padrão de carta de vendas da
  ClickFunnels: conteúdo em 1120, cabeçalho e rodapé de ponta a ponta.
- Linhas: `7+5`, `5+7`, `4+8`, `4+4+4`, `6+6` — o mesmo repertório; a seção de bônus alterna `4+8 | 5+7 | 7+5 | 5+7`.
- **Lista na tela** (`getComputedStyle`): `li { list-style-type: none; padding-left: 0 }`, e o ícone `<i>` na frente
  do texto é **Font Awesome 5 Free**, 25 px de largura, cor `rgb(28,188,255)` dada pelo CSS. É a mesma fonte
  (`"Font Awesome 5 Free"`) que a grade de ícones do GoHighLevel usa e que o `li::marker` da lista importada recebe
  (Sonda G) — as duas plataformas desenham a bolinha com a mesma fonte, só que a CF por `<i>` e o GHL por `::marker`.
- As duas `elProgressBar` estão no popup (altura 0): `.progress-bar` com `width: 88%` inline e a mesma cor
  `rgb(28,188,255)` da marca — a cor vem do CSS por `id-…`, a largura vem inline.

## Síntese — a Mentoria SLL bloco a bloco, com a estrutura real do ClickFunnels para cada um

É a resposta à pergunta "o que estava nos atrapalhando de clonar 100 %": não era limite da plataforma, era não
saber qual peça usar. Depois de ver as seis páginas reais, cada bloco da Mentoria tem um par no mundo real
(alvo = anatomia 1.0, que é a que o importador lê; onde só o 2.0 tem a peça, está dito).

| Bloco da Mentoria | Estrutura real do ClickFunnels | Visto em |
|---|---|---|
| Barra do topo: logo \| barra de progresso | seção `fullContainer` escura, linha `4+8` | summit s1, sellingonline s1 |
| Barra "etapa 2 de 3" | **não existe no 1.0**; 2.0 tem `ProgressBar/V1` (`div.progress › div.progress-bar[style=width:66%]`). Enquanto o importador não for testado com ele: imagem | fhl, onefunnelaway |
| "ESPERE!" + headline + subtítulo | `col-md-12` com `elHeadlineWrapper` empilhados, `hsSizeN` + `mfs_NN` + `lhN` | summit hero |
| Vídeo com capa | `elVideoWrapper` (vídeo real) — ou imagem clicável; para invadir o bloco de cima, linha com `margin-top` negativo | summit videoSection |
| Cupom de cashback | `elImageWrapper` em `col-md-12` | — |
| Banner com placas de PARE nas laterais | linha `2+8+2` (soma 12; as páginas reais usam `4+4+4`, `2+10`) | fhl s9 (`2+10`) |
| Pilha de 7 ofertas (miniatura \| texto, com moldura) | **uma linha `3+9` por oferta, com a moldura na linha** (`background-color`, borda e raio no `style` da `row`) | summit carta linha 1; moldura em linha: 20 de 57 no sellingonline |
| Caixa de preço roxa | seção ou linha com fundo (degradê no `style`), lista `elBulletList` (ícone pela ficha), `elButton` + `elButtonSub`, botão de recusa = segundo `elButton` | summit, sellingonline |
| RISCO ZERO (caixa verde tracejada) | linha com `borderDashed` + fundo (`abrir_linha` já aceita `dashed`) | — |
| Carta: foto da Pri \| texto | `3+9` ou `4+8` | summit carta linha 1 e 7 |
| Nuvem de dúvidas flutuantes | animação morre na importação: imagem | — |
| Print do WhatsApp \| texto | `6+6` ou `5+7` (imagem à direita = imagem na segunda coluna) | summit s7 linha 7 |
| DEMANDA / LUCRO / MOMENTO | `4+4+4`, cada `col-inner` com fundo, borda e raio | sellingonline depoimentos |
| 7 cartões de detalhe alternando | cada cartão: linha `12` (eyebrow + título + subtítulo + `elDivider`) e linha `6+6`/`5+7`/`7+5` com imagem e texto **trocando de coluna** a cada cartão | sellingonline carta (`5+7 … 7+5 … 5+7`), summit s7 |
| 5 caixinhas verdes | **cinco em linha não existe** (grade de 12): `4+4+4` + `6+6`, ou seis `col-md-2` com uma vazia | — |
| Callout roxo "POR EXEMPLO" | `col-inner` (ou linha) com fundo tingido + borda esquerda | sellingonline "THE PROBLEM" (flex no 2.0) |
| Bilhete "VOCÊ GANHA" | imagem numa linha `8+4`, na `col-md-4` da direita | — |
| "AQUI E AGORA" (fecho escuro) | `fullContainer` com fundo escuro + imagem, títulos `col-md-12` | sellingonline hero |
| Garantia (foto + selo) e caixa "Rolou até aqui?" | imagem + linha tracejada com fundo | — |
| FAQ em sanfona | **não há sanfona nativa nem no 2.0**: `CustomHtmlJs` (bloco de HTML próprio) ou título + parágrafo por pergunta | fhl s14 |
| Tarja vermelha "última chance" | `fullContainer` com degradê no `style` | — |
| Rodapé | `fullContainer` escuro, `col-md-12`, logo + texto pequeno + links | summit s9, onefunnelaway s18 |

Regras gerais que saíram das seis páginas:

1. **A moldura vai na linha** (ou no `col-inner`), nunca é impedimento para ter colunas dentro.
2. **Imagem de um lado, texto do outro** é `3+9`, `4+8`, `5+7` ou `6+6`; inverter o lado é trocar o conteúdo de
   coluna.
3. **Grade de muitos itens** é coluna que empilha, não linha por fileira.
4. **Cinco em linha não existe.** Combinações reais: `12`, `6+6`, `7+5`, `5+7`, `4+8`, `8+4`, `3+9`, `4+4+4`,
   `2+10`, `2×6`.
5. **Largura:** carta de vendas em `wideContainer` (1120); cabeçalho, rodapé e faixas de impacto em
   `fullContainer`; popup em `midWideContainer` (960).
6. **O que anima ou se sobrepõe** (barra listrada, dúvidas flutuando, play sobre a capa) vira imagem — ou margem
   negativa quando é só sobreposição.
7. **Ícone de lista é `<i class="fa fa-check">` nas duas gerações e o importador apaga `<i>`**: o ícone se escolhe
   no painel (ficha de importação). Não há atalho.

O que ainda pede sonda no GoHighLevel: `ProgressBar/V1`, `elFlexNoWrap`, `data-page-element` (2.0) no lugar de
`data-de-type` (1.0), e se o `<i>` que embrulha o texto do botão 2.0 some ao importar.

---


# Guia: importar as páginas-sonda no GoHighLevel (Fase 0)

Objetivo desta rodada: descobrir **quais marcas o importador do GoHighLevel exige** para reconhecer uma página como ClickFunnels. São páginas com o mesmo conteúdo; cada uma veste uma quantidade diferente da "roupa" do ClickFunnels. Importando todas, a resposta aparece sozinha.

> **Atualização de 2026-09-08 (madrugada):** as Sondas A, E e F já foram importadas. A Sonda F respondeu tudo: o peso só sobrevive escrito num `<span>` dentro do texto, o itálico só sobrevive como `<em>`, o ícone da lista só sobrevive como desenho SVG e, da altura de linha, só a classe vale. O conversor já escreve tudo desse jeito. A **Sonda G** é a prova final: o mesmo conteúdo da Sonda E gerado pelo conversor corrigido, mais um laboratório curto para a bolinha que o GoHighLevel põe em toda lista. Se você só vai fazer um teste agora, faça a Sonda G (veja a seção "Resultado da Sonda F").
>
> **Atualização de 2026-09-09:** a Sonda G respondeu a bolinha da lista. A saída é o ícone nativo da lista, escolhido no painel do editor depois de importar (Geral → Ícone → busca → escolher → Save). O conversor passou a emitir cada lista limpa e a gravar o ícone de cada uma numa ficha de importação ao lado da página. Detalhes na seção "Resultado da Sonda G".

Tempo estimado: 15 minutos. Você vai precisar estar logado no painel `https://app.hackfunnels.com.br`.

## Os endereços (copie e cole um por vez)

| Sonda | O que ela tem | Endereço |
|---|---|---|
| A | Tudo do ClickFunnels (metas, classe, scripts, estilo nativo, estrutura) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-a-classic-completo.html` |
| B | Só a estrutura do corpo + estilo nativo | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-b-classic-so-estrutura.html` |
| C | Página comum, sem nada do ClickFunnels (controle) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-c-html-comum.html` |
| D | Estrutura do corpo + estilo em cópia local (nenhum endereço do ClickFunnels no código) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-d-classic-com-folha-de-estilo-local.html` |
| E | A Sonda A com as correções de cor e fonte (já importada) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-e-classic-completo-com-correcoes-de-fidelidade.html` |
| F | Laboratório de peso, itálico, ícone de lista e altura de linha (já importada) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-f-variantes-de-peso-italico-icone-e-altura-de-linha.html` |
| **G** | **O conversor já com as regras da Sonda F, mais um laboratório curto (a que importa agora)** | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-g-conversor-com-as-regras-da-sonda-f.html` |

Lista com todos os links clicáveis: `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/`

## Resultado da Sonda A (2026-09-08) e o que a Sonda E corrige

A Sonda A importou com todos os elementos editáveis (título, subtítulo, parágrafo, imagem, lista, botão, faixa com duas colunas, rodapé). Comparando a página publicada pelo GoHighLevel com a original, apareceram quatro diferenças, todas causadas pelo jeito como o importador reescreve o código:

| O que mudou | Por quê | Como a Sonda E corrige |
|---|---|---|
| Texto do botão e títulos das colunas ficaram cinza em vez de brancos | O importador troca cores que têm nome em CSS (branco puro `#ffffff` = "white") por um apelido de cor (`--White`) que ele nunca define. Sem definição, o navegador cai no cinza. | Toda cor com nome é empurrada um tiquinho (branco `#ffffff` vira `#fffffe`, preto `#000000` vira `#000001`). O olho não vê diferença e o importador passa a tratar como cor personalizada, que ele guarda direito. |
| A fonte virou Lato | O importador só aproveita a fonte de título (`data-font-fam`); a fonte do texto corrido ele não lê e usa a padrão dele. | Cada título, parágrafo, lista e botão leva a própria fonte escrita nele (Open Sans na Sonda E). |
| Parágrafos ficaram em negrito | Texto sem peso declarado recebe do importador o peso `heavy`, que não existe em CSS e o navegador entende como negrito. | Todo texto leva o peso escrito por extenso em número (400 normal, 600 no botão, 700 nos títulos). |
| Os ícones de "check" da lista sumiram (viraram bolinhas) | O importador apaga a tag `<i>` do ícone. | A Sonda E traz três listas iguais, cada uma escrevendo o ícone de um jeito diferente (`fa fa-check`, `fas fa-check`, `fa fa-fw fa-check`). Se alguma mantiver o check, o conversor passa a usar esse jeito. Se nenhuma mantiver, é limite do importador e o ícone se ajusta no editor. |

**Na Sonda E, o que conferir depois de importar** (abra a etapa em "Edit page" e depois "Preview"):

1. O texto dentro do botão azul está **branco**?
2. Os títulos das duas colunas na faixa escura estão **brancos**?
3. A fonte é a **Open Sans** (letras redondinhas) e não a Lato?
4. Os parágrafos estão em peso **normal** (só os títulos em negrito)?
5. Das **três listas**, qual mostra o ícone de check verde: a Lista 1, a 2, a 3, mais de uma ou nenhuma?

## Resultado da Sonda E (2026-09-08, noite)

A Sonda E foi importada, aberta no editor, salva e publicada em `https://hackersdomarketing.com/sonda-e-page-4103`. Comparando com a original:

| O que conferimos | Resultado | Explicação |
|---|---|---|
| Texto do botão e títulos das colunas brancos | **Certo** | Empurrar o branco para `#fffffe` funcionou: o importador guarda como cor personalizada. |
| Fonte Open Sans | **Certo** | Escrever a fonte em cada elemento funcionou. |
| Parágrafos em peso normal | **Errado: tudo em negrito** | O importador ignora o peso escrito e dá a todo texto (títulos, parágrafos, rodapé) o peso `heavy`, que ao salvar vira 900, o mais pesado que existe. Só a lista escapa (fica sem peso) e o botão vira 700. |
| Ícone de check nas listas | **Errado: sumiu nas três** | O importador apaga a tag `<i>` em qualquer grafia. A lista chega sem nenhum ícone definido. |
| Itálico | **Errado: sumiu** | A tag `<i>` também é apagada dentro do texto. Só sobrevivem `<a>`, `<span>` e `<strong>`. |
| Altura de linha | Ficou vazia nos parágrafos | A classe `lh5` do ClickFunnels não existe na folha de estilo; o importador escreve `line-height:` sem valor. |

**Descoberta importante sobre publicar:** uma página importada só ganha as cores e fontes de verdade **depois de ser aberta no editor e salva**. A Sonda A, publicada direto sem salvar, aparece sem estilo nenhum (letra Times, tudo preto, bolinhas comuns, botão sem cor). Regra: **importar → abrir no editor (Edit page) → escolher os ícones das listas → preencher o SEO → clicar em Save → só então Publish**.

A **Sonda F** foi uma página de laboratório: cada trecho trazia uma etiqueta entre colchetes (`[F-P3]`, `[F-C6]`…) e escrevia a mesma coisa de um jeito diferente. Importada, salva e publicada em `https://hackersdomarketing.com/sonda-f-page`, ela respondeu o que o importador mantém.

## Resultado da Sonda F (2026-09-08, madrugada) e o que a Sonda G testa

| O que testamos | Vencedor (o que o importador mantém) | O que ele apaga |
|---|---|---|
| Peso do texto (títulos e parágrafos) | Só o peso escrito num `<span style="font-weight: 400">` **dentro** do texto. O elemento continua recebendo `heavy` por fora, mas o span por dentro vence. `<b>` vira `<strong>` e sai em negrito máximo. | O peso escrito no elemento, no wrapper, em `bold_style_`, em `data-bold`, em `<p>`. O elemento "Text Block" some inteiro. |
| Itálico e sublinhado | `<em>` e `<u>` sobrevivem dentro de parágrafos, assim como `<strong>`, `<span style>` e `<a>`. | A tag `<i>`, em qualquer lugar. |
| Altura de linha | Só a classe do ClickFunnels conta (`lh2` = 1,5, `lh4` = 1,3, `lh6` = 1,4, `lh3` = normal). | `lh5` (não existe) vira vazio; `line-height` escrito no bloco é ignorado. |
| Ícone de check da lista | O desenho SVG escrito dentro do item sobrevive com a cor (`fill`). A imagem `<img>` também sobrevive, mas sem ser copiada para o GoHighLevel. O `✓` em texto sobrevive, mas preto: o `<span>` que dava a cor some. | `<i>` e `<span>` com classe de ícone somem; `<em>`/`<strong>` com classe ficam, mas vazios (o GoHighLevel não tem a regra do desenho do Font Awesome). Atributos do `<li>` somem. |
| Fonte da página sem aspas | `--contentfont: 'Open Sans'` limpo. Virou padrão do conversor. | — |
| Bolinha da lista | Resolvido na Sonda G, mas **dentro do editor**: o ícone nativo da lista (painel Geral → Ícone) troca a bolinha pelo desenho escolhido e sobrevive à edição do texto. Fora do editor, só a lista escrita como **parágrafo** escapa. | O `list-style-type: none` no `<ul>` e no `<li>`: o importador apaga os dois e o CSS dele força `li{list-style-type: disc}` em todo elemento de lista. Nenhum desenho escrito dentro do item apaga a bolinha. |

Tudo isso já está fixado no conversor: peso em `<span>`, `<i>` vira `<em>`, classes reais de altura de linha, fonte sem aspas, e a lista sai limpa com o ícone anotado na ficha de importação.

A **Sonda G** é o conteúdo da Sonda E escrito pelo conversor corrigido (título, subtítulo, parágrafo com negrito e itálico, imagem, lista, botão, duas colunas, rodapé), mais uma seção "Laboratório da Sonda G" com etiquetas `[G-…]`:

| Etiqueta | O que testa |
|---|---|
| `G-L1` | A lista padrão do conversor: check em SVG e `list-style-type: none` no `<ul>` e no `<li>` (tenta apagar a bolinha) |
| `G-L2` | O check como letra da fonte Font Awesome que o GoHighLevel carrega, dentro de um `<strong class="fas">` |
| `G-L3` | A lista escrita como parágrafo, um item por linha (a rota reserva `--listas-como-paragrafos`) |
| `G-L4` | Controle: SVG em pixels sem `list-style-type: none` (aqui a bolinha deve aparecer) |
| `G-L5` | Lista com estrela, seta, negrito, itálico e link dentro dos itens |
| `G-S1` | Parágrafo com `line-height: 1.9em` escrito no `<span>` (o span alarga a linha?) |
| `G-S2` | Parágrafo pelo caminho normal com negrito, itálico, sublinhado, cor e link no meio da frase |
| `G-S3` | Parágrafo com peso 300 (leve) no `<span>` |

**Resultado da Sonda G** (importada em 2026-09-08 e publicada em `hackersdomarketing.com/sonda-g-page`):

| Etiqueta | Resultado |
|---|---|
| `G-L1`, `G-L2`, `G-L4`, `G-L5` | Check, estrela, seta, negrito, itálico e link sobrevivem, mas **com a bolinha** do lado: o importador apaga o `list-style-type: none` e o CSS dele força `disc` em toda lista. O check em letra do Font Awesome (`G-L2`) aparece, preto. |
| `G-L3` | **Sem bolinha.** Única rota que escapa da bolinha sem passar pelo editor, mas não é mais uma lista: virou a rota reserva `--listas-como-paragrafos`. |
| `G-S1` | O `line-height: 1.9em` escrito no `<span>` sobrevive: dá para alargar a linha além das classes `lh…`. |
| `G-S2` | Negrito, itálico, sublinhado, cor e link no meio da frase sobrevivem. |
| `G-S3` | Peso 300 (leve) no `<span>` sobrevive. |

**Saída da bolinha, confirmada no mesmo dia (19:13):** toda lista importada tem, no painel da direita do editor, aba **"Geral"**, um campo chamado **"Ícone"**. Clicando nele abre uma grade de desenhos com uma busca em cima. Escolhendo um desenho ali e clicando em **"Save"**, o CSS da página publicada passa a ser `li{list-style-type: "<o desenho>"}` com `li::marker{font-family:"Font Awesome 5 Free"}`: a bolinha some, o desenho aparece no lugar dela, e **isso sobrevive quando você edita o texto da lista**.

Por isso o padrão do conversor mudou: cada lista sai como lista de verdade e **limpa**, e o nome do ícone vai numa **ficha de importação** ao lado da página. Depois de importar, escolha o ícone de cada lista no painel: clique na lista no meio da tela, no painel da direita abra a aba **"Geral"**, clique no campo **"Ícone"**, digite o nome que está na ficha, clique no desenho e depois em **"Save"** no canto superior direito. A grade tem 1458 desenhos e mostra só 100 de cada vez com a busca vazia, então sempre digite o nome. A ficha numera as listas pela ordem em que aparecem: compare o trecho `primeiro_item` dela com o texto na tela antes de aplicar.

**Editor × página publicada:** dentro do editor do GoHighLevel os títulos aparecem todos em negrito e os checks e estrelas não aparecem, mesmo depois de salvar e recarregar; a página publicada mostra tudo certo. Motivo: o importador escreve `font-weight: heavy` (valor que não existe em CSS) em cada elemento, o editor desenha isso como negrito, mas o navegador ignora e obedece ao `<span>` de dentro; e a caixa de texto do editor não desenha o SVG nem o glifo, embora os guarde no modelo da página. Regra prática: confira sempre na página publicada, não no editor. **Testado em 2026-09-08:** reescrever no editor um texto que tinha desenho dentro apaga os desenhos daquele elemento. O ícone nativo da lista não sofre disso: ele mora numa configuração do elemento, não no texto.

## Antes de começar: abrir a aba "Rede" do navegador

A aba "Rede" [Network: uma janela do Chrome que mostra cada pedido que a página faz para o servidor, como um extrato bancário das conversas do site] é o que nos permite ler a mensagem de erro de verdade quando uma importação falha, em vez de só "algo deu errado".

**Passo 1:** Abra o Chrome e entre em `https://app.hackfunnels.com.br`. Faça login normalmente.

**Passo 2:** No teclado, aperte `Command` + `Option` + `I` (as três teclas juntas). Vai abrir um painel cinza grudado na lateral direita ou embaixo da página, cheio de texto pequeno. Esse painel se chama "Ferramentas do desenvolvedor".

**Passo 3:** No topo desse painel há abas: "Elements", "Console", "Sources", "Network"… Clique em **"Network"** (ou "Rede", se estiver em português). Vai aparecer uma lista vazia que começa a encher conforme você clica nas coisas.

**Passo 4:** Logo abaixo das abas há um campo de busca com uma lupa ou a palavra "Filter". Clique nele e digite `funnel`. Assim a lista só mostra os pedidos que interessam.

Deixe esse painel aberto o tempo todo. Pode diminuir a largura dele arrastando a borda.

## Criar o funil de teste

**Passo 5:** No menu da esquerda do painel, clique em **"Sites"** (ícone de um monitor/janela). Vai abrir uma tela com abas no topo: "Websites", "Funnels", "Stores", "Forms"…

**Passo 6:** Clique na aba **"Funnels"**. Vai aparecer a lista dos seus funis.

**Passo 7:** No canto superior direito, clique no botão azul **"+ New Funnel"**. Vai abrir uma janelinha pedindo um nome.

**Passo 8:** Digite `Teste de importação` e confirme (botão "Create Funnel" ou "Save"). Vai abrir a tela do funil, ainda vazia, com uma lista de etapas à esquerda.

## Importar a Sonda A

**Passo 9:** Dentro do funil, clique em **"+ Add new step"** (botão no alto da coluna de etapas, à esquerda). Vai abrir uma janela com campos.

**Passo 10:** Nessa janela:
- No campo **"Page name"** (nome da página), digite `Sonda A`.
- O campo **"Path"** (caminho) preenche sozinho; pode deixar.
- Procure o campo chamado **"Clickfunnels link"** (às vezes fica escondido atrás de uma opção "Import from ClickFunnels"; se for o caso, clique nela primeiro). Cole o endereço da Sonda A da tabela lá de cima.
- Se aparecer uma caixinha de confirmação [checkbox: um quadradinho para marcar], marque.

**Passo 11:** Clique no botão azul **"Create funnel step"**. Vai aparecer um aviso de "importando…" e depois uma destas três coisas:

1. **Deu certo:** a etapa "Sonda A" aparece na lista e, ao clicar em "Edit page" (editar página), o editor abre mostrando o título, o subtítulo, o parágrafo, a imagem azul "Imagem de teste", a lista com três itens, o botão, uma faixa escura com duas colunas e o rodapé. **Anote: "A importou com elementos".**
2. **Importou vazia:** a etapa aparece mas o editor abre em branco ou com um único bloco. **Anote: "A importou vazia".**
3. **Erro:** uma mensagem vermelha aparece. Vá até a aba "Network", procure na lista a linha que se chama **`create-step`** (ou `cf-download-url`, se só ela apareceu), clique nela, e no painel que abre à direita clique na aba **"Response"**. Selecione tudo o que está escrito ali (`Command` + `A`), copie (`Command` + `C`) e me mande. **Anote: "A deu erro" + o texto copiado.**

**Passo 12:** Repita os passos 9, 10 e 11 para a **Sonda G** (a mais importante agora; A, E e F já foram feitas) e, se sobrar tempo, para a **Sonda B**, depois **Sonda C**, depois **Sonda D**, sempre no mesmo funil "Teste de importação". Uma por vez: o importador não aceita várias juntas.

**Passo 13:** Com a etapa criada, clique em **"Edit page"** (botão azul, canto superior direito) e espere o editor abrir. Ele demora alguns segundos: primeiro a tela fica cinza, depois a página aparece no meio com uma barra de ferramentas no alto.

**Passo 14 — preencher o SEO (o importador apagou):** o GoHighLevel joga fora a cabeça da página inteira quando importa. Título da aba, descrição do Google e imagem do WhatsApp chegam vazios, sempre. Os valores certos estão na ficha de importação da página (`ficha-de-importacao.md`, na mesma pasta do `index.html`), na seção "SEO: título, descrição e imagem de compartilhamento".

- Na barra de ferramentas cinza do alto, procure o desenho de uma **folha de papel com uma lupa** em cima. Passe o mouse nele e vai aparecer a etiqueta **"SEO e otimização de busca por IA"**. Clique.
- Abre um painel do lado **ESQUERDO** com o título "SEO & otimização de busca com IA". Dentro dele há faixas que abrem e fecham: Pré-visualizar, Conteúdo, Palavras-chave, Autor, Imagens, Links e tags, Idioma, Marcação de esquema.
- Clique na faixa **"Conteúdo"** (a segunda, com uma bolinha laranja escrita 3 do lado). Ela abre com um campo de uma linha escrito **"Título"** e uma caixa maior escrita **"Descrição"**. Cole neles o que a ficha manda.
- Clique na faixa **"Imagens"**. Aparece um campo escrito **"Imagens"** com um botãozinho de escolher imagem. Cole ali o endereço da imagem de compartilhamento (se a ficha disser "não tinha", pule).

**Atenção — o lugar errado:** na lista de etapas do funil existe uma engrenagem com **"Editar detalhes da página"**. Ela **não** é o SEO: só tem "Nome" e "Caminho". O SEO mora unicamente dentro do editor, na folha com lupa.

**Passo 15:** Clique no desenho de **disquete** (salvar) no canto superior direito e depois no botão azul **"Publicar"** ao lado. Sem esse Save, a página publicada sai sem cor e sem fonte — e sem ele o SEO também não gruda.

## O que me mandar no fim

Uma mensagem assim (pode ser áudio):

```
Sonda A: importou com elementos / importou vazia / deu erro (texto do erro)
Sonda B: …
Sonda C: …
Sonda D: …
Sonda E: botão branco? sim/não · títulos das colunas brancos? sim/não · fonte Open Sans? sim/não · parágrafos normais? sim/não · lista com check: 1 / 2 / 3 / nenhuma
Sonda F: já feita (hackersdomarketing.com/sonda-f-page)
Sonda G: endereço publicado (ou o endereço do editor aberto)
```

Se puder, tire um print do editor aberto com a Sonda A (a que mais provavelmente funciona) e mande junto.

## Como interpretar (eu faço isso, mas para você acompanhar)

| Resultado | O que significa |
|---|---|
| C importou com elementos | O GoHighLevel importa HTML comum. O conversor nem é necessário. |
| B ou D importou, A também | Basta a estrutura do corpo. Metas e scripts do ClickFunnels são dispensáveis. |
| D falhou, B importou | O importador procura o endereço `app.clickfunnels.com` no código (só a referência ao estilo nativo resolve). |
| Só A importou | O importador exige as metas `cf:*` e/ou os scripts. O conversor já gera tudo isso por padrão. |
| Nenhuma importou | O importador exige alguma marca que ainda não vimos. A resposta da aba "Network" vai dizer qual. |
| E ficou igual à original | As quatro correções funcionam e o conversor já gera páginas fiéis. |
| E ainda tem cinza, Lato ou negrito | O importador tem mais uma regra escondida; a comparação entre A e E mostra qual. |

## Depois das sondas: importar as páginas de verdade

O mesmo caminho (passos 9 a 11 para importar, e depois 13 a 15 para abrir o editor, preencher o SEO, salvar e publicar) serve para qualquer página convertida. Duas já estão no ar para teste:

- Gusten Sun (página real do ClickFunnels, desmontada e remontada pelo conversor): `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/paginas/gusten-sun/`
- Code Academy (página comum de exemplo): `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/paginas/education/`

Para muitas páginas de uma vez, existe o script `importar-em-lote-no-console-do-navegador.js`. Ele exige um passo a mais: na aba "Network", clicar com o botão direito na linha `cf-download-url` de uma importação que já deu certo → "Copy" → "Copy as fetch", e colar esse texto dentro do script no lugar marcado. Isso copia a sua sessão só para a memória da aba aberta; nada é salvo em arquivo nem enviado a lugar nenhum.

## Fonte oficial

Artigo da HighLevel "How to import a Funnel From ClickFunnels?": `https://help.gohighlevel.com/support/solutions/articles/48000980322-how-to-import-a-funnel-from-clickfunnels-`

## 2026-09-18 — nova arquitetura (planta) provada na Mentoria SLL inteira

O adivinhador foi para `legado/` (era cego a CSS Grid, não punha moldura na linha, achatava cartão com colunas
dentro). No lugar: **planta → medir → gerar → conferir** (skill html-para-clickfunnels; método em
COMO-ESCREVER-UMA-PLANTA.md). A planta decide a estrutura à mão; a medição no navegador copia texto e estilo do
original; o gerador escreve o Classic; a conferência recorta original × gerada seção por seção e trava o publicar
com veredito em branco.

Provado na Mentoria SLL v2 completa: 18 seções, 78 elementos. Os 7 cartões de oferta saíram `3+9` com moldura na
linha (miniatura|texto), os 7 cartões de detalhe saíram com corpo `6+6` imagem|texto **alternando o lado**, a carta
com `5+7` e `7+5` — tudo lado a lado e editável, o que o fluxo antigo nunca conseguiu. Blocos que animam/são
SVG/degradê (topo com barra de progresso, ESPERE, cupom, placas de PARE, fechamento, tarja, rodapé) entraram como
imagem dos recortes — fiéis por definição.

Recortes bloco a bloco gerados por uma segunda sessão do Claude Code em paralelo (24 PNGs em `recortes-mentoria/`),
provando que o método no disco é replicável por outro agente.

Página FECHADA (2026-09-18, à tarde): 19 seções, 116 elementos, todos os blocos do original cobertos. Os extras dos
cartões de detalhe entraram (painel de 5 caixinhas verdes, exemplo roxo, lista bege e cupom "VOCÊ GANHA" como imagem;
benefício como texto). O fechamento virou duas seções: o miolo (barra de progresso, AQUI E AGORA, preço final,
garantia, história — desenho/degradê) como imagem, e o FAQ como 9 pares subtítulo(pergunta)+parágrafo(resposta),
editáveis. Conferência visual: 19 pares, zero vereditos em branco. Saída no scratchpad da sessão.

Falta só o momento externo: publicar no GitHub Pages → importar no GoHighLevel → conferir na pré-visualização
(momentos 3 e 4 do fluxo visual). Esse é o teste que valida a arquitetura contra o importador de verdade.

Bugs corrigidos de passagem: `--largura mid` emitia classe inexistente (`midContainer` → `midWideContainer`);
a moldura da linha ignorava `indice`.
