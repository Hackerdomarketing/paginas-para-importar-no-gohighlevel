# Análise: o que o prompt de clonagem forense ensina (e o que não ensina) para a conversão ClickFunnels

Data: 2026-09-20. Base: o prompt genérico guardado ao lado, a skill `html-para-clickfunnels` (SKILL.md, as 15
regras de ouro de `COMO-ESCREVER-UMA-PLANTA.md`), o diário do README deste projeto (sondas A a H, escavações 1 a 10
das seis páginas reais do ClickFunnels) e a conversão da Mentoria SLL v2.

## 1. O que o prompt é, em uma frase

É um prompt de **disciplina**, não de construção. Ele não ensina a montar nada; ensina a **não inventar**: material
real antes de tudo, foto de cada estado antes de escrever, conteúdo preguiçoso caçado de propósito, oito itens
medidos sem aproximar, nada resumido, comparação lado a lado no fim, e "na dúvida, pergunte".

## 2. A skill já chegou, na dor, exatamente na mesma disciplina

Cada fase do prompt tem um par direto numa regra que a skill aprendeu errando. Isso é bom sinal: os dois caminhos
convergiram no mesmo lugar de forma independente.

| Fase do prompt | Regra equivalente que a skill já tem | De onde a skill tirou |
|---|---|---|
| Regra suprema: reproduzir, nunca inventar; na dúvida, pergunte | "Medir é copiar; ler o CSS seria adivinhar." O adivinhador foi aposentado (`legado/`) | 7 rodadas erradas da Mentoria, 2026-09-17 |
| Fase 1: só a partir dos arquivos reais | Regra 8: "Original = o arquivo que a pessoa mandou", não uma cópia de outro lugar | título da carta saiu trocado, 2026-09-19 |
| Fase 2: foto de cada estado antes de construir | Passo 1 do guia: recortar cada seção; `recorte:` obrigatório em toda seção da planta | julgar pela miniatura escondeu erros, 2026-09-17 |
| Fase 4: caçar conteúdo preguiçoso | Regra 13: recorte com JavaScript ligado, página rolada para carregar imagem preguiçosa, aviso de imagem que não carregou | mockup do fechamento saiu como buraco branco, 2026-09-20 |
| Fase 5: oito itens medidos com exatidão | `medir_planta_no_navegador.py` lê o estilo calculado (`getComputedStyle`) de cada seletor; regra 9: "proporção se mede, não se olha" | o 1264px-em-tudo que o olho deixou passar, 2026-09-19 |
| Fase 6: honestidade sobre o que depende de servidor | Efeitos e scripts vão para `efeitos/` com guia de onde colar; ícone de lista e SEO vão para a ficha porque o HTML não resolve | Sondas F, G, H |
| Fase 8: nada resumido, seção por seção | Regra 1: "página inteira quer dizer inteira"; regra 7: planta pelos filhos visíveis, um por um, nunca replicando o bloco 1 nos outros | 6 blocos faltaram sem ninguém ver, 2026-09-19 |
| Fase 9: lado a lado com o original | `comparar_lado_a_lado.py`: original pelo seletor da seção inteira, mesma escala, tabela de medidas; veredito dado olhando, nunca por script | conferência circular que dava "igual" com blocos faltando |

**Conclusão desta parte:** o prompt não traz um princípio novo. O que ele traz é a disciplina escrita de forma
compacta, ordenada e imperativa, que a skill tem espalhada em 15 regras, 3 arquivos e um README de 60 KB. Isso tem
valor: uma IA lê o prompt em 2 minutos e entende a postura; para entender a skill precisa de meia hora.

## 3. Onde o prompt CONTRADIZ o alvo ClickFunnels (por isso não dá para usar como está)

Aqui está a resposta para "por que não funciona só mandar o prompt e pedir em ClickFunnels".

