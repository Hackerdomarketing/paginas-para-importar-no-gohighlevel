# Como escrever uma planta (método replicável)

A planta é um arquivo YAML que decide **só a estrutura** de uma página no formato ClickFunnels: quais seções, quantas
colunas por linha, o que vai em cada coluna, e onde fica a moldura. O texto e o estilo **não se escrevem à mão** —
cada elemento aponta para o original por seletor CSS, e a medição no navegador copia de lá. Formato completo em
`~/.claude/skills/html-para-clickfunnels/modelos/planta-exemplo.yaml`.

Este guia é o método para olhar uma página e transformá-la numa planta. Serve para qualquer página, não só a Mentoria.

## Passo 1 — ver a página bloco a bloco (obrigatório antes de escrever)

Abra o original num navegador (Playwright) e recorte **cada seção** numa imagem própria, numerada. Nunca julgue pela
miniatura da página inteira: ela é ilegível e esconde o erro (provado em 2026-09-17). Cada seção da planta cita no
campo `recorte:` o print que a originou; sem isso a medição avisa.

## Passo 2 — fatiar em seções

Uma seção é uma faixa horizontal da página com um propósito e, em geral, um fundo próprio. Sinais de que mudou de
seção: a cor de fundo muda; entra uma faixa de ponta a ponta; o assunto vira outro (do vídeo para a oferta, da carta
para a garantia). No ClickFunnels a seção é `container` e tem uma largura:
- `full` — ocupa a tela toda (cabeçalho, rodapé, faixas escuras de impacto).
- `wide` — 1120px (o corpo da carta de vendas; é o padrão da maioria).
- `mid` — 960px (conteúdo mais estreito, popup).

## Passo 3 — dentro da seção, decidir as linhas e colunas

Cada linha é uma fileira; suas colunas somam 12 e são no máximo 4. Combinações que existem de verdade no ClickFunnels
(medidas em seis páginas reais — ver a "Síntese" no README):

| Quer isto na tela | Colunas |
|---|---|
| um bloco só, largura cheia | `[12]` |
| imagem menor de um lado, texto maior do outro | `[3, 9]` `[4, 8]` `[5, 7]` (e o inverso `[9,3]` `[8,4]` `[7,5]`) |
| dois blocos iguais lado a lado | `[6, 6]` |
| três iguais | `[4, 4, 4]` |
| rótulo curto à esquerda, conteúdo à direita | `[2, 10]` |

**Para inverter o lado** (texto à esquerda, imagem à direita) não há opção: é só pôr o conteúdo na outra coluna. Os
cartões que alternam (imagem esquerda num, direita no outro) alternam a ordem do `conteudo`.

**Cinco em linha não existe** (a grade é de 12 e 5 não divide 12). Uma fileira de 5 vira `[4,4,4]` + `[6,6]`, ou uma
grade de muitos itens vira colunas que empilham vários itens cada (não uma linha por item).

**Grade de muitos itens** (galeria de fotos, lista de logos): não é uma linha por fileira. É uma linha só com poucas
colunas, cada coluna empilhando vários itens — ou, se forem poucos, `[4,4,4]`.

## Passo 4 — onde fica a moldura (o ponto que travava tudo)

Se um bloco é um "cartão" (fundo, borda, cantos arredondados, sombra) **e** tem imagem de um lado e texto do outro, a
moldura vai na **linha**, não na coluna — o ClickFunnels não põe linha dentro de coluna. Na planta:

```yaml
- colunas: [3, 9]
  moldura: { seletor: .offer-row }   # mede fundo/borda/raio/sombra do cartão e põe na linha
  conteudo:
    - - imagem: .offer-row img
    - - subtitulo: .offer-row h3
      - paragrafo: .offer-row p
```

Fundo de uma seção inteira (faixa escura, degradê) vai em `fundo:` da seção. Caixa com só borda esquerda tingida
(callout "POR EXEMPLO") é uma linha com `moldura` apontando para ela.

## Passo 5 — o que NÃO tem elemento nativo vira imagem

O importador apaga o que anima, se sobrepõe ou é desenhado em SVG/degradê. Estes viram **imagem** (recorte o bloco do
original com o Playwright e aponte o arquivo na planta, `imagem: recorte-tal.png`):
- barra de progresso animada, contadores, dúvidas flutuando;
- ícones soltos (triângulo de alerta, setas, play sobre o vídeo, selo de garantia);
- texto com degradê (background-clip);
- montagem sobreposta (etiqueta + título + play em cima de uma capa) — recorte o conjunto todo como uma imagem.

