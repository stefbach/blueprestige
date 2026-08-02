import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

import { LEVELS, VIEWPOINTS, roomById } from './villa/plan.js'
import { buildShell } from './villa/model.js'
import { STAGING_VARIANTS, buildStaging } from './villa/staging.js'
import { Plan2D } from './viewer/plan2d.js'
import { WalkControls } from './viewer/walkControls.js'
import './style.css'

const canvas = document.getElementById('view')

// ─── Rendu ────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.05
renderer.outputColorSpace = THREE.SRGBColorSpace

const scene = new THREE.Scene()
scene.background = new THREE.Color('#a9c8de')
scene.fog = new THREE.Fog('#a9c8de', 40, 120)

const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture

const camera = new THREE.PerspectiveCamera(62, 1, 0.05, 400)

// ─── Éclairage ────────────────────────────────────────────────────
scene.add(new THREE.HemisphereLight(0xd8ecff, 0x6d6a5e, 1.5))

const sun = new THREE.DirectionalLight(0xfff2dc, 2.4)
sun.position.set(-16, 22, -14) // soleil au nord-ouest : lumière rasante sur la façade jardin
sun.castShadow = true
sun.shadow.mapSize.set(2048, 2048)
sun.shadow.camera.near = 1
sun.shadow.camera.far = 80
sun.shadow.camera.left = -26
sun.shadow.camera.right = 26
sun.shadow.camera.top = 26
sun.shadow.camera.bottom = -26
sun.shadow.camera.updateProjectionMatrix()
sun.shadow.bias = -0.0006
sun.shadow.normalBias = 0.02
scene.add(sun, sun.target)

// ─── Bâti + staging ───────────────────────────────────────────────
const { group: shell } = buildShell()
scene.add(shell)

const roof = shell.getObjectByName('roof')

let staging = null
function setStaging(variant) {
  if (staging) {
    scene.remove(staging)
    staging.traverse((o) => {
      o.geometry?.dispose?.()
      if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose?.())
      else o.material?.dispose?.()
    })
  }
  staging = variant === 'vide' ? null : buildStaging(variant)
  if (staging) scene.add(staging)
}

// ─── Caméras : visite (1re personne) et maquette (orbite) ─────────
const walk = new WalkControls(camera, canvas)
const orbit = new OrbitControls(camera, canvas)
orbit.enableDamping = true
orbit.dampingFactor = 0.08
orbit.maxPolarAngle = Math.PI / 2.08
orbit.minDistance = 6
orbit.maxDistance = 70
orbit.enabled = false

let mode = 'walk'
let level = 0

function setMode(next) {
  mode = next
  const dollhouse = mode === 'dollhouse'
  walk.enabled = !dollhouse
  orbit.enabled = dollhouse
  if (roof) roof.visible = !dollhouse
  scene.fog = dollhouse ? null : new THREE.Fog('#a9c8de', 40, 120)

  if (dollhouse) {
    camera.position.set(30, 22, 30)
    orbit.target.set(7, 2.5, 5.3)
    orbit.update()
  } else {
    walk.sync()
  }
  document.querySelectorAll('[data-mode]').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.mode === mode)
  })
  canvas.classList.toggle('is-walk', !dollhouse)
}

function setLevel(next) {
  level = next
  walk.level = next
  plan.setLevel(next)
  document.querySelectorAll('[data-level]').forEach((b) => {
    b.classList.toggle('is-active', Number(b.dataset.level) === level)
  })
  renderViewpoints()
  if (mode === 'walk') {
    const vp = VIEWPOINTS.find((v) => v.level === next)
    if (vp) walk.goTo(vp.level, vp.pos, vp.look)
  }
}

// ─── Plan interactif ──────────────────────────────────────────────
const plan = new Plan2D(document.getElementById('plan'), (roomId) => {
  const room = roomById[roomId]
  if (!room) return
  if (room.level !== level) setLevel(room.level)
  if (mode !== 'walk') setMode('walk')
  const cx = (room.x0 + room.x1) / 2
  const cy = (room.y0 + room.y1) / 2
  walk.goTo(room.level, [cx, cy], [cx, room.y0])
  showRoomInfo(roomId)
})

function showRoomInfo(roomId) {
  const room = roomById[roomId]
  const host = document.getElementById('room-info')
  if (!room) {
    host.hidden = true
    return
  }
  host.hidden = false
  host.querySelector('h3').textContent = room.name
  host.querySelector('.room-meta').textContent =
    `${((room.x1 - room.x0) * (room.y1 - room.y0)).toFixed(1)} m² · ${(room.x1 - room.x0).toFixed(2)} × ${(room.y1 - room.y0).toFixed(2)} m`
  host.querySelector('.room-note').textContent = room.note ?? ''
  plan.highlight(roomId)
}

