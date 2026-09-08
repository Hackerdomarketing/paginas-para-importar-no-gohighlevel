# Páginas para importar no GoHighLevel

Páginas HTML vestidas com a anatomia do ClickFunnels Classic, publicadas aqui (GitHub Pages) só para o importador do GoHighLevel conseguir baixá-las. Geradas pela skill `html-para-clickfunnels`.

Endereço público: `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/`

- `sondas/` — seis páginas-sonda da Fase 0 (A a D: mesmo conteúdo, quantidades diferentes da "roupa" do ClickFunnels; E: a Sonda A com as correções de cor, fonte, peso e ícones descobertas na primeira importação real; F: uma página de laboratório em que cada elemento escreve peso, itálico, ícone de lista e altura de linha de um jeito diferente, para descobrir qual grafia o importador mantém)
- `paginas/<nome>/` — páginas convertidas, uma pasta por página

Este repositório recebe apenas HTML, CSS e imagens. Nenhuma senha ou identificador de sessão entra aqui.

---


# Guia: importar as páginas-sonda no GoHighLevel (Fase 0)

Objetivo desta rodada: descobrir **quais marcas o importador do GoHighLevel exige** para reconhecer uma página como ClickFunnels. São páginas com o mesmo conteúdo; cada uma veste uma quantidade diferente da "roupa" do ClickFunnels. Importando todas, a resposta aparece sozinha.

> **Atualização de 2026-09-08 (noite):** a Sonda A e a Sonda E já foram importadas. A Sonda E acertou as cores e a fonte Open Sans, mas o importador continuou deixando todo texto em negrito, apagou os ícones de check e o itálico, e deixou a altura de linha vazia. A **Sonda F** é o próximo teste: uma página de laboratório em que cada trecho tenta uma grafia diferente. Se você só vai fazer um teste agora, faça a Sonda F (veja a seção "Resultado da Sonda E").

Tempo estimado: 15 minutos. Você vai precisar estar logado no painel `https://app.hackfunnels.com.br`.

## Os endereços (copie e cole um por vez)

| Sonda | O que ela tem | Endereço |
|---|---|---|
| A | Tudo do ClickFunnels (metas, classe, scripts, estilo nativo, estrutura) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-a-classic-completo.html` |
| B | Só a estrutura do corpo + estilo nativo | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-b-classic-so-estrutura.html` |
| C | Página comum, sem nada do ClickFunnels (controle) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-c-html-comum.html` |
| D | Estrutura do corpo + estilo em cópia local (nenhum endereço do ClickFunnels no código) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-d-classic-com-folha-de-estilo-local.html` |
| E | A Sonda A com as correções de cor, fonte, peso e ícones (já importada) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-e-classic-completo-com-correcoes-de-fidelidade.html` |
| **F** | **Laboratório de peso, itálico, ícone de lista e altura de linha (a que importa agora)** | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-f-variantes-de-peso-italico-icone-e-altura-de-linha.html` |

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

## Resultado da Sonda E (2026-09-08, noite) e o que a Sonda F testa

A Sonda E foi importada, aberta no editor, salva e publicada em `https://hackersdomarketing.com/sonda-e-page-4103`. Comparando com a original:

| O que conferimos | Resultado | Explicação |
|---|---|---|
| Texto do botão e títulos das colunas brancos | **Certo** | Empurrar o branco para `#fffffe` funcionou: o importador guarda como cor personalizada. |
| Fonte Open Sans | **Certo** | Escrever a fonte em cada elemento funcionou. |
| Parágrafos em peso normal | **Errado: tudo em negrito** | O importador ignora o peso escrito e dá a todo texto (títulos, parágrafos, rodapé) o peso `heavy`, que ao salvar vira 900, o mais pesado que existe. Só a lista escapa (fica sem peso) e o botão vira 700. |
| Ícone de check nas listas | **Errado: sumiu nas três** | O importador apaga a tag `<i>` em qualquer grafia. A lista chega sem nenhum ícone definido. |
| Itálico | **Errado: sumiu** | A tag `<i>` também é apagada dentro do texto. Só sobrevivem `<a>`, `<span>` e `<strong>`. |
| Altura de linha | Ficou vazia nos parágrafos | A classe `lh5` do ClickFunnels não existe na folha de estilo; o importador escreve `line-height:` sem valor. |

