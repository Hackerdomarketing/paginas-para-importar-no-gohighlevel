# Efeitos desta página — o que colar no GoHighLevel para eles existirem lá

A página importada chega SEM os efeitos (o importador descarta essa parte do código). Eles existem na
versão do GoHighLevel só se você colar estes dois arquivos dentro do editor e der o "gancho" a cada
elemento animado. Leva uns minutos. Siga na ordem.

## O que tem de efeito nesta página

- **faz as listras/o brilho do fundo andarem** — onde: «Você está na etapa 2 de 3». Gancho: `fx-progress-stripes`.
- **desloca o elemento (flutua/anda)** — onde: «Você está na etapa 2 de 3». Gancho: `fx-progress-light`.
- **transição suave ao interagir** — onde: <span> sem texto (bloco visual). Gancho: `fx-play`.
- **transição suave ao interagir** — onde: «SIM! Quero usar meu desconto na mentoria! Quero os 6 encontros com o Z». Gancho: `fx-buy`.
- **transição suave ao interagir** — onde: «Não, eu prefiro descobrir sozinha o que fazer quando as vendas travare». Gancho: `fx-decline`.
- **desloca o elemento (flutua/anda); gira levemente** — onde: «Eu baixo o preço?». Gancho: `fx-doubt-float`.
- **pisca / aparece e some** — onde: «TAMBÉM INCLUÍDO NA SUA MENTORIA». Gancho: `fx-piscar-medio`.
- **pisca / aparece e some** — onde: «SEU DESCONTO EXPIRARÁ ASSIM QUE ESTA PÁGINA FOR ENCERRADA». Gancho: `fx-piscar-medio`.
- **transição suave ao interagir** — onde: «Já comprei o SLL. O que a mentoria acrescenta? O SLL te entrega o méto». Gancho: `fx-closing-faq-details`.
- **transição suave ao interagir** — onde: «Já comprei o SLL. O que a mentoria acrescenta?». Gancho: `fx-closing-faq-summary`.
- **transição suave ao interagir** — onde: «Já comprei o SLL. O que a mentoria acrescenta?». Gancho: `fx-closing-faq-summary-after`.
- **desloca o elemento (flutua/anda); pisca / aparece e some** — onde: «O SLL te entrega o método. A mentoria aproxima você do momento de usar». Gancho: `fx-faq-revelar`.
- **Scripts** (1): confetti ao carregar, e o que mais o original roda em JavaScript. Dependem de: `#checkout-cta`, `#confetti`, `#notice`, `#notice-text`, `.letter-intro-doubts` — o `efeitos.js` já cria sozinho o que faltar.

## Passo 1 — colar o CSS (as animações)

Passo 1.1: abra a página no editor (Sites → Funnels → o funil → a etapa → botão azul **Edit page**, canto superior direito).
Passo 1.2: na barra de ferramentas cinza do alto, conte os desenhos do segundo grupo: **o sexto** é o de CSS
(etiqueta "Custom CSS" ao passar o mouse). Clique nele. Abre um painel com uma caixa de texto grande.
Passo 1.3: abra o arquivo `efeitos.css`, selecione tudo, copie, e cole dentro dessa caixa. Clique em salvar no painel.

## Passo 2 — colar o JavaScript (confetti e outros)

Passo 2.1: na mesma barra, **o quinto** desenho é o de código/tracking (etiqueta "Tracking code"). Clique nele.
Passo 2.2: aparecem duas caixas, uma para o cabeçalho e outra para o rodapé. Na do **rodapé** (footer), cole:
```
<script>
(cole aqui TODO o conteúdo de efeitos.js)
</script>
```
Passo 2.3: salve no painel.

## Passo 3 — dar o gancho a cada elemento animado

Uma animação só pega no elemento que tiver a classe dela. Como a classe do original pode não ter sobrevivido
à importação, o CSS colado também aceita um gancho que você dá à mão:

Passo 3.1: clique no elemento na página (ele ganha borda azul e o painel da direita mostra as opções dele).
Passo 3.2: no painel da direita, procure a aba/faixa **Avançado** (Advanced) e o campo **Classe personalizada**
(Custom class / CSS class). Digite o gancho da tabela acima (ex.: `fx-doubt-float`) e confirme.
Passo 3.3: repita para cada elemento da lista. Blocos que entraram na página como IMAGEM (recorte) não
animam por definição — para animar, o bloco precisa ser refeito como elemento e receber o gancho.

## Passo 4 — conferir

Salve (disquete) e depois Publish. Abra a página publicada e veja cada efeito da lista acima acontecendo.
Se algum não aparecer: clique no elemento, confira que o gancho está no campo; e no CSS, que o seletor
com `.fx-…` está lá. Se mesmo assim não pegar, o campo de classe pode ter outro nome no seu editor —
procure por "class" no painel do elemento.