1. **"Reproduzir, nunca reinterpretar" + Fase 7 "manter estrutura, pastas, nomes e CSS intactos".** O ClickFunnels
   Classic exige o oposto: REESCREVER a árvore inteira numa gramática fixa (`containerWrapper › container › row ›
   col-md-N › col-inner › elemento`), grade de 12 com no máximo 4 colunas por linha, moldura na linha, todo estilo
   escrito dentro de cada elemento, sem `<head>`, sem `<i>`, cor branca empurrada para `#fffffe`, peso dentro de
   `<span>`. Isso é uma **tradução**, e tradução é uma sequência de decisões ("este cartão é `[3,9]` ou `[4,8]`?",
   "esta fileira de cinco vira `[4,4,4]`+`[6,6]`?"). O prompt proíbe exatamente a operação que a conversão exige.
   **Os 30% de erro moram nessa tradução, e o prompt é mudo sobre ela.**
2. **Fase 3 (baixar e localizar tudo) não ajuda no GoHighLevel.** O importador descarta a cabeça inteira (Sonda H):
   fontes, folhas de estilo e scripts externos somem de qualquer jeito, e as imagens são re-hospedadas por ele em
   `assets.cdn.filesafe.space`. O que importa é o contrário: imagem com endereço https absoluto e público na hora de
   importar, fonte escrita pelo nome dentro de cada elemento.
3. **Fase 5, item 8 (pixels, metas, título, descrição) não sobrevive no HTML.** Tudo da cabeça é apagado. O lugar
   certo é a ficha de importação (SEO) e o campo de código de rastreamento do editor. O prompt manda preservar no
   arquivo; o alvo exige entregar à parte, com o caminho do painel.
4. **Fase 5, item 5 (animações) e item 7 (hover) não atravessam o importador.** Viram `efeitos/` (CSS e JS para
   colar no editor) ou imagem. O prompt manda reproduzir no código; no alvo isso é entrega paralela.
5. **Os portões interativos** (escolher estilo de comunicação, três perguntas antes de qualquer linha) travam um
   fluxo autônomo em que o Claude Code roda scripts. Servem para conversa em site de IA; num pipeline, viram
   verificação silenciosa.

## 4. Uma etapa ou duas? Duas, mas não "clonar e depois converter"

**"Clonar e depois converter" é errado** por dois motivos. Primeiro, quando a página é do Rafa (Open Design, arquivo
baixado), o clone do original é o próprio original: a etapa não produz nada. Segundo, o clone genérico preserva a
estrutura do site, que é justo o que vai ser jogado fora na tradução.

**"Uma etapa só, já escrevendo em ClickFunnels" também é errado**, e foi exatamente o que o adivinhador fazia: sem
um inventário antes, a IA começa a decidir estrutura olhando o CSS, e cada padrão fora do repertório vira erro.
Trocar o script por uma IA em linguagem natural não muda isso: ela adivinha melhor, mas continua adivinhando.

**A divisão certa é por natureza da tarefa, não por "clone × conversão":**

| Etapa | O que é | Quem faz bem | Já existe na skill? |
|---|---|---|---|
| A. Inventário forense | O que existe na página, bloco a bloco: recorte de cada seção, lista dos filhos visíveis (tag, classe, primeiras palavras), estilo calculado, largura útil, o que anima, o que depende de servidor | Script (copiar valor é trabalho de máquina) | Sim: recortes + `medir_planta_no_navegador.py` + `extrair_efeitos.py` |
| B. Tradução para a gramática do ClickFunnels | Olhar cada seção do inventário e decidir: quantas linhas, quais colunas (`[3,9]`, `[6,6]`…), onde vai a moldura, o que vira imagem, qual elemento nativo | **IA olhando** (é decisão visual, como montar à mão no editor) | Parcialmente: hoje é a planta, escrita à mão pelo Claude Code, sem um roteiro fechado. **É aqui que mora o trabalho besteiro.** |
| C. Escrita do HTML Classic + ficha + efeitos | Aplicar as regras do importador (cor, span, sem `<i>`, classes `lhN`, largura na linha) | Script (`gerar_da_planta.py`) | Sim, e é a parte que já acerta |
| D. Conferência | Lado a lado, mesma escala, tabela de medidas, veredito olhando | Script gera o par; IA/pessoa julga | Sim: `comparar_lado_a_lado.py` |

