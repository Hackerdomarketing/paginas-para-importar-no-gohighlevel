# Ficha de importação: Mentoria SLL com o Zé Dos Milhões

Página convertida em 19/09/2026 05:37.
Endereço para colar no importador do GoHighLevel: https://hackerdomarketing.github.io/paginas-para-importar-no-gohighlevel/paginas/upsell-mentoria-sll-v2/

Caminho no painel: Sites → Funnels → o funil → "+ Add new step" → campo "Clickfunnels link" → "Create funnel step". Depois de importar: "Edit page" → escolher os ícones das listas → preencher o SEO → Save → Publish (sem o Save a página sai sem cor nem fonte).

## Listas desta página e o ícone de cada uma

O importador do GoHighLevel deixa toda lista com a bolinha comum. Para cada lista abaixo, escolha o ícone no painel do editor (passo a passo mais abaixo). A ordem é a mesma em que as listas aparecem na página, de cima para baixo.

Listas com ícone para escolher: 1 de 1.

| # | Ícone para escolher | Começa com | Itens | Observação |
|---|---|---|---|---|
| 1 | `check` | Recebe os produtos direto do fornecedor | 4 | sem ícone reconhecível no original; o check é sugestão |

## Como escolher o ícone de uma lista no editor (à mão)

Passo 1: abra a página importada no editor (Sites → Funnels → o funil → a etapa → botão azul "Edit page", no canto superior direito).

Passo 2: clique em cima da lista, no meio da página. Ela ganha uma borda azul e o painel da direita muda para as opções dela.

Passo 3: no painel da direita, na aba "Geral" (a primeira), role até achar o campo escrito "Ícone", com o texto cinza "Clique para selecionar o ícone". Clique nele.

Passo 4: abre uma caixinha com uma grade de desenhos e, em cima, um campo de busca "Ícones de pesquisa...". Digite o nome da tabela acima (em inglês, por exemplo `check`) e clique no desenho.

Passo 5: a caixinha fecha e o nome fica escrito no campo "Ícone". A bolinha da lista dá lugar ao desenho em todos os itens.

Passo 6: repita para as outras listas da tabela. Não salve ainda: siga para a seção "SEO" mais abaixo — o Save e o Publish ficam para o fim, depois que o SEO estiver preenchido.

## Para o Claude fazer isso sozinho (pelo Tandem Browser)

Com a página importada aberta no editor dentro do Tandem Browser, peça ao Claude para rodar:

```
python3 ~/.claude/skills/html-para-clickfunnels/escolher_icones_das_listas_no_editor.py --ficha "/private/tmp/claude-501/-Users-<usuario>-Documents-VSCODE-paginas-para-importar-no-gohighlevel/ff1dcd49-32d4-4138-a103-a3d3ec1eab2b/scratchpad/mentoria/saida/ficha-de-importacao.json"
```

Ele seleciona cada lista na ordem, escolhe o ícone da tabela e clica em Save no fim. `--simular` só mostra o que faria.

## SEO: título, descrição e imagem de compartilhamento

O importador do GoHighLevel joga fora a cabeça da página (a parte de cima do código, que o visitante não vê mas o Google e o WhatsApp leem). Por isso a página importada nasce **sem título e sem descrição**, mesmo que o original tivesse os dois. Copie os valores abaixo para dentro do editor.

| Campo no painel | Valor para colar |
|---|---|
| Título | Mentoria SLL com o Zé Dos Milhões |
| Descrição | Modelo visual da mentoria de implementação para alunas do Sistema Loja Lucrativa. |
| Imagens | (o original não tinha imagem de compartilhamento — pule esse campo) |

### Como preencher (caminho conferido no painel)

Passo 1: abra a página no editor (Sites → Funnels → o funil → a etapa → botão azul "Edit page", no canto superior direito).

Passo 2: olhe a barra de ferramentas cinza que fica no alto, logo abaixo do nome da página. Ela tem uma fileira de desenhos pequenos. Conte da esquerda para a direita dentro do segundo grupo de desenhos: o nono é uma folha de papel com uma lupa em cima. Passe o mouse em cima dele e vai aparecer a etiqueta "SEO e otimização de busca por IA". Clique nesse desenho.

Passo 3: abre um painel do lado ESQUERDO da tela com o título "SEO & otimização de busca com IA" e, embaixo, a frase "Seja encontrado em mecanismos de IA e busca". Dentro dele há várias faixas que abrem e fecham quando você clica: Pré-visualizar, Conteúdo, Palavras-chave, Autor, Imagens, Links e tags, Idioma, Marcação de esquema.

Passo 4: clique na faixa "Conteúdo" (é a segunda, e costuma ter uma bolinha laranja com o número 3 do lado). Ela abre com dois campos vazios: um campo de uma linha escrito "Título" e, abaixo, uma caixa maior escrita "Descrição". Cole neles o título e a descrição da tabela acima.

Passo 5: clique na faixa "Imagens". Aparece um campo escrito "Imagens" com um botãozinho de escolher imagem ao lado. Cole ali o endereço da imagem de compartilhamento da tabela acima (se a tabela disser "não tinha", pule este passo).

Passo 6: clique no desenho de disquete (o ícone de salvar) no canto superior direito para gravar e, depois, no botão azul "Publicar" ao lado dele, para a página no ar receber a mudança.

Atenção — o lugar ERRADO: na lista de etapas do funil existe uma engrenagem com "Editar detalhes da página". Ela NÃO é o SEO: só tem "Nome" e "Caminho" (o endereço da página). O SEO fica só dentro do editor, no desenho da folha com lupa.

## Efeitos (animações e scripts) — colar no editor depois de importar

O original tem 5 animação(ões) e 1 script(s). Eles NÃO atravessam a importação. Está tudo pronto em `efeitos/`: `efeitos.css`, `efeitos.js` e o passo a passo em `efeitos/EFEITOS.md` (onde clicar, o que colar, como dar o gancho a cada elemento). Faça isso antes do Save/Publish final.
