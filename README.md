# HTM Elements

An unopinionated set of drop-in web components (confetti, spinner, toast) built
with TypeScript and no framework.

## Installation

```bash
npm install htm-elements
```

## Setup

Be sure to import the index CSS file in either TS/JS:

```ts
import "htm-elements/style.css"
```

...or CSS:

```css
@import "htm-elements/style.css";
```

You only need to import it once if you're using an SPA, and once per page if
it's an MPA (only in pages which use this dependency).

## Elements

### Confetti

Displays animated confetti for ten seconds when its `start` method is called.

```ts
import { Confetti } from "htm-elements"

let confetti = new Confetti()
confetti.start()
```

```html
<htm-confetti></htm-confetti>
```

### Spinner

Displays an animated loading spinner. Accepts a size argument which is the
height and width of your desired spinner in pixels.

NOTE: the pixel value will be updated based on the value of one rem. For
example, if you pass 32 and your root font-size is 16px, the computed size will
be 32px. However, if you pass 32 and your root font-size is 14px, the computed
size will be 28px.

```ts
import { Spinner } from "htm-elements"

let spinner = new Spinner(40)
document.body.append(spinner)
```

```html
<htm-spinner></htm-spinner>
```

### Toast

Appears onscreen and displays a message to the user, then automatically removes
itself. When you instantiate the class you can optionally pass in a default
`duration` and/or `position`. All toasts will inherit these defaults, which can
be overriden when you call the `show` message to display a toast. If no position
is passed, toasts will appear in the bottom right. If no duration is passed,
toasts will be removed after 3000ms.

When calling `show` you can optionally pass a config object as the second
argument, which can include `duration` and/or `position` and can also include a
`variant` (to change the color of the toast) and/or an `onHide` callback (which
will run when the toast is removed from the screen).

You can manually hide the toast using its `hide` method.

Valid positions are "bottom-center", "bottom-left", "bottom-right",
"top-center", "top-left", and "top-right".

Valid variants are "danger" (sets background to --htm-bg-danger, which is red by
default), "info" (sets background to --htm-bg-info, which is blue by default),
and "success" (sets background to --htm-bg-success, which is green by default).
Toasts with a variant have white text by default.

```ts
import { Toast } from "htm-elements"

let toast = new Toast({ position: "top-center" })
toast.show("Hello world!", { duration: 2500 })
```

```html
<htm-toast></htm-toast>
```

## Customization

Here are the CSS vars used by this project, along with their defaults:

```css
--htm-bg-danger: #991b1b; /* red background color */
--htm-bg-info: #1e40af; /* blue background color */
--htm-bg-success: #166534; /* green background color */
--htm-bg: white; /* background color */
--htm-border: black; /* border color */
--htm-duration: 250ms; /* duration of animations and transitions (must use ms) */
--htm-fg: black; /* text color */
--htm-radius: 0.5rem; /* border radius */
--htm-spacing: 1.25rem; /* base spacing unit */
```

You can override these by setting them in your own CSS (typically in the
`:root`), and can also add specific values for individual elements. For example,
if you want to change the colors of the toast and its variants:

```css
htm-toast {
  --htm-bg-danger: hsl(0, 74%, 42%);
  --htm-bg-info: hsl(224, 76%, 48%);
  --htm-bg-success: hsl(142.8, 64.2%, 24.1%);
  --htm-bg: var(--color-light);
  --htm-fg: var(--color-dark);
}
```

It's easy to override any element's styling as well, for example:

```css
htm-toast {
  font-size: 0.875rem;
  text-align: center;
}
```

## License

This project is licensed under the MIT License.
