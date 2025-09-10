import "./toast.css"

export class Toast extends HTMLElement {
  role = "alert"

  private readonly defaultDurationMS: NonNullable<Options["durationMS"]>
  private readonly defaultPosition: NonNullable<Options["position"]>

  private timeout: null | ReturnType<typeof setTimeout> = null

  /**
   * @param defaultOptions defaults for all toasts which can be overridden when you call show
   * @param defaultOptions.durationMS the duration of the toast in milliseconds (default is 3000)
   * @param defaultOptions.position the position of the toast on the screen (default is bottom-right)
   */
  constructor(defaultOptions?: Omit<Options, "variant">) {
    super()

    this.defaultDurationMS = defaultOptions?.durationMS ?? 3000
    this.defaultPosition = defaultOptions?.position ?? "bottom-right"

    this.className = "htm-toast"
  }

  disconnectedCallback() {
    this.classList.remove(
      "bottom",
      "center",
      "danger",
      "enter",
      "exit",
      "info",
      "left",
      "right",
      "success",
      "top"
    )
  }

  async hide() {
    if (!document.body.contains(this)) return

    await new Promise(resolve => {
      if (this.timeout) clearTimeout(this.timeout)

      this.classList.add("exit")

      this.timeout = setTimeout(() => {
        this.timeout = null
        this.remove()
        resolve(true)
      }, 250)
    })
  }

  /**
   * @param innerHTML the content of the toast, either a string or stringified HTML
   * @param options.durationMS the duration of the toast in milliseconds (default is 3000)
   * @param options.position the position of the toast on the screen (default is bottom-right)
   * @param options.variant applies a red, blue, or green background with white text
   */
  async show(innerHTML: string, options?: Options) {
    await this.hide()

    this.innerHTML = innerHTML

    this.classList.add(
      ...(options?.position ?? this.defaultPosition).split("-")
    )

    if (options?.variant) this.classList.add(options.variant)

    document.body.append(this)

    this.timeout = setTimeout(() => {
      this.classList.add("enter")
      this.timeout = setTimeout(() => {
        this.hide()
      }, options?.durationMS ?? this.defaultDurationMS)
    }, 50)
  }
}

customElements.define("htm-toast", Toast)

interface Options {
  durationMS?: number
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right"
  variant?: "danger" | "info" | "success"
}
