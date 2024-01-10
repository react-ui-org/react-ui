# Toolbar

The responsive Toolbar layout is a versatile tool that allows spacing, grouping,
and aligning inline items.

## Basic Usage

To implement the Toolbar component, you need to import it first:

```js
import { Toolbar, ToolbarItem } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Toolbar>
  <ToolbarItem>
    <docoff-placeholder bordered>Toolbar item</docoff-placeholder>
  </ToolbarItem>
  <ToolbarItem>
    <docoff-placeholder bordered>Toolbar item</docoff-placeholder>
  </ToolbarItem>
  <ToolbarItem>
    <docoff-placeholder bordered>Toolbar item</docoff-placeholder>
  </ToolbarItem>
</Toolbar>
```

See [API](#api) for all available options.

## General Guidelines

- **Toolbar is great for flexible inline layouts.** For stacking your content
  vertically or building two-dimensional layouts head to the [Grid][grid]
  layout.

- **Wrap your items** into the ToolbarItem component. This ensures your content
  is properly spaced and aligned with other Toolbar elements. Do **not** try to
  put any custom HTML or React components directly into the Toolbar layout
  without wrapping it with the ToolbarItem first.

- **Be careful with using Toolbar with long or dynamic items in narrow
  containers.** Toolbar intentionally prevents its items from shrinking using
  `flex: none` which may cause overflow in case of lack of horizontal space.
  Depending on your situation, consider turning on the `nowrap` option
  (which allows shrinking of items but disables Toolbar from wrapping), using
  the [Text][text] component to precisely control text wrapping, or switching to
  the [Grid][grid] layout.

## Alignment

You can tweak your Toolbar layout using rich alignment options, both in
horizontal and vertical direction.

👉 At the current stage of development, React UI is **RTL aware** so switching
to a fully RTL-compatible behavior in the future should be painless. That's why
the justification values are called rather `start` than `left` and `end` instead
of `right`.

```docoff-react-preview
React.createElement(() => {
  const [alignment, setAlignment] = React.useState('top');
  const [justification, setJustification] = React.useState('start');
  return (
    <div>
      <Toolbar>
        <ToolbarGroup align="baseline">
          <ToolbarItem>
            <span id="alignment-label">Alignment:</span>
          </ToolbarItem>
          <ToolbarItem>
            <ButtonGroup aria-labelledby="alignment-label" priority="outline">
              <Button
                aria-pressed={alignment === 'top'}
                color={alignment === 'top' ? 'selected' : 'secondary'}
                label="top"
                onClick={() => setAlignment('top')}
              />
              <Button
                aria-pressed={alignment === 'middle'}
                color={alignment === 'middle' ? 'selected' : 'secondary'}
                label="middle"
                onClick={() => setAlignment('middle')}
              />
              <Button
                aria-pressed={alignment === 'bottom'}
                color={alignment === 'bottom' ? 'selected' : 'secondary'}
                label="bottom"
                onClick={() => setAlignment('bottom')}
              />
              <Button
                aria-pressed={alignment === 'baseline'}
                color={alignment === 'baseline' ? 'selected' : 'secondary'}
                label="baseline"
                onClick={() => setAlignment('baseline')}
              />
            </ButtonGroup>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup align="baseline">
          <ToolbarItem>
            <span id="justification-label">Justification:</span>
          </ToolbarItem>
          <ToolbarItem>
            <ButtonGroup aria-labelledby="justification-label" priority="outline">
              <Button
                aria-pressed={justification === 'start'}
                color={justification === 'start' ? 'selected' : 'secondary'}
                label="start"
                onClick={() => setJustification('start')}
              />
              <Button
                aria-pressed={justification === 'center'}
                color={justification === 'center' ? 'selected' : 'secondary'}
                label="center"
                onClick={() => setJustification('center')}
              />
              <Button
                aria-pressed={justification === 'end'}
                color={justification === 'end' ? 'selected' : 'secondary'}
                label="end"
                onClick={() => setJustification('end')}
              />
              <Button
                aria-pressed={justification === 'space-between'}
                color={justification === 'space-between' ? 'selected' : 'secondary'}
                label="space-between"
                onClick={() => setJustification('space-between')}
              />
            </ButtonGroup>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
      <Toolbar align={alignment} justify={justification}>
        <ToolbarItem>
          <docoff-placeholder bordered>First item</docoff-placeholder>
        </ToolbarItem>
        <ToolbarItem>
          <docoff-placeholder bordered>
            Second item<br />
            is taller
          </docoff-placeholder>
        </ToolbarItem>
        <ToolbarItem>
          <docoff-placeholder bordered>Third item</docoff-placeholder>
        </ToolbarItem>
      </Toolbar>
    </div>
  );
});
```

## Groups

Toolbar items can be grouped which enables you aligning related items together.
To provide the best possible flexibility for building your layout, the
ToolbarGroup allows you to set many options similar to the Toolbar: vertical
alignment, [dense spacing](#dense-layout), or [disable wrapping](#wrapping).

```docoff-react-preview
<Toolbar justify="space-between">
  <ToolbarGroup>
    <ToolbarItem>
      <docoff-placeholder bordered>Group A</docoff-placeholder>
    </ToolbarItem>
    <ToolbarItem>
      <docoff-placeholder bordered>Group A</docoff-placeholder>
    </ToolbarItem>
  </ToolbarGroup>
  <ToolbarGroup align="middle">
    <ToolbarItem>
      <docoff-placeholder bordered>Group B</docoff-placeholder>
    </ToolbarItem>
    <ToolbarItem>
      <docoff-placeholder bordered>Group B</docoff-placeholder>
    </ToolbarItem>
  </ToolbarGroup>
  <ToolbarItem>
    <docoff-placeholder bordered>Item</docoff-placeholder>
  </ToolbarItem>
</Toolbar>
```

## Dense Layout

Sometimes it's useful to get related items even closer together. This can be
easily achieved through the `dense` option which can be applied on individual
toolbar groups, or on the entire toolbar.

```docoff-react-preview
React.createElement(() => {
  const [isGroupDense, setIsGroupDense] = React.useState(false);
  const [isToolbarDense, setIsToolbarDense] = React.useState(false);
  return (
    <div>
      <Toolbar>
        <ToolbarItem>
          <CheckboxField
            checked={isGroupDense}
            label="Dense ToolbarGroup"
            onChange={(e) => setIsGroupDense(e.target.checked)}
          />
        </ToolbarItem>
        <ToolbarItem>
          <CheckboxField
            checked={isToolbarDense}
            label="Dense Toolbar"
            onChange={(e) => setIsToolbarDense(e.target.checked)}
          />
        </ToolbarItem>
      </Toolbar>
      <Toolbar dense={isToolbarDense}>
        <ToolbarGroup dense={isGroupDense}>
          <ToolbarItem>
            <docoff-placeholder bordered>Group item</docoff-placeholder>
          </ToolbarItem>
          <ToolbarItem>
            <docoff-placeholder bordered>Group item</docoff-placeholder>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem>
          <docoff-placeholder bordered>Standalone item</docoff-placeholder>
        </ToolbarItem>
        <ToolbarItem>
          <docoff-placeholder bordered>Standalone item</docoff-placeholder>
        </ToolbarItem>
      </Toolbar>
    </div>
  );
});
```

## Wrapping

By default, all toolbar items are queued up one after another in a row. The
items automatically wrap and create a new row. To prevent this behavior, just
set the `nowrap` option on the Toolbar or on individual ToolbarGroups. Note that
ToolbarGroups can still wrap when the wrapping is disabled just on their parent
Toolbar.

```docoff-react-preview
<p>Disabled wrapping on entire toolbar:</p>
<Toolbar justify="space-between" nowrap>
  <ToolbarGroup>
    <ToolbarItem>
      <docoff-placeholder bordered>Group A</docoff-placeholder>
    </ToolbarItem>
    <ToolbarItem>
      <docoff-placeholder bordered>Group A</docoff-placeholder>
    </ToolbarItem>
  </ToolbarGroup>
  <ToolbarGroup>
    <ToolbarItem>
      <docoff-placeholder bordered>Group B</docoff-placeholder>
    </ToolbarItem>
    <ToolbarItem>
      <docoff-placeholder bordered>Group B</docoff-placeholder>
    </ToolbarItem>
  </ToolbarGroup>
  <ToolbarItem>
    <docoff-placeholder bordered>Item</docoff-placeholder>
  </ToolbarItem>
</Toolbar>
<p>Disabled wrapping on toolbar groups:</p>
<Toolbar justify="space-between">
  <ToolbarGroup nowrap>
    <ToolbarItem>
      <docoff-placeholder bordered>Group A</docoff-placeholder>
    </ToolbarItem>
    <ToolbarItem>
      <docoff-placeholder bordered>Group A</docoff-placeholder>
    </ToolbarItem>
  </ToolbarGroup>
  <ToolbarGroup nowrap>
    <ToolbarItem>
      <docoff-placeholder bordered>Group B</docoff-placeholder>
    </ToolbarItem>
    <ToolbarItem>
      <docoff-placeholder bordered>Group B</docoff-placeholder>
    </ToolbarItem>
  </ToolbarGroup>
  <ToolbarItem>
    <docoff-placeholder bordered>Item</docoff-placeholder>
  </ToolbarItem>
</Toolbar>
```

👉 Depending on your situation, you may need to further control wrapping of text
content placed within Toolbar. The [Text][text] component is designed
specifically for this kind of job.

## Flexible Items

Toolbar items can be made flexible to grow and shrink according to the available
space. This is useful e.g. when you need to combine text with an action:

```docoff-react-preview
<Toolbar>
  <ToolbarItem flexible>
    <docoff-placeholder bordered>My Headline</docoff-placeholder>
  </ToolbarItem>
  <ToolbarItem>
    <docoff-placeholder bordered>Action</docoff-placeholder>
  </ToolbarItem>
</Toolbar>
```

Or to build a classic media layout with image on the left and text on the right:

```docoff-react-preview
<Toolbar>
  <ToolbarItem>
    <docoff-placeholder bordered>Media object</docoff-placeholder>
  </ToolbarItem>
  <ToolbarItem flexible>
    <docoff-placeholder bordered>Media body</docoff-placeholder>
  </ToolbarItem>
</Toolbar>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't interfere
with the API of the React component are forwarded to the root `<div>` HTML
element. This enables making the component interactive and helps to improve
its accessibility.

👉 For the full list of supported attributes refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/Toolbar/Toolbar.jsx"></docoff-react-props>

### ToolbarGroup API

A wrapper for grouping ToolbarItems together.

<docoff-react-props src="/components/Toolbar/ToolbarGroup.jsx"></docoff-react-props>

### ToolbarItem API

A wrapper for individual toolbar items.

<docoff-react-props src="/components/Toolbar/ToolbarItem.jsx"></docoff-react-props>

## Theming

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-Toolbar__gap`                                 | Gap between toolbar items                                    |
| `--rui-Toolbar__gap--dense`                          | Dense gap between toolbar items                              |

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[grid]: /components/Grid
[text]: /components/Text
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
