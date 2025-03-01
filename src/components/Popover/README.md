# Popover

Popover displays additional information without interrupting user flow.

## Basic Usage

To implement the Popover component, you need to import it first:

```js
import { Popover, PopoverWrapper } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  // All inline styles in this example are for demonstration purposes only.
  return (
    <div
      style={{
        display: 'grid',
        placeContent: 'center',
        minWidth: '20rem',
        minHeight: '10rem',
      }}
    >
      <PopoverWrapper>
        <Button
          aria-describedby={isPopoverOpen ? 'my-popover' : undefined}
          label="Want to see a popover? Click me!"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        />
        {isPopoverOpen && (
          <Popover id="my-popover">
            Hello there!
          </Popover>
        )}
      </PopoverWrapper>
    </div>
  );
});
```

See [API](#api) for all available options.

## Placement

Available placements are: top, right, bottom, and left. Additionally, all basic
placements can be aligned to the center (default, no suffix), start (e.g.
`top-start`), or end (e.g. `bottom-end`). Check Popover [API](#api) for the
complete list of accepted values.

```docoff-react-preview
React.createElement(() => {
  const [align, setAlign] = React.useState('');
  // All inline styles in this example are for demonstration purposes only.
  return (
    <>
      <Toolbar align="baseline">
        <ToolbarItem>
          <span id="alignment-options-label">Alignment:</span>
        </ToolbarItem>
        <ToolbarItem>
          <ButtonGroup aria-labelledby="alignment-options-label" priority="outline">
            <Button
              aria-pressed={align === '-start'}
              color={align === '-start' ? 'selected' : 'secondary'}
              label="start"
              onClick={() => setAlign('-start')}
            />
            <Button
              aria-pressed={align === ''}
              color={align === '' ? 'selected' : 'secondary'}
              label="center"
              onClick={() => setAlign('')}
            />
            <Button
              aria-pressed={align === '-end'}
              color={align === '-end' ? 'selected' : 'secondary'}
              label="end"
              onClick={() => setAlign('-end')}
            />
          </ButtonGroup>
        </ToolbarItem>
      </Toolbar>
      <div
        style={{
          display: 'grid',
          placeContent: 'center',
          minWidth: '20rem',
          minHeight: '15rem',
        }}
      >
        <PopoverWrapper>
          <docoff-placeholder bordered aria-describedby="my-popover-top">
            Popovers
            <br />
            all day long…
          </docoff-placeholder>
          <Popover id="my-popover-top" placement={`top${align}`}>
            Top side
          </Popover>
          <Popover id="my-popover-right" placement={`right${align}`}>
            Right side
          </Popover>
          <Popover id="my-popover-bottom" placement={`bottom${align}`}>
            Bottom side
          </Popover>
          <Popover id="my-popover-left" placement={`left${align}`}>
            Left side
          </Popover>
        </PopoverWrapper>
      </div>
    </>
  );
});
```

## PopoverWrapper

PopoverWrapper is an optional wrapper to make positioning of Popover even
easier.

By default, Popover is placed relative to the closest parent element with
`position: relative` or `position: absolute`. Maybe you already have one of
these in your CSS. PopoverWrapper is here for situations when you don't.

```jsx
<PopoverWrapper>
  <Button
    aria-describedby={isPopoverOpen ? 'my-popover' : undefined}
    label="Want to see a popover? Click me!"
    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
  />
  {isPopoverOpen && <Popover id="my-popover">Hello there!</Popover>}
</PopoverWrapper>
```

How do you know you may need PopoverWrapper?

- You are **not** rendering Popover in a React portal.
- You are using Popover in a complex layout and it does not pop up where you
  need it.
- You are using Floating UI with `absolute` positioning strategy (see
  [Advanced Positioning](#advanced-positioning) below) and your Popover keeps to
  be misplaced.
- You have no idea what CSS `position` is and just want to get it working.

To sum it up, usually you will need either PopoverWrapper around your content or
`position: [ relative | absolute ]` somewhere in your CSS (but you never need
both!). Nevertheless, in the simplest situations, like in a single-column page
layout, you may not need either of these at all.

Head to PopoverWrapper [API](#popoverwrapper-api) for all available options.

## Advanced Positioning

While the basic setup can be sufficient in some scenarios, dropping a Popover
usually won't be so easy. To handle all tricky situations and edge cases
automatically, including smart position updates to ensure Popover visibility,
we recommend to involve an external library designed specifically for this
purpose.

To position the popover, you need to provide the `placementStyle` prop with the
style you want to apply to the popover. This prop should only be used to
position the popover. The allowed props are:

- `position`
- `inset`
- `inset-inline-start`
- `inset-inline-end`
- `inset-block-start`
- `inset-block-end`
- `top`
- `right`
- `bottom`
- `left`
- `translate`
- `transform-origin`

⚠️ [`inset`][mdn-inset] is a shorthand for `top right bottom left`, not for
`inset-*` properties.

As opposed to `top right bottom left` and the `inset` shorthand, `inset-*`
properties are writing-direction aware.

ℹ️ The following example is using external library [Floating UI]. To use
Floating UI, install it first:

```shell
npm install --save @floating-ui/react-dom
```

And import it along with Popover, e.g.:

```js
import FloatingUIReactDOM from '@floating-ui/react-dom';
import { Popover } from '@react-ui-org/react-ui';
```

As opposed to the [basic setup](#placement), Popover will be placed according to
its triggering component (`reference`), but still recognizing the closest parent
element with `position: relative` or `position: absolute` if there is any.

Popover reacts on the `ref` option, necessary for advanced positioning:
when `ref` is set, Popover resets its built-in positioning and relies
on provided `style`.

👉 Please consult [Floating UI] documentation to understand how it works and to
get an idea of all possible cases you may need to cover.

🖱 Try scrolling the example to see how Popover placement is updated.

```docoff-react-preview
React.createElement(() => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState('top');
  const {
    x,
    y,
    reference,
    floating,
    placement: finalPlacement,
    strategy,
  } = FloatingUIReactDOM.useFloating({
    placement,
    middleware: [FloatingUIReactDOM.flip()],
    whileElementsMounted: FloatingUIReactDOM.autoUpdate,
  });
  const placementOptions = [
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
  ];
  // All inline styles in this example EXCEPT Popover `style` are for
  // demonstration purposes only.
  return (
    <>
      <Toolbar>
        <ToolbarItem>
          <SelectField
            label="Suggested placement:"
            onChange={e => setPlacement(e.target.value)}
            options={placementOptions.map((el) => ({
              label: el,
              value: el,
            }))}
            value={placement}
          />
        </ToolbarItem>
        <ToolbarItem>
          <div className="mb-2">Final placement:</div>
          <code>{finalPlacement}</code>
        </ToolbarItem>
      </Toolbar>
      <div
        style={{
          width: '40rem',
          maxWidth: '100%',
          height: '10rem',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '60rem',
            height: '20rem',
            paddingBlock: '7rem',
            textAlign: 'center',
          }}
        >
          <Button
            aria-describedby={isPopoverOpen ? 'my-advanced-popover' : undefined}
            label="Trigger Popover"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            ref={reference}
          />
          {isPopoverOpen && (
            <Popover
              id="my-advanced-popover"
              placement={finalPlacement}
              placementStyle={{
                position: strategy,
                top: `${y}px`,
                left: `${x}px`,
              }}
              ref={floating}
            >
              Auto-flipping Popover
            </Popover>
          )}
        </div>
      </div>
    </>
  );
});
```

## Controlled Popover

Popover API can be used to control visibility of Popover component. You need to
set `id` on the trigger element and matching `popoverTargetId` attribute on the
Popover component. This leverages the browser's Popover API to control the
popover, automatically closing it when the trigger or the backdrop is pressed.

```docoff-react-preview
React.createElement(() => {
  // All inline styles in this example are for demonstration purposes only.
  return (
    <div
      style={{
        display: 'grid',
        placeContent: 'center',
        minWidth: '20rem',
        minHeight: '10rem',
      }}
    >
      <PopoverWrapper>
        <Button
          label="Want to see a popover? Click me!"
          popovertarget="my-popover-helper"
        />
        <Popover id="my-popover" popoverTargetId="my-popover-helper">
            Hello there!
        </Popover>
      </PopoverWrapper>
    </div>
  );
});
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
root `<div>` HTML element. This enables making the component interactive and
helps to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the root native HTML `<div>` element,
which enables [Advanced Positioning](#advanced-positioning).

## API

<docoff-react-props src="/components/Popover/Popover.jsx"></docoff-react-props>

### PopoverWrapper API

<docoff-react-props src="/components/Popover/PopoverWrapper.jsx"></docoff-react-props>

## Theming

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-Popover__width`                               | Popover width                                                |
| `--rui-Popover__padding`                             | Popover padding                                              |
| `--rui-Popover__border-width`                        | Border width                                                 |
| `--rui-Popover__border-color`                        | Border color                                                 |
| `--rui-Popover__border-radius`                       | Corner radius                                                |
| `--rui-Popover__color`                               | Text color                                                   |
| `--rui-Popover__background-color`                    | Background color                                             |
| `--rui-Popover__box-shadow`                          | Popover box shadow                                           |

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[Floating UI]: https://floating-ui.com/docs/react-dom
[mdn-inset]: https://developer.mozilla.org/en-US/docs/Web/CSS/inset
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
