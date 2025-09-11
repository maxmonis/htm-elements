export function getTransitionDuration(element: HTMLElement) {
  return parseInt(getVariableValue(element, "--htm-duration")) || 250
}

function getVariableValue(element: HTMLElement, key: string) {
  return getComputedStyle(element).getPropertyValue(key)
}