**Mas o efeito não se perde: vai para `efeitos/`.** Tudo que anima ou roda script no original (as 5 animações e o
confetti da Mentoria, por exemplo) é identificado pelo `extrair_efeitos.py` (o gerador roda sozinho) e entregue à
parte — `efeitos.css`, `efeitos.js` e `EFEITOS.md` com o passo a passo para colar no editor do GoHighLevel e dar o
gancho a cada elemento. A entrega de uma página é sempre **página + efeitos/**; sem isso a entrega está incompleta.

O que **tem** elemento nativo, deixe como elemento (fica editável): título, subtítulo, parágrafo, imagem simples,
lista, botão, divisor, vídeo (YouTube/Vimeo por URL). Lista: o ícone de cada uma vai para a ficha de importação e se
escolhe no painel do editor depois — não tente desenhar o ícone dentro do item.

## Passo 6 — apontar os seletores

Cada elemento aponta para um seletor CSS do original. Se o mesmo seletor casa vários (três `.card h4`), use
`{ seletor: .card h4, indice: 0 }`, `indice: 1`… Quando não há seletor bom, escreva literal:
`titulo: { literal: "Texto", cor: "#d93632", tamanho_px: 32, alinhar: center }`.

Tipos: `titulo`, `subtitulo`, `paragrafo`, `texto`, `imagem`, `lista`, `botao`, `divisor`, `video`, `html`, `campo`.
(`titulo`→h1/headline, `subtitulo`→h2, `paragrafo`→texto corrido. O medidor lê o tamanho/cor/peso reais de cada um.)

## Passo 7 — rodar o pipeline e conferir

```bash
S=~/.claude/skills/html-para-clickfunnels
PY=$S/.venv/bin/python3        # venv próprio da skill; se não existir: bash $S/instalar.sh

$PY $S/medir_planta_no_navegador.py planta.yaml -o saida/planta-medida.json
$PY $S/gerar_da_planta.py            saida/planta-medida.json -o saida/
$PY $S/conferir_visualmente.py       saida/planta-medida.json saida/index.html
```

Abra `saida/conferencia/conferencia-visual.html` e olhe cada par (original × gerada, seção por seção). Preencha cada
`veredito:` em `saida/conferencia/conferencia-visual.md` com `igual`, `aceito: <o que difere e por que tudo bem>` ou
`refazer: <o que está errado>`. Onde disser "refazer", corrija a planta e rode de novo. O publicar recusa a página
enquanto houver veredito em branco.

## Erros que já aconteceram (não repetir)

- Julgar pela miniatura da página inteira. Sempre por seção.
- Achar que "cartão com moldura" e "duas colunas" não cabem juntos. Cabem: moldura na linha.
- Tentar cinco colunas numa linha. Não existe; use `[4,4,4]` + `[6,6]`.
- Deixar barra de progresso / ícone solto / degradê como elemento. Viram imagem.
- Escrever o texto à mão. Aponte o seletor; a medição copia (e congela negrito/itálico/cor de cada trecho).

## Regras de ouro (aprendidas na Mentoria, 2026-09-18 — não repetir os erros)

1. **Página inteira quer dizer inteira.** Não seja seletivo com quais elementos replicar. Se a página tem um
   bloco, ele entra — como elemento se for texto/lista/imagem simples, como imagem se for denso/desenho, mas
   NUNCA fica de fora. Cada seção da planta tem que cobrir tudo que existe na seção do original.

2. **Conferir na página INTEIRA rolando, sobre o fundo real — nunca em recorte isolado.** Um cartão branco com
   sombra suave, recortado sozinho sobre fundo branco, some: a borda clara e a sombra não aparecem. Foi assim
   que a falta da caixa dos detail-cards passou batida. A conferência de verdade é servir a página gerada
   (com lander.css local) e rolar por ela do topo ao rodapé, vendo cada bloco contra o fundo que ele tem na
   página (a zona de detalhes é cinza; é o cinza que faz a caixa branca aparecer).

3. **Cartão = caixa com fundo + cantos + sombra.** Quando um bloco do original é um cartão (fundo, border-radius,
   box-shadow), a moldura precisa envolver o cartão inteiro:
   - cartão de UMA linha (miniatura | texto) → moldura na LINHA (`moldura:` na linha).
   - cartão que envolve VÁRIAS linhas (título + corpo + extras, como o detail-card) → moldura na SEÇÃO
     (`fundo: { seletor: ".detail-card", indice: N }`); o medidor mede fundo+borda+raio+sombra e a seção vira caixa.
   Confirme na conferência que a caixa aparece — não confie que "está no código".

4. **Sombra: cuidado com spread negativo e sombras múltiplas.** O original às vezes usa `box-shadow` com spread
   negativo (encolhe a sombra) ou duas sombras separadas por vírgula. `_sombra_do_css` já pega só a 1ª e zera
   spread negativo, senão a sombra some sobre o branco.

5. **A entrega é página + `efeitos/`, sempre.** Olhe o original inteiro atrás de tudo que se mexe (animação, brilho,
   piscar, flutuar, confetti, sanfona) e entregue, além da página, os códigos prontos e o passo a passo para colar no
   editor do GoHighLevel. Não importa se o importador aceita: o efeito existe na versão do GoHighLevel porque a
   pessoa cola — e o guia diz exatamente onde.

6. **A conferência é contra o original REAL, lado a lado, e o veredito é dado olhando.** Use
   `comparar_lado_a_lado.py`: ele recorta a seção inteira do original (não o que a planta mapeou) e cola ao lado da
   gerada. Uma conferência que recorta pela planta é circular — confere se a gerada bate com a sua lista, não com o
   site — e foi assim que 6 blocos faltaram sem ninguém ver. Nunca preencha veredito por script.

7. **Planta se escreve pelos filhos visíveis, um por um.** Antes de escrever uma seção, liste no navegador os filhos
   visíveis dela (tag, classe, primeiras palavras) e mapeie cada um. Não replique a estrutura de um bloco nos outros
   "porque são parecidos": o card 1 tinha painel verde e exemplo; o 6 tinha caixa bege; o 7 tinha lista — replicar o
   1 nos outros enfiou conteúdo de um card dentro dos outros.

8. **Original = o arquivo que a pessoa mandou.** Não troque por uma cópia de outro lugar sem conferir que é igual.
   Recortes-imagem: com JavaScript desligado.

9. **Proporção se mede, não se olha (2026-09-19).** O Rafa viu que "a original parece maior" e eu tinha dado a
   página como parecida. Medido: o original tinha miolo de 760/700/980px e a gerada abria tudo em 1264px, porque
   (a) a página publicada não conseguia baixar o `lander.css` (403) e ficava sem classe nenhuma, e (b) mesmo com o
   CSS, `wideContainer` é 1120 — a planta nunca tinha medido a largura do miolo. Regras que saíram disso:
   - o medidor grava `largura_util` por seção e o gerador escreve `width: Npx; max-width: 100%; margin: 0 auto` na
     linha (é assim que as páginas reais do ClickFunnels estreitam: `width: 75%` na linha);
   - a página gerada leva `assets/lander.css` (cópia local);
   - o comparador recorta os dois lados na largura da tela inteira (mesma escala) — antes ele recortava o original
     por 760px e a gerada por 1280px e esticava os dois, o que produzia justamente a ilusão de "maior";
   - junto com os pares, imprime-se a tabela: largura útil original × largura da linha gerada × altura das seções
     nos dois lados. Veredito de proporção sem número não vale.

10. **Recorte de tela inteira vai de ponta a ponta.** Seção cujo conteúdo é só uma foto de 1280px (topo, tarja,
    rodapé, bundle): `fullContainer`, sem respiro lateral de coluna/linha/container e `espaco [0,0]`. Aplicar a
    largura útil medida nela (760, do texto dentro da foto) encolhe a foto; os 20px de respiro viram uma faixa de
    fundo com uma "linha" na borda da foto. O gerador detecta isso sozinho pelo tamanho do arquivo.

11. **Linha fina no original = divisor de 1px; borda só em cima/embaixo = dois divisores.** O `lander.css`
    desenha o divisor com 3px; foi isso que apareceu como "linha de separação que não existe". O `aside` da
    Carta tem `border-top` + `border-bottom` de 1px: o Classic não tem borda parcial, então vira um divisor antes
    e um depois da linha, com a cor medida (`#e6deef`).

12. **Ícone na frente do título.** Título que começa com um `<svg>` (o ✓ das ofertas) perde o desenho no medidor;
    ele registra `icone_antes` e o gerador desenha o check em SVG inline — a única grafia que o importador mantém.

13. **Recorte se tira com JavaScript LIGADO e efeitos congelados — e se abre a foto antes de usar (2026-09-20).**
    O recorte do fechamento foi tirado com JS desligado (para não entrar o confetti) e o mockup, que entra por
    script, saiu como um buraco branco. Ninguém abriu a foto; ela foi para a página publicada. Use
    `recortar_bloco_do_original.py`: JS ligado, animações congeladas, canvas de confetti escondido, página rolada
    para carregar imagem preguiçosa, e aviso quando alguma imagem do bloco não carregou. Depois, olhe a foto.

14. **Cartão-seção tem margem embaixo; recorte de tela acompanha a tela.** A margem medida entre cartões (60px)
    vai como `margin-bottom` na seção. Recorte de tela inteira: foto a 100% da linha, sem teto de largura, e a
    seção com o fundo medido do original (cor ou degradê) — numa tela de 1512px a foto de 1280 deixava faixas
    brancas dos lados na tarja.

15. **Mobile não está resolvido.** A estrutura empilha (é o CSS do ClickFunnels), mas toda seção que é FOTO
    (topo, abertura, cashback, bundle, caixa de preço, risco zero, fechamento, tarja, rodapé) encolhe para 390px e
    o texto dentro fica ilegível; o original tem CSS próprio de celular. Ver `comparacao/00-mobile-390px-*.png`.
    Isso só se resolve trocando foto por elementos nativos ou entregando um recorte de celular à parte.

## Regra mestra (2026-09-20): foto só onde o original é foto

O Rafa: "Eu não quero porra nenhuma com foto. Eu só quero com foto o que no site original for foto." Ou seja:
todo texto, título, botão, lista, faixa, selo com texto, caixa de preço, rodapé vira ELEMENTO NATIVO. Só é imagem o
que no original é `<img>` (logo, mockup, cupom, placas, selos de pagamento, foto da garantia) — mais dois casos
inevitáveis sem elemento nativo: a barra de progresso listrada (desenho em CSS) e a capa do vídeo (foto com
sobreposições). A planta da Mentoria refeita assim tem 215 elementos e nenhuma "seção-foto"; o celular passa a
se resolver sozinho (as colunas empilham e o texto reflui). Regras que saíram dessa refeita:

16. **Inventário antes da planta.** Para cada seção, listar no navegador os filhos visíveis (tag, classe, tamanho,
    se é `<img>`, se tem fundo/animação, primeiras palavras). Só depois escrever as linhas. Sem o inventário a
    planta é chute.
17. **Cartão de UMA coluna com muitos elementos = uma linha com moldura** (caixa de preço, caixa da garantia,
    cartão foto+texto). Só cartão com colunas lado a dentro (os entregáveis, a história) precisa virar seção
    com moldura na seção. Faixa-cabeçalho do cartão (o "VEJA TUDO…" roxo) vira a própria linha com moldura, acima.
18. **Linha com degradê usa `bgNoRepeat`, nunca `bgCover`** — `.bgCover` tem `background-attachment: fixed
    !important`; o degradê fica preso à janela e o cartão sai branco a partir de 900px.
19. **O que o medidor aprendeu a ler nesta rodada** (tudo virava diferença visível): pesos 800/900 das fontes
    (o link do Google Fonts só pedia 400/600/700); `text-transform: uppercase` no elemento e no trecho; trecho em
    bloco dentro do título (quebra de linha); tamanho de fonte de um trecho; o svg original na frente do título
    (o triângulo do ESPERE! não é um check); largura máxima do texto (`max-width` do original); margem real de
    cada elemento = max(margin-top, margin-bottom do irmão de cima) + gap do pai flex/grid; respiro medido da
    seção; imagem embutida em `data:` vira arquivo em `imagens/`; botão com degradê, negrito e subtexto pequeno.
20. **Conferência local serve imagens do disco.** A página gerada aponta para a URL pública (é o que o importador
    precisa); antes de publicar essas imagens não existem online. O comparador intercepta a URL pública e serve
    de `imagens/` — senão a conferência mostra quadradinho quebrado e engana.
21. **Regra "faixa sem respiro zera margens" só vale para foto de tela.** Aplicada a seção montada com padding
    0, colava todos os parágrafos.
