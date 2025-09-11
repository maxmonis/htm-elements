import "./toast.css"
import { getTransitionDuration } from "./utils"

/**
 * A toast is a small, non-disruptive message that appears on the screen to provide feedback to the user, appearing for a short duration and then disappearing automatically.
 * To use the toast component, you can create an instance of the `Toast` class and call the `show` method with the desired content and options.
 * Example usage:
 * ```ts
 * let toast = new Toast()
 * toast.show("This is a toast message", { duration: 5000, position: "top-right", variant: "success" })
 * ```
 * When you initialize the `Toast` class, you can provide default options that will be used for all toasts unless overridden in the `show` method.
 */
export class Toast extends HTMLElement {
  role = "alert"

  private readonly defaultDuration: NonNullable<Options["duration"]>
  private readonly defaultPosition: NonNullable<Options["position"]>

  private onHide: Options["onHide"]
  private timeout: null | ReturnType<typeof setTimeout> = null
  private transitionDuration = getTransitionDuration(this)

  /**
   * @param defaultOptions.duration the duration of the toast in milliseconds (default is 3000)
   * @param defaultOptions.position the position of the toast on the screen (default is bottom-right)
   */
  constructor(defaultOptions?: Omit<Options, "onHide" | "variant">) {
    super()

    this.defaultDuration = defaultOptions?.duration ?? 3000
    this.defaultPosition = defaultOptions?.position ?? "bottom-right"

    this.className = "htm-toast"
  }

  connectedCallback() {
    this.transitionDuration = getTransitionDuration(this)
  }

  disconnectedCallback() {
    delete this.onHide

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
        this.onHide?.()
        this.remove()
        resolve(true)
      }, this.transitionDuration)
    })
  }

  /**
   * @param innerHTML the content of the toast, either a string or stringified HTML
   * @param options.duration the duration of the toast in milliseconds (default is 3000)
   * @param options.onHide callback for when the toast is removed from the screen
   * @param options.position the position of the toast on the screen (default is bottom-right)
   * @param options.variant applies a red, blue, or green background with white text
   */
  async show(
    innerHTML: string,
    options?: {
      duration?: number
      onHide?: () => void
      position?:
        | "bottom-center"
        | "bottom-left"
        | "bottom-right"
        | "top-center"
        | "top-left"
        | "top-right"
      variant?: "danger" | "info" | "success"
    }
  ) {
    await this.hide()

    this.innerHTML = innerHTML

    this.onHide = options?.onHide

    this.classList.add(
      ...(options?.position ?? this.defaultPosition).split("-")
    )

    if (options?.variant) this.classList.add(options.variant)

    document.body.append(this)

    this.timeout = setTimeout(() => {
      this.classList.add("enter")
      this.timeout = setTimeout(() => {
        this.hide()
      }, options?.duration ?? this.defaultDuration)
    }, 50)
  }
}

customElements.define("htm-toast", Toast)

type Options = NonNullable<Parameters<Toast["show"]>[1]>
