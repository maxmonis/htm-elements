import "./confetti.css"

/**
 * Exposes a start method which shows confetti falling from the top of the viewport for 10 seconds
 */
export class Confetti extends HTMLElement {
  static tag = "htm-confetti"

  private readonly canvas = document.createElement("canvas")
  private readonly ctx: CanvasRenderingContext2D

  private animationFrameId: number | null = null
  private particles: Array<Particle> = []

  constructor() {
    super()

    this.ctx = this.canvas.getContext("2d")!

    this.append(this.canvas)
  }

  connectedCallback() {
    this.handleResize()

    addEventListener("resize", this.handleResize)
  }

  disconnectedCallback() {
    removeEventListener("resize", this.handleResize)
  }

  private handleResize = () => {
    this.canvas.height = innerHeight
    this.canvas.width = innerWidth
  }

  private renderParticles = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles = this.particles.filter(
      p => p.opacity && p.y < this.canvas.height
    )

    for (let particle of this.particles) {
      particle.update()
      particle.draw()
    }

    if (this.particles.length)
      this.animationFrameId = requestAnimationFrame(this.renderParticles)
    else {
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  /**
   * Shows confetti falling from the top of the viewport for 10 seconds
   */
  start() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

    document.body.prepend(this)

    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)

    let count = innerWidth / 2
    for (let i = 0; i < count; i++) this.particles.push(new Particle(this.ctx))

    this.renderParticles()

    setTimeout(() => {
      this.remove()
    }, 10_000)
  }
}

class Particle {
  opacity: number
  y: number

  private readonly ctx: CanvasRenderingContext2D

  private readonly color: string
  private readonly rotationSpeed: number
  private readonly size: number
  private readonly speedX: number
  private readonly speedY: number

  private rotation: number
  private x: number

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`
    this.opacity = 1

    this.rotation = Math.random() * 360
    this.rotationSpeed = Math.random() * 10 - 5

    this.size = Math.random() * 10 + 5

    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 5 + 2

    this.x = Math.random() * innerWidth
    this.y = Math.random() * innerHeight - innerHeight
  }

  draw() {
    this.ctx.save()
    this.ctx.translate(this.x, this.y)
    this.ctx.rotate((this.rotation * Math.PI) / 180)

    this.ctx.globalAlpha = this.opacity
    this.ctx.fillStyle = this.color

    this.ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
    this.ctx.restore()
  }

  update() {
    this.y += this.speedY
    this.x += this.speedX
    this.rotation += this.rotationSpeed

    this.opacity = 1 - this.y / innerHeight
    if (this.opacity < 0) this.opacity = 0
  }
}
