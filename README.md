# Páginas para importar no GoHighLevel

Páginas HTML vestidas com a anatomia do ClickFunnels Classic, publicadas aqui (GitHub Pages) só para o importador do GoHighLevel conseguir baixá-las. Geradas pela skill `html-para-clickfunnels`.

Endereço público: `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/`

- `sondas/` — quatro páginas-sonda da Fase 0 (mesmo conteúdo, quantidades diferentes da "roupa" do ClickFunnels)
- `paginas/<nome>/` — páginas convertidas, uma pasta por página

Este repositório recebe apenas HTML, CSS e imagens. Nenhuma senha ou identificador de sessão entra aqui.

---

# Guia: importar as páginas-sonda no GoHighLevel (Fase 0)

Objetivo desta rodada: descobrir **quais marcas o importador do GoHighLevel exige** para reconhecer uma página como ClickFunnels. São quatro páginas com o mesmo conteúdo; cada uma veste uma quantidade diferente da "roupa" do ClickFunnels. Importando as quatro, a resposta aparece sozinha.

Tempo estimado: 15 minutos. Você vai precisar estar logado no painel `https://app.hackfunnels.com.br`.

## Os quatro endereços (copie e cole um por vez)

| Sonda | O que ela tem | Endereço |
|---|---|---|
| A | Tudo do ClickFunnels (metas, classe, scripts, estilo nativo, estrutura) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-a-classic-completo.html` |
| B | Só a estrutura do corpo + estilo nativo | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-b-classic-so-estrutura.html` |
| C | Página comum, sem nada do ClickFunnels (controle) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-c-html-comum.html` |
| D | Estrutura do corpo + estilo em cópia local (nenhum endereço do ClickFunnels no código) | `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-d-classic-com-folha-de-estilo-local.html` |

Lista com os quatro links clicáveis: `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/`

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

**Passo 12:** Repita os passos 9, 10 e 11 para a **Sonda B**, depois **Sonda C**, depois **Sonda D**, sempre no mesmo funil "Teste de importação". Uma por vez: o importador não aceita várias juntas.

## O que me mandar no fim

Uma mensagem assim (pode ser áudio):

```
Sonda A: importou com elementos / importou vazia / deu erro (texto do erro)
Sonda B: …
Sonda C: …
Sonda D: …
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

## Depois das sondas: importar as páginas de verdade

O mesmo caminho (passos 9 a 11) serve para qualquer página convertida. Duas já estão no ar para teste:

- Gusten Sun (página real do ClickFunnels, desmontada e remontada pelo conversor): `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/paginas/gusten-sun/`
- Code Academy (página comum de exemplo): `https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/paginas/education/`

Para muitas páginas de uma vez, existe o script `importar-em-lote-no-console-do-navegador.js`. Ele exige um passo a mais: na aba "Network", clicar com o botão direito na linha `cf-download-url` de uma importação que já deu certo → "Copy" → "Copy as fetch", e colar esse texto dentro do script no lugar marcado. Isso copia a sua sessão só para a memória da aba aberta; nada é salvo em arquivo nem enviado a lugar nenhum.

## Fonte oficial

Artigo da HighLevel "How to import a Funnel From ClickFunnels?": `https://help.gohighlevel.com/support/solutions/articles/48000980322-how-to-import-a-funnel-from-clickfunnels-`