Ou seja: **o prompt adaptado não substitui a skill; ele é o roteiro da etapa B**, a única que ainda depende de
julgamento. O que a skill "cede ao prompt" é o apêndice de tradução: a tabela de decisão de estrutura, o que vira
imagem, a gramática do importador. Está escrito em
`prompt-clonagem-forense-PARA-CLICKFUNNELS-CLASSIC-v1-rascunho.md`.

Onde o prompt adaptado realmente reduz trabalho: a IA que escreve a planta passa a ter um roteiro fechado (fases,
tabelas, proibições, formato de saída), em vez de reaprender a cada página lendo README. E se um dia o Rafa quiser
mandar para outra IA (sem os scripts), o mesmo prompt já carrega as regras do importador para ela escrever o HTML
direto, com a ressalva de que sem medição no navegador ela vai ter que ler valores do CSS, o que é aceitável para
página simples e perigoso para página densa.

## 5. Alavancagens que ninguém puxou ainda (e que podem valer mais que qualquer prompt)

1. **A Sonda C nunca foi importada.** Sonda C é a página comum, sem nenhuma roupa de ClickFunnels. O guia diz: "se a
   C importar com elementos, o conversor nem é necessário". As Sondas B e D (que medem quanta roupa é preciso)
   também estão sem resultado. São 15 minutos no painel e a resposta redefine o tamanho do problema.
2. **A Mentoria gerada pela planta nunca entrou no GoHighLevel.** Os 70% de acerto são medidos contra o original
   (momento 2 do fluxo visual). Os momentos 3 e 4 (importar, conferir a pré-visualização, publicar) não aconteceram.
   Pode ser que o importador estrague coisas que hoje parecem certas, ou que aceite coisas que hoje viram imagem.
3. **Sonda de 2.0: `FlexContainer` e `data-page-element`.** As escavações mostraram que o 2.0 tem container flex,
   que aninha e enfileira livremente. Se o importador do GoHighLevel ler flex, a grade de 12 deixa de ser limite:
   cinco caixinhas em linha, cartão dentro de cartão, tudo mapeia quase um para um com o CSS Grid e Flex das
   páginas do Open Design. Isso sozinho mataria metade das decisões difíceis da etapa B. Barra de progresso nativa
   (`ProgressBar/V1`) vem junto no mesmo teste.
4. **Mobile.** A regra 15 diz que não está resolvido: seção que virou foto encolhe e fica ilegível no celular. O
   prompt genérico exige foto do celular na Fase 2 e comparação mobile na Fase 9. A versão adaptada mantém isso
   como obrigação, para que "fiel" passe a incluir o celular.

## 6. Recomendação, em ordem

1. Importar as Sondas C, B e D (15 minutos, ver `GUIA-DE-IMPORTACAO-NO-GOHIGHLEVEL.md` passos 9 a 11). Registrar o
   resultado no README.
2. Importar a Mentoria gerada pela planta (momentos 3 e 4). Sem isso o "70%" é chute.
3. Escrever a Sonda I (flex do 2.0 + `data-page-element` + `ProgressBar/V1` + `<i>` no texto do botão) e importar.
4. Usar o prompt adaptado v1 numa página nova, pequena, para a IA escrever a planta seguindo o roteiro. Medir
   quantas correções de planta foram necessárias contra o que a Mentoria exigiu. Se cair, o prompt fica; se não,
   o problema não era falta de roteiro.
5. Só depois disso mexer de novo nos scripts.