**Descoberta importante sobre publicar:** uma página importada só ganha as cores e fontes de verdade **depois de ser aberta no editor e salva**. A Sonda A, publicada direto sem salvar, aparece sem estilo nenhum (letra Times, tudo preto, bolinhas comuns, botão sem cor). Regra: **importar → abrir no editor (Edit page) → clicar em Save → só então Publish**.

A **Sonda F** é uma página de laboratório: cada trecho traz uma etiqueta entre colchetes (`[F-P3]`, `[F-C6]`…) e escreve a mesma coisa de um jeito diferente. Depois de importada, salva e publicada, eu leio a página e descubro qual grafia o importador manteve. O que sobreviver vira a regra do conversor.

| Grupo de etiquetas | O que testa | Quantas variantes |
|---|---|---|
| `F-T1` a `F-T5` | Como escrever títulos para o peso ser respeitado (e um título com ícone de check na frente) | 5 |
| `F-P1` a `F-P12` | Doze jeitos de escrever um parágrafo em peso normal (inclusive o jeito interno do próprio ClickFunnels e o elemento "Text Block") | 12 |
| `F-I1` | Um parágrafo com itálico, sublinhado e negrito em várias grafias, para ver quais sobrevivem | 1 |
| `F-L1` a `F-L5` | Cinco jeitos de escrever a altura de linha | 5 |
| `F-C1` a `F-C8` | Oito jeitos de escrever o ícone de check da lista (classes, texto ✓, desenho SVG, imagem) | 8 |

**Na Sonda F, o que fazer depois de importar:** abra a etapa em "Edit page", clique em **Save** (canto superior direito), depois em **Publish**, e me mande o endereço publicado ou o endereço que aparece na barra do navegador com o editor aberto. Eu leio o resto sozinho. Se quiser conferir por conta própria: quais etiquetas `[F-P…]` aparecem em peso normal, se alguma lista `[F-C…]` mostra o check azul e se em `[F-I1]` alguma palavra ficou em itálico.

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

**Passo 12:** Repita os passos 9, 10 e 11 para a **Sonda F** (a mais importante agora; A e E já foram feitas) e, se sobrar tempo, para a **Sonda B**, depois **Sonda C**, depois **Sonda D**, sempre no mesmo funil "Teste de importação". Uma por vez: o importador não aceita várias juntas.

**Passo 13:** Com a etapa criada, clique em **"Edit page"**, espere o editor abrir, clique em **"Save"** (canto superior direito) e depois em **"Publish"**. Sem esse Save, a página publicada sai sem cor e sem fonte.

## O que me mandar no fim

Uma mensagem assim (pode ser áudio):

```
Sonda A: importou com elementos / importou vazia / deu erro (texto do erro)
Sonda B: …
Sonda C: …
Sonda D: …
Sonda E: botão branco? sim/não · títulos das colunas brancos? sim/não · fonte Open Sans? sim/não · parágrafos normais? sim/não · lista com check: 1 / 2 / 3 / nenhuma
Sonda F: endereço publicado (ou o endereço do editor aberto)
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

O mesmo caminho (passos 9 a 11) serve para qualquer página convertida. Duas já estão no ar para teste:

- Gusten Sun (página real do ClickFunnels, desmontada e remontada pelo conversor): `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/paginas/gusten-sun/`
- Code Academy (página comum de exemplo): `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/paginas/education/`

Para muitas páginas de uma vez, existe o script `importar-em-lote-no-console-do-navegador.js`. Ele exige um passo a mais: na aba "Network", clicar com o botão direito na linha `cf-download-url` de uma importação que já deu certo → "Copy" → "Copy as fetch", e colar esse texto dentro do script no lugar marcado. Isso copia a sua sessão só para a memória da aba aberta; nada é salvo em arquivo nem enviado a lugar nenhum.

## Fonte oficial

Artigo da HighLevel "How to import a Funnel From ClickFunnels?": `https://help.gohighlevel.com/support/solutions/articles/48000980322-how-to-import-a-funnel-from-clickfunnels-`
