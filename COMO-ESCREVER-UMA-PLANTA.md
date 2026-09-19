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
