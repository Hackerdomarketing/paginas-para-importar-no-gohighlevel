# Efeitos do original (animações e scripts) — para colar no GoHighLevel

O importador joga fora o <head> inteiro: nenhuma animação nem script atravessa pelo HTML. Estes arquivos
são os efeitos do original, prontos para os campos de código próprio do editor.

## Onde colar

- `efeitos.css` → editor → barra de ferramentas → botão **custom-css** (o sexto: add-elements | animationBtn |
  layers | pages | tracking-code | **custom-css** | typography | …). Cole tudo e salve.
- `efeitos.js` → mesmo lugar, botão **tracking-code** (o quinto), na parte do rodapé/corpo. Cole dentro de
  `<script>…</script>`. Salve.

## Animações CSS (cada uma só pega se o elemento alvo existir na página importada com a classe)

- `@keyframes progress-stripes` → usada por: `.progress span`
- `@keyframes progress-light` → usada por: `.progress span:after`
- `@keyframes doubt-float` → usada por: `.letter-intro-doubts li`
- `@keyframes piscar-medio` → usada por: `.resource-eyebrow`, `.offer-scarcity .offer-scarcity-final`
- `@keyframes faq-revelar` → usada por: `.closing-faq details[open] > p`

Regras que animam/transicionam (seletor → declaração):

- `.progress span` → `display:flex;align-items:center;justify-content:center;width:66.6667%;height:100%;font-size:9px;line-height:1;font-weigh`
- `.progress span:after` → `content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(105deg,transparent 25%,#ffffff55 5`
- `.play` → `position:absolute;left:50%;top:61%;transform:translate(-50%,-50%);width:78px;height:78px;background:#8653e7e0;border:5px`
- `.buy` → `background:linear-gradient(105deg,#92f961,#c0ff97);border:1px solid #d2ffb787;border-bottom:4px solid #77b946;border-rad`
- `.decline` → `display:block;width:100%;min-height:44px;margin-top:10px;background:color-mix(in oklch,var(--foreground) 10%,var(--backg`
- `.letter-intro-doubts li` → `--float-x-a:-4px;--float-y-a:2px;--float-x-b:5px;--float-y-b:-5px;--float-x-c:-2px;--float-y-c:4px;--float-rotate-a:-1de`
- `.resource-eyebrow` → `animation:piscar-medio .85s ease-in-out infinite`
- `.offer-scarcity .offer-scarcity-final` → `animation:piscar-medio .85s ease-in-out infinite`
- `.closing-faq details` → `background:#fff;border:1.5px solid color-mix(in oklch,var(--purple) 18%,var(--background));border-radius:14px;margin-bot`
- `.closing-faq summary` → `position:relative;display:flex;align-items:center;gap:12px;cursor:pointer;min-height:56px;padding:16px 52px 16px 18px;fo`
- `.closing-faq summary::after` → `content:"";position:absolute;right:16px;top:50%;width:26px;height:26px;margin-top:-13px;border-radius:50%;background:col`
- `.closing-faq details[open] > p` → `animation:faq-revelar .28s cubic-bezier(0,0,.2,1) both`

## Scripts

- script inline 1: 7766 caracteres; depende de: `#checkout-cta`, `#confetti`, `#notice`, `#notice-text`, `.letter-intro-doubts`

## Como conferir depois de importar

1. Cole o CSS e o JS, salve, abra a pré-visualização pública (`api.hackfunnels.com.br/preview/<id>`).
2. Para cada efeito acima, veja se o elemento alvo existe com aquela classe/id na página importada
   (Inspecionar). Se a classe sumiu na importação, o efeito não pega — aí é caso de sonda: descobrir qual
   gancho (classe/atributo) o importador preserva e reescrever o seletor para ele.
3. Blocos que viraram imagem na planta (ex.: nuvem de dúvidas) não animam por definição; para animar, o
   bloco precisa voltar a ser elemento com um gancho que sobreviva à importação.