/**
 * Déplacement à la première personne.
 *
 * Pas de pointer lock : on regarde en glissant (souris ou doigt) et on avance
 * au clavier ou au joystick tactile. Sur une page de visite d'un bien, capturer
 * le curseur fait fuir la moitié des visiteurs — un drag classique passe partout.
 */
import * as THREE from 'three'
import { LEVELS } from '../villa/plan.js'
import { nearestWalkable, slide } from './walkable.js'

const SPEED = 2.6 // m/s
const RUN = 4.4
const EYE = 1.62
const LOOK_SPEED = 0.0032

export class WalkControls {
  constructor(camera, dom) {
    this.camera = camera
    this.dom = dom
    this.level = 0
    this.pos = new THREE.Vector2(12.5, 1.2)
    this.yaw = 0
    this.pitch = 0
    this.keys = new Set()
    this.enabled = true
    this.touch = { x: 0, y: 0 } // joystick virtuel, -1..1

    this._dragging = false
    this._last = { x: 0, y: 0 }

    this._onDown = (e) => {
      if (!this.enabled) return
      this._dragging = true
      const p = pointer(e)
      this._last = p
      dom.setPointerCapture?.(e.pointerId)
    }
    this._onMove = (e) => {
      if (!this._dragging || !this.enabled) return
      const p = pointer(e)
      this.yaw -= (p.x - this._last.x) * LOOK_SPEED * 2
      this.pitch -= (p.y - this._last.y) * LOOK_SPEED * 2
      this.pitch = THREE.MathUtils.clamp(this.pitch, -1.2, 1.2)
      this._last = p
    }
    this._onUp = (e) => {
      this._dragging = false
      dom.releasePointerCapture?.(e.pointerId)
    }
    this._onKey = (down) => (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return
      const k = e.key.toLowerCase()
      if (['w', 'a', 's', 'd', 'z', 'q', 'shift', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        e.preventDefault()
        down ? this.keys.add(k) : this.keys.delete(k)
      }
    }
    this._kd = this._onKey(true)
    this._ku = this._onKey(false)

    dom.addEventListener('pointerdown', this._onDown)
    dom.addEventListener('pointermove', this._onMove)
    dom.addEventListener('pointerup', this._onUp)
    dom.addEventListener('pointercancel', this._onUp)
    window.addEventListener('keydown', this._kd)
    window.addEventListener('keyup', this._ku)
  }

  dispose() {
    this.dom.removeEventListener('pointerdown', this._onDown)
    this.dom.removeEventListener('pointermove', this._onMove)
    this.dom.removeEventListener('pointerup', this._onUp)
    this.dom.removeEventListener('pointercancel', this._onUp)
    window.removeEventListener('keydown', this._kd)
    window.removeEventListener('keyup', this._ku)
  }

  /** Téléporte au point le plus proche praticable et oriente vers `look`. */
  goTo(level, [x, y], look) {
    this.level = level
    const [px, py] = nearestWalkable(level, x, y)
    this.pos.set(px, py)
    // La caméra three.js regarde -Z ; le plan a +Y = nord = +Z monde, d'où les signes.
    if (look) this.yaw = Math.atan2(-(look[0] - px), -(look[1] - py))
    this.pitch = 0
    this.sync()
  }

  update(dt) {
    if (!this.enabled) return
    const k = this.keys
    let fwd = 0
    let str = 0
    if (k.has('w') || k.has('z') || k.has('arrowup')) fwd += 1
    if (k.has('s') || k.has('arrowdown')) fwd -= 1
    if (k.has('d') || k.has('arrowright')) str += 1
    if (k.has('a') || k.has('q') || k.has('arrowleft')) str -= 1
    fwd += this.touch.y
    str += this.touch.x

    if (fwd || str) {
      const len = Math.hypot(fwd, str) || 1
      const v = (k.has('shift') ? RUN : SPEED) * dt
      // avant = (-sin, -cos) ; droite = (-cos, +sin)
      const sin = Math.sin(this.yaw)
      const cos = Math.cos(this.yaw)
      const dx = ((fwd / len) * -sin + (str / len) * -cos) * v
      const dy = ((fwd / len) * -cos + (str / len) * sin) * v
      const [nx, ny] = slide(this.level, [this.pos.x, this.pos.y], dx, dy)
      this.pos.set(nx, ny)
    }
    this.sync()
  }

  sync() {
    const base = LEVELS[this.level].base
    this.camera.position.set(this.pos.x, base + EYE, this.pos.y)
    this.camera.rotation.set(0, 0, 0)
    this.camera.rotateY(this.yaw)
    this.camera.rotateX(this.pitch)
  }

  get heading() {
    return this.yaw
  }
}

function pointer(e) {
  return { x: e.clientX, y: e.clientY }
}
