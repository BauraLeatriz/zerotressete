# zerotressete — Ideias de Design

## Contexto
Hub principal para três subdomínios: **tech** (consertos eletrônicos), **dev** (portfólio de desenvolvimento) e **garage** (projetos maker e consertos de carro). Paleta holográfica como referência central.

---

<response>
<idea>
**Design Movement:** Neo-Brutalism com toque Holográfico

**Core Principles:**
- Contraste extremo entre preto profundo e reflexos iridescentes
- Tipografia pesada e assertiva como elemento estrutural
- Bordas e arestas visíveis, sem arredondamentos excessivos
- Cada área tem sua própria "temperatura" de cor dentro do espectro holográfico

**Color Philosophy:**
Fundo quase preto (oklch 0.08) como tela para reflexos holográficos. O efeito holográfico é obtido com gradientes de múltiplas paradas em ângulos variados: ciano → magenta → amarelo → verde. Cada subdomínio herda uma fatia do espectro: tech (ciano-azul), dev (verde-ciano), garage (laranja-magenta).

**Layout Paradigm:**
Grid assimétrico de 3 colunas com alturas variáveis. O hub usa um layout tipo "triptych" onde cada painel representa um subdomínio com peso visual diferente. Sem centralização total — os painéis se alinham à esquerda com offsets intencionais.

**Signature Elements:**
- Texto com gradiente holográfico animado (shimmer effect)
- Linhas de scan horizontais sutis sobre os painéis (estética CRT/holo)
- Números grandes e semi-transparentes como elementos decorativos de fundo

**Interaction Philosophy:**
Hover revela o brilho holográfico completo do painel. Cursor customizado com rastro luminoso. Transições de página com efeito de "scan" horizontal.

**Animation:**
- Shimmer contínuo e suave nos títulos holográficos
- Painéis com parallax leve no scroll
- Entrada dos elementos com fade + slide de baixo para cima (stagger de 150ms)

**Typography System:**
- Display: Space Grotesk Bold (700) para títulos grandes
- Body: DM Mono para textos técnicos e labels
- Accent: Space Grotesk Medium para subtítulos
</idea>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement:** Cyberpunk Editorial Holográfico

**Core Principles:**
- Camadas de profundidade com blur e transparência (glassmorphism seletivo)
- Tipografia condensada e vertical como elemento estrutural
- Ruído/grain sutil sobre gradientes para textura analógica
- Divisões de seção com cortes diagonais em vez de linhas horizontais

**Color Philosophy:**
Base escura (quase azul-marinho profundo, oklch 0.10 com chroma 0.02 em 260°). Destaques holográficos em três tons: #00FFD1 (ciano elétrico), #FF2EFF (magenta neon), #FFE600 (amarelo cromo). O gradiente holográfico aparece como reflexo em superfícies de vidro.

**Layout Paradigm:**
Layout de revista técnica: coluna lateral estreita com numeração e labels verticais, área principal com blocos de conteúdo de larguras variadas. Os três subdomínios aparecem como "capas de revista" sobrepostas em perspectiva isométrica leve.

**Signature Elements:**
- Glassmorphism cards com borda holográfica animada
- Texto rotacionado 90° como label lateral (estilo editorial técnico)
- Scanlines e ruído de grain sobre as imagens

**Interaction Philosophy:**
Cards respondem ao movimento do mouse com efeito de tilt 3D (perspective transform). Hover nos cards revela informações adicionais com slide-up. Clique com ripple holográfico.

**Animation:**
- Tilt 3D nos cards com mouse tracking
- Gradiente holográfico nas bordas com rotação contínua
- Texto de entrada com efeito de "glitch" suave (deslocamento de canal RGB)

**Typography System:**
- Display: Bebas Neue (condensado, impactante) para títulos
- Body: IBM Plex Mono para textos e labels técnicos
- Accent: Syne para subtítulos e navegação
</idea>
<probability>0.07</probability>
</response>

<response>
<idea>
**Design Movement:** Minimal Iridescente — "Liquid Chrome"

**Core Principles:**
- Superfícies limpas com reflexos holográficos como único ornamento
- Espaço negativo generoso como elemento de luxo
- Hierarquia tipográfica extrema (contraste de tamanho 1:12 entre corpo e display)
- Cada subdomínio como uma "gota" de cor diferente no espectro

**Color Philosophy:**
Fundo branco-gelo (oklch 0.97) com sombras muito sutis em lilás. O efeito holográfico aparece apenas em elementos de destaque: logotipo, separadores e bordas de cards ativos. A paleta usa gradientes de baixa saturação no estado padrão e alta saturação no hover.

**Layout Paradigm:**
Três colunas de altura total com proporção áurea (1 : 1.618 : 1). A coluna central é mais larga e contém o logotipo e a navegação principal. As colunas laterais têm os subdomínios tech e garage; dev ocupa a central. Scroll horizontal opcional em mobile.

**Signature Elements:**
- Logotipo "037" com efeito de prisma (dispersão de luz)
- Separadores horizontais com gradiente holográfico de 1px
- Números de seção em tipografia display ultra-light como marca d'água

**Interaction Philosophy:**
Minimalismo cinético: pequenas animações de alta precisão em vez de efeitos grandes. Hover com transição de cor de 300ms. Foco visível com anel holográfico.

**Animation:**
- Gradiente holográfico no logotipo com animação de hue-rotate
- Cards com elevação suave (box-shadow) no hover
- Transições de rota com fade cruzado de 200ms

**Typography System:**
- Display: Clash Display (variável, peso 700) para títulos
- Body: General Sans Regular para corpo de texto
- Mono: Geist Mono para código e labels técnicos
</idea>
<probability>0.06</probability>
</response>

---

## Decisão

**Escolhido: Cyberpunk Editorial Holográfico** (Opção 2)

Justificativa: O conceito de "revista técnica" com glassmorphism e efeitos holográficos se alinha perfeitamente com os três subdomínios — tech (eletrônica), dev (software) e garage (hardware/mecânica). A estética cyberpunk cria uma identidade forte e memorável sem sacrificar a usabilidade.
