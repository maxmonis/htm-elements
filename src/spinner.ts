import "./spinner.css"

/**
 * Renders a loading spinner, or "Loading..." if the user prefers reduced motion
 */
export class Spinner extends HTMLElement {
  static tag = "htm-spinner"

  ariaBusy = "true"
  role = "alert"

  private readonly size: number

  private spinner = spinner

  /**
   * @param size the height and width of the spinner in pixels, automatically updated to reflect base font size (rem)
   * @param options.hideLoadingText hide the "Loading..." text (not recommended for accessibility)
   */
  constructor(size: number, options?: { hideLoadingText?: boolean }) {
    super()

    this.size = size

    this.append(this.spinner)

    if (!options?.hideLoadingText) this.append(text)
  }

  connectedCallback() {
    this.handleResize()

    addEventListener("resize", this.handleResize)
  }

  disconnectedCallback() {
    removeEventListener("resize", this.handleResize)
  }

  private handleResize = () => {
    let rem = parseInt(getComputedStyle(document.documentElement).fontSize)
    let pixels = rem == 16 ? this.size : (rem / 16) * this.size
    let size = pixels.toString()

    this.spinner.setAttribute("height", size)
    this.spinner.setAttribute("width", size)
  }
}

let spinner = document.createElementNS("http://www.w3.org/2000/svg", "svg")
spinner.setAttribute("preserveAspectRatio", "xMidYMid")
spinner.setAttribute("viewBox", "0 0 100 100")

let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
rect.setAttribute("fill", "none")
rect.setAttribute("height", "100")
rect.setAttribute("width", "100")
rect.setAttribute("x", "0")
rect.setAttribute("y", "0")

let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
circle.setAttribute("cx", "50")
circle.setAttribute("cy", "50")
circle.setAttribute("fill", "none")
circle.setAttribute("r", "40")
circle.setAttribute("stroke-linecap", "round")
circle.setAttribute("stroke-width", "12")
circle.setAttribute("stroke", "currentColor")

spinner.append(rect, circle)

let text = document.createElement("p")
text.textContent = "Loading..."
