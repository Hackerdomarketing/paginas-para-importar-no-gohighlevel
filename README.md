# Páginas para importar no GoHighLevel

Páginas HTML vestidas com a anatomia do ClickFunnels Classic, publicadas aqui (GitHub Pages) só para o importador do GoHighLevel conseguir baixá-las. Geradas pela skill `html-para-clickfunnels`.

Endereço público: `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/`

- `sondas/` — sete páginas-sonda da Fase 0 (A a D: mesmo conteúdo, quantidades diferentes da "roupa" do ClickFunnels; E: a Sonda A com as correções de cor e fonte descobertas na primeira importação real; F: laboratório em que cada elemento escreve peso, itálico, ícone de lista e altura de linha de um jeito diferente; G: o conversor já com as regras que a Sonda F revelou, mais um laboratório curto para a bolinha das listas)
- `paginas/<nome>/` — páginas convertidas, uma pasta por página: o `index.html` e a **ficha de importação** (`ficha-de-importacao.md` para ler, `.json` para o robô), que diz o ícone de cada lista da página para escolher no painel do editor depois de importar

Este repositório recebe apenas HTML, CSS e imagens. Nenhuma senha ou identificador de sessão entra aqui.

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
