# Colors

import { Playground } from 'docz'
import { Placeholder } from '../_components/Placeholder/Placeholder'

Helpers for text and background.

## Text Colors

The text color helpers allow coloring any text with predefined
[text colors](/docs/foundation/colors#text-colors),
[feedback colors](/docs/foundation/colors#feedback-colors), and
[neutral colors](/docs/foundation/colors#neutral-colors).

```docoff-react-preview
  <docoff-placeholder bordered>
    <code className="text-primary">.text-primary</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-primary-disabled">.text-primary-disabled</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-secondary">.text-secondary</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-secondary-disabled">.text-secondary-disabled</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-success">.text-success</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-warning">.text-warning</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-danger">.text-danger</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-help">.text-help</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-info">.text-info</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-note">.text-note</code>
  </docoff-placeholder>
  <docoff-placeholder bordered dark>
    <code className="text-light">.text-light</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="text-dark">.text-dark</code>
  </docoff-placeholder>
```

## Background Colors

The background color helpers allow coloring any element with predefined
[background colors](/docs/foundation/colors#background-colors) (with an
exception to background colors for interactive areas that are intended to be
used only in CSS).

```docoff-react-preview
  <docoff-placeholder bordered>
    <code className="bg-base">.bg-base</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-layer-1">.bg-layer-1</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-layer-2">.bg-layer-2</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-basic">.bg-basic</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-disabled">.bg-disabled</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-primary">.bg-primary</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-secondary">.bg-secondary</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-selected">.bg-selected</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-success">.bg-success</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-warning">.bg-warning</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-danger">.bg-danger</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-help">.bg-help</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-info">.bg-info</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-note">.bg-note</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-light">.bg-light</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code className="bg-dark text-light">.bg-dark</code>
  </docoff-placeholder>
```