// ─── Interface ────────────────────────────────────────────────────
function renderViewpoints() {
  const host = document.getElementById('viewpoints')
  host.replaceChildren()
  for (const vp of VIEWPOINTS.filter((v) => v.level === level)) {
    const b = document.createElement('button')
    b.className = 'chip'
    b.textContent = vp.label
    b.addEventListener('click', () => {
      if (mode !== 'walk') setMode('walk')
      walk.goTo(vp.level, vp.pos, vp.look)
      showRoomInfo(vp.id)
    })
    host.appendChild(b)
  }
}

const stagingSelect = document.getElementById('staging')
for (const v of [...STAGING_VARIANTS, { id: 'vide', label: 'Sans mobilier' }]) {
  const o = document.createElement('option')
  o.value = v.id
  o.textContent = v.label
  stagingSelect.appendChild(o)
}
stagingSelect.value = 'actuel'
stagingSelect.addEventListener('change', () => setStaging(stagingSelect.value))

document.querySelectorAll('[data-mode]').forEach((b) =>
  b.addEventListener('click', () => setMode(b.dataset.mode))
)
document.querySelectorAll('[data-level]').forEach((b) =>
  b.addEventListener('click', () => setLevel(Number(b.dataset.level)))
)

const hourSlider = document.getElementById('hour')
function setHour(h) {
  // course du soleil approximée pour l'île Maurice (~20° S) : est le matin, ouest le soir
  const t = (h - 6) / 12 // 0 au lever, 1 au coucher
  const a = Math.PI * THREE.MathUtils.clamp(t, 0, 1)
  const elev = Math.sin(a)
  sun.position.set(Math.cos(a) * -26, Math.max(2, elev * 26), -10 - elev * 6)
  sun.intensity = 0.5 + elev * 2.4
  const warm = new THREE.Color().setHSL(0.09, 0.55 - elev * 0.35, 0.5 + elev * 0.4)
  sun.color.copy(warm)
  const sky = new THREE.Color().setHSL(0.57, 0.35 + elev * 0.15, 0.35 + elev * 0.45)
  scene.background = sky
  if (scene.fog) scene.fog.color = sky
  document.getElementById('hour-label').textContent = `${String(h).padStart(2, '0')}h00`
}
hourSlider.addEventListener('input', () => setHour(Number(hourSlider.value)))

// joystick tactile
const stick = document.getElementById('stick')
let stickId = null
stick.addEventListener('pointerdown', (e) => {
  stickId = e.pointerId
  stick.setPointerCapture(e.pointerId)
})
stick.addEventListener('pointermove', (e) => {
  if (e.pointerId !== stickId) return
  const r = stick.getBoundingClientRect()
  const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
  const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
  walk.touch.x = THREE.MathUtils.clamp(dx, -1, 1)
  walk.touch.y = THREE.MathUtils.clamp(-dy, -1, 1)
  stick.querySelector('.stick-knob').style.transform =
    `translate(${walk.touch.x * 26}px, ${-walk.touch.y * 26}px)`
})
const resetStick = (e) => {
  if (e.pointerId !== stickId) return
  stickId = null
  walk.touch.x = walk.touch.y = 0
  stick.querySelector('.stick-knob').style.transform = ''
}
stick.addEventListener('pointerup', resetStick)
stick.addEventListener('pointercancel', resetStick)

document.getElementById('panel-toggle').addEventListener('click', () => {
  document.body.classList.toggle('panel-open')
})

// ─── Boucle ───────────────────────────────────────────────────────
function resize() {
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  if (canvas.width === w && canvas.height === h) return
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

const clock = new THREE.Clock()
function tick() {
  requestAnimationFrame(tick)
  resize()
  const dt = Math.min(clock.getDelta(), 0.1)
  if (mode === 'walk') {
    walk.update(dt)
    plan.setPose(walk.pos.x, walk.pos.y, walk.yaw, walk.level === plan.level)
    sun.target.position.set(walk.pos.x, LEVELS[level].base, walk.pos.y)
  } else {
    plan.setPose(0, 0, 0, false)
    orbit.update()
    sun.target.position.set(7, 1.5, 5.3)
  }
  sun.target.updateMatrixWorld()
  renderer.render(scene, camera)
}

// ─── Démarrage ────────────────────────────────────────────────────
setStaging('actuel')
setHour(15)
hourSlider.value = 15
setLevel(0)
setMode('walk')
walk.goTo(0, VIEWPOINTS[0].pos, VIEWPOINTS[0].look)
showRoomInfo('entree')
document.getElementById('loading').remove()
tick()
