# Three.js + Sketchfab Viewer com Vite

Projeto de atividade prática implementando uma cena 3D interativa na web utilizando **Three.js**, **Sketchfab** e **Vite**.

## Objetivo

Implementar uma cena 3D interativa que:
- Carrega um modelo 3D do Sketchfab via GLTFLoader
- Permite manipulação de câmera (rotação, zoom e pan) via mouse/touch
- Implementa iluminação adequada (luz ambiente + luz direcional)
- Utiliza `requestAnimationFrame` para loop de animação
- Adapta-se ao redimensionamento da janela

## Critérios de Avaliação ✓

- [x] **Modelo Sketchfab carregado via GLTFLoader** (5 pts)
  - Modelo carregado corretamente sem erros no console
  - Suporte a formatos GLB/GLTF

- [x] **OrbitControls funcionando** (5 pts)
  - Rotação com mouse (botão esquerdo)
  - Zoom com scroll do mouse
  - Pan com botão direito

- [x] **Iluminação adequada** (4 pts)
  - Luz ambiente: `AmbientLight(0xffffff, 0.5)`
  - Luz direcional: `DirectionalLight(0xffffff, 0.8)` com sombras
  - Posicionamento estratégico para melhor visualização

- [x] **Loop de animação com requestAnimationFrame** (3 pts)
  - Implementado corretamente na função `animate()`
  - Atualização contínua de controles e render

- [x] **Resize handler** (2 pts)
  - Câmera se adapta ao redimensionamento
  - Canvas se redimensiona corretamente

- [x] **Código legível e bem nomeado** (1 pt)
  - Variáveis descritivas
  - Comentários explicativos
  - Estrutura organizada

## Tecnologias

- **Vite**: Build tool rápido para desenvolvimento
- **Three.js**: Biblioteca 3D WebGL
- **OrbitControls**: Controle intuitivo de câmera
- **GLTFLoader**: Carregador de modelos GLTF/GLB

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview
```

## Estrutura do Projeto

```
.
├── index.html           # Entrada HTML
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
└── src/
    ├── main.js          # Lógica principal (Three.js, controles, animação)
    └── style.css        # Estilos da aplicação
```

## Controles

| Ação | Controle |
|------|----------|
| **Rotacionar** | Clique + arraste (botão esquerdo) |
| **Zoom** | Scroll do mouse / Wheel |
| **Pan** | Clique + arraste (botão direito) |

## Como Usar Seu Próprio Modelo Sketchfab

1. Acesse [Sketchfab.com](https://sketchfab.com)
2. Escolha um modelo com licença permitida (ex: CC Attribution)
3. Clique em "Download" e selecione formato **GLB** ou **GLTF**
4. No `src/main.js`, procure pela linha:
   ```javascript
   const modelUrl = 'https://models.readyplayer.me/629b8bfd01c97201a12c1c7e.glb'
   ```
5. Substitua a URL pela URL do seu modelo

## Funcionalidades Implementadas

### Cena e Câmera
- PerspectiveCamera com aspecto responsivo
- Posicionamento inicial em (0, 0, 5)
- Atualização automática ao redimensionar janela

### Iluminação
- Luz ambiente para iluminação geral
- Luz direcional com sombras dinâmicas
- Sombras ativadas em todos os meshes

### Carregamento de Modelo
- GLTFLoader com suporte a animações
- Fallback visual (cubo verde) se modelo não carregar
- Centralização automática do modelo
- Escala ajustável

### Controles
- OrbitControls com damping para movimento suave
- Suporte a mouse e touch
- Zoom, rotação e pan habilitados

### Performance
- Pixel ratio responsivo
- Antialiasing habilitado
- Shadow map otimizado (2048x2048)

## Console Logs

Ao executar, você verá no console:
```
🎬 Three.js + Sketchfab Viewer iniciado!
📋 Controles:
  • Clique e arraste com botão esquerdo: Rotacionar
  • Scroll/Wheel: Zoom
  • Clique e arraste com botão direito: Pan
```

## Troubleshooting

### Modelo não carrega
- Verifique se a URL é válida e públicos
- Abra o console (F12) para ver mensagens de erro
- Certifique-se de que o modelo está em formato GLTF/GLB

### Performance baixa
- Reduza `shadowMap.mapSize` em `main.js`
- Diminua a complexidade do modelo
- Desative antialiasing se necessário

### Câmera não responde
- Verifique se `OrbitControls` está ativado
- Clique no canvas antes de interagir
- Recarregue a página

## Autor

Projeto desenvolvido como atividade prática de Three.js + Sketchfab com Vite.

## Licença

MIT
