# Ficha de importação: Sonda H - listas com icones diferentes

Página convertida em 09/09/2026 12:42.
Endereço para colar no importador do GoHighLevel: https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/sondas/sonda-h-listas-com-icones-diferentes/

Caminho no painel: Sites → Funnels → o funil → "+ Add new step" → campo "Clickfunnels link" → "Create funnel step". Depois de importar: "Edit page" → Save → Publish (sem o Save a página sai sem cor nem fonte).

## Listas desta página e o ícone de cada uma

O importador do GoHighLevel deixa toda lista com a bolinha comum. Para cada lista abaixo, escolha o ícone no painel do editor (passo a passo mais abaixo). A ordem é a mesma em que as listas aparecem na página, de cima para baixo.

Listas com ícone para escolher: 4 de 4.

| # | Ícone para escolher | Começa com | Itens | Observação |
|---|---|---|---|---|
| 1 | `check` | Primeiro item da lista do check | 3 |  |
| 2 | `star` | Primeiro item da lista da estrela | 2 |  |
| 3 | `shield-alt` | Primeiro item da lista do escudo | 3 |  |
| 4 | `bolt` | Primeiro item da lista do raio | 2 |  |

## Como escolher o ícone de uma lista no editor (à mão)

Passo 1: abra a página importada no editor (Sites → Funnels → o funil → a etapa → botão azul "Edit page", no canto superior direito).

Passo 2: clique em cima da lista, no meio da página. Ela ganha uma borda azul e o painel da direita muda para as opções dela.

Passo 3: no painel da direita, na aba "Geral" (a primeira), role até achar o campo escrito "Ícone", com o texto cinza "Clique para selecionar o ícone". Clique nele.

Passo 4: abre uma caixinha com uma grade de desenhos e, em cima, um campo de busca "Ícones de pesquisa...". Digite o nome da tabela acima (em inglês, por exemplo `check`) e clique no desenho.

Passo 5: a caixinha fecha e o nome fica escrito no campo "Ícone". A bolinha da lista dá lugar ao desenho em todos os itens.

Passo 6: repita para as outras listas da tabela e, no fim, clique em "Save" (botão no canto superior direito). Depois do Save, "Publish" para a página no ar.

## Para o Claude fazer isso sozinho (pelo Tandem Browser)

Com a página importada aberta no editor dentro do Tandem Browser, peça ao Claude para rodar:

```
python3 ~/.claude/skills/html-para-clickfunnels/escolher_icones_das_listas_no_editor.py --ficha "~/Documents/VSCODE/paginas-para-importar-no-gohighlevel/sondas/sonda-h-listas-com-icones-diferentes/ficha-de-importacao.json"
```

Ele seleciona cada lista na ordem, escolhe o ícone da tabela e clica em Save no fim. `--simular` só mostra o que faria.
