import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ========== Configuração de cena, câmera e renderer ==========
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x1a1a1a)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
)
camera.position.set(0, 3, 5)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
document.getElementById('app').appendChild(renderer.domElement)

// ========== Luzes ==========
// Luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Luz direcional
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(5, 10, 5)
directionalLight.castShadow = true
directionalLight.shadow.camera.left = -10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.bottom = -10
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
scene.add(directionalLight)


// ========== OrbitControls ==========
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.autoRotate = false
controls.enableZoom = true
controls.enablePan = true
controls.enabled = true

// ========== Carregador de modelos ==========
const loader = new GLTFLoader()

// URL do modelo GLTF na pasta public/modelo
const modelUrl = '/modelo/scene.gltf'

let loadedModel = null

loader.load(
  modelUrl,
  (gltf) => {
    loadedModel = gltf.scene
    
    // Ajustar escala do modelo
    loadedModel.scale.set(2, 2, 2)
    
    // Centralizar o modelo
    const box = new THREE.Box3().setFromObject(loadedModel)
    const center = box.getCenter(new THREE.Vector3())
    loadedModel.position.sub(center)
    
    // Adicionar à cena
    scene.add(loadedModel)
    
    // Habilitar sombras para todo objeto carregado
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    
    console.log('✓ Modelo carregado com sucesso:', gltf)
  },
  (progress) => {
    const percentComplete = (progress.loaded / progress.total) * 100
    console.log('Carregando modelo: ' + percentComplete.toFixed(2) + '%')
  },
  (error) => {
    console.error('✗ Erro ao carregar modelo:', error)
  }
)

// ========== Handler de redimensionamento ==========
function onWindowResize() {
  const width = window.innerWidth
  const height = window.innerHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
}

window.addEventListener('resize', onWindowResize)

// ========== Loop de animação ==========
function animate() {
  requestAnimationFrame(animate)
  
  // Atualizar OrbitControls com damping
  controls.update()
  
  renderer.render(scene, camera)
}

// Iniciar animação
animate()

// ========== Info no console ==========
console.log('🎬 Three.js + Sketchfab Viewer iniciado!')
console.log('📋 Controles:')
console.log('  • Clique e arraste com botão esquerdo: Rotacionar')
console.log('  • Scroll/Wheel: Zoom')
console.log('  • Clique e arraste com botão direito: Pan')
