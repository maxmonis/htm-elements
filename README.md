# HTM Elements

An unopinionated set of drop-in web components (toast, etc.) built with
TypeScript and no framework.

## Installation

```bash
npm install htm-elements
```

## Usage

Import whichever component(s) you need:

```ts
import { Toast } from "htm-elements"

let toast = new Toast()
toast.show("Hello world!")
```

Be sure you also import the index CSS file in either TS:

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

You can specify your default foreground, background, and border colors using CSS
vars:

```css
--htm-fg
--htm-bg
--htm-border
```

You can also add more specific styles for individual elements, for example if
you want to style the toast:

```css
--htm-toast-fg
--htm-toast-bg
--htm-toast-border
```

It's easy to override any element's styling as well, the default styles are
applied using the custom element tag so to increase specificity you can either
add your own class or simply use the existing class which matches the name of
the custom element (e.g. the `htm-toast` element also has a class of
`.htm-toast`).

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE)
file for details.
