# Animation

The animation helper allows applying simple animations to UI elements.

👉 Remember that non-block inline elements (ie. an unstyled `span` or elements
that have `display: inline`) cannot be animated.

```docoff-react-preview
<p>
  <code className="mr-3">.animation-spin-clockwise</code>
  <span className="d-inline-flex animation-spin-clockwise">
    <rui-icon icon="loading" />
  </span>
</p>
<p>
  <code className="mr-3">.animation-spin-counterclockwise</code>
  <span className="d-inline-flex animation-spin-counterclockwise">
    <rui-icon icon="loading" />
  </span>
</p>
```
