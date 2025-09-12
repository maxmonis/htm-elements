import { Confetti } from "./confetti"
import { Spinner } from "./spinner"
import { Toast } from "./toast"

for (let Element of [Confetti, Spinner, Toast])
  customElements.define(Element.tag, Element)

export { Confetti, Spinner, Toast }
