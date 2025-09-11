# HTM Elements

An unopinionated set of drop-in web components (toast, etc.) built with
TypeScript and no framework.

🚨🚨🚨 NOT STABLE 🚨🚨🚨 I'm still in the early iteration phase of using this
internally for my own projects and may ship breaking changes. I'll bump the
version to 0.1.0 when I consider it ready for public use.

## Installation

```bash
npm install htm-elements
```

## Usage

Import whichever component(s) you need:

```ts
import { Toast } from "htm-elements"

let toast = new Toast({ position: "top-center" })
toast.show("Hello world!", { duration: 2500 })
```

Be sure you also import the index CSS file in either TS/JS:

```ts
import "htm-elements/style.css"
```

...or CSS:

```css
@import "htm-elements/style.css";
```

You only need to import it once if you're using an SPA, and once per page if
it's an MPA (only in pages which use this dependency).

## Customization

Here are the CSS vars used by this project, along with their defaults:

```css
--htm-bg-danger: #991b1b; /* red background color */
--htm-bg-info: #1e40af; /* blue background color */
--htm-bg-success: #166534; /* green background color */
--htm-bg: white; /* background color */
--htm-border: black; /* border color */
--htm-duration: 250ms; /* duration of animations and transitions (must use ms) */
--htm-fg-danger: #991b1b; /* red text color */
--htm-fg-info: #1e40af; /* blue text color */
--htm-fg-success: #166534; /* green text color */
--htm-fg: black; /* text color */
--htm-radius: 0.5rem; /* border radius */
--htm-spacing: 1.25rem; /* base padding unit */
```

You can override these by setting them in your own CSS (typically in the
`:root`), and can also add specific values for individual elements. For example,
if you want to change the colors of the toast and its variants:

```css
htm-toast {
  --htm-bg-info: hsl(224, 76%, 48%);
  --htm-bg-danger: hsl(0, 74%, 42%);
  --htm-bg-success: hsl(142.8, 64.2%, 24.1%);
  --htm-bg: var(--color-light);
  --htm-fg: var(--color-dark);
}
```

It's easy to override any element's styling as well, the default styles are
applied using the custom element tag so to increase specificity you can either
add your own class or simply use the existing class which matches the name of
the custom element (e.g. the `htm-toast` element also has a class of
`.htm-toast`).

## License

This project is licensed under the MIT License.
