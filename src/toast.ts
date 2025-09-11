import "./toast.css"
import { getTransitionDuration } from "./utils"

/**
 * A toast is a small, non-disruptive message that appears on the screen to provide feedback to the user, appearing for a short duration and then disappearing automatically.
 * To use the toast component, you can create an instance of the `Toast` class and call the `show` method with the desired content and options.
 * Example usage:
 * ```ts
 * const toast = new Toast()
 * toast.show("This is a toast message", { duration: 5000, position: "top-right", variant: "success" })
 * ```
 * The `show` method accepts the following parameters:
 * - `innerHTML`: The content of the toast, either a string or stringified HTML.
 * - `options`: An optional object that can include:
 *   - `duration`: The duration of the toast in milliseconds (default is 3000).
 *   - `position`: The position of the toast on the screen (default is "bottom-right"). Possible values are "bottom-center", "bottom-left", "bottom-right", "top-center", "top-left", and "top-right".
 *   - `variant`: Applies a red, blue, or green background with white text. Possible values are "danger", "info", and "success".
 * The toast will automatically hide after the specified duration, but you can also call the `hide` method to remove it manually.
 * When you initialize the `Toast` class, you can provide default options that will be used for all toasts unless overridden in the `show` method.
 */
export class Toast extends HTMLElement {
  role = "alert"

  private readonly defaultDuration: NonNullable<Options["duration"]>
  private readonly defaultPosition: NonNullable<Options["position"]>

  private timeout: null | ReturnType<typeof setTimeout> = null
  private transitionDuration = getTransitionDuration(this)

  /**
   * @param defaultOptions defaults for all toasts which can be overridden when you call show
   * @param defaultOptions.duration the duration of the toast in milliseconds (default is 3000)
   * @param defaultOptions.position the position of the toast on the screen (default is bottom-right)
   */
  constructor(defaultOptions?: Omit<Options, "variant">) {
    super()

    this.defaultDuration = defaultOptions?.duration ?? 3000
    this.defaultPosition = defaultOptions?.position ?? "bottom-right"

    this.className = "htm-toast"
  }

  connectedCallback() {
    this.transitionDuration = getTransitionDuration(this)
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
      }, this.transitionDuration)
    })
  }

  /**
   * @param innerHTML the content of the toast, either a string or stringified HTML
   * @param options.duration the duration of the toast in milliseconds (default is 3000)
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
      }, options?.duration ?? this.defaultDuration)
    }, 50)
  }
}

customElements.define("htm-toast", Toast)

interface Options {
  duration?: number
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right"
  variant?: "danger" | "info" | "success"
}
