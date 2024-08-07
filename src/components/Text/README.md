# Text

Text is a tiny component to control wrapping of text content.

## Basic Usage

To implement the Text component, you need to import it first:

```js
import { Text } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<docoff-placeholder>
  <Text lines={3}>
    Hello! This text will be clamped to three lines.
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
    dis parturient montes, nascetur ridiculus mus. Donec quam felis,
    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
  </Text>
</docoff-placeholder>
```

See [API](#api) for all available options.

## General Guidelines

- Use Text anytime you need to **control potentially long strings** and
  prevent them from overflowing or breaking their container.

- **By default, Text doesn't alter rendering of its content.** Use available
  options to achieve the result you need.

- **Text renders as `<span>` by default,** so it can only contain
  inline-level HTML elements (like `<strong>` or `<a>`, but not `<div>`, `<p>`,
  or `<h2>`). If necessary, use the `blockLevel` option to render as `<div>` to
  keep your HTML valid.

- **Use Text for short pieces of text content.** Including a couple of HTML tags
  shouldn't cause any harm, but keep in mind Text is not intended to wrap
  complex HTML structures or even React components.

## Number of Lines

Specify how many `lines` of text should be visible if content doesn't fit its
container. If the number of lines is exceeded, the content is truncated and
appended by an ellipsis (`…`).

```docoff-react-preview
React.createElement(() => {
  const [lines, setLines] = React.useState(1);
  return (
    <div>
      <Toolbar align="baseline">
        <ToolbarItem>
          <TextField
            label="Number of lines"
            min={1}
            max={100}
            onChange={(e) => setLines(Number(e.target.value))}
            type="number"
            value={lines}
          />
        </ToolbarItem>
      </Toolbar>
      <docoff-placeholder>
        <Text lines={lines}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
          mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
          semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
          porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
          ante, dapibus in, viverra quis, feugiat a, tellus.
        </Text>
      </docoff-placeholder>
    </div>
  );
});
```

## Word Wrapping

There are three possible ways of controlling wrapping of long words if they do
not fit on a line. Set `wordWrapping` to one of the following values:

- `normal`: Do not force any wrapping (default behavior).

- `long-words`: To prevent overflow, an otherwise unbreakable string of
  characters — like a long word or URL — may be broken at any point if there are
  no otherwise-acceptable break points in the line.

- `anywhere`: Create a break at the exact place where text would otherwise
  overflow its container (even if putting an entire word on its own line would
  negate the need for a break).

📖 [Read more about wrapping and breaking text at MDN.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Text/Wrapping_Text)

### Hyphens

The `hyphens` option specifies how words should be hyphenated when text wraps
across multiple lines. It can prevent hyphenation entirely, hyphenate at
manually-specified points within the text, or let the browser automatically
insert hyphens where appropriate.

👉 The `auto` setting's behavior depends on the language being properly tagged
to select the appropriate hyphenation rules. **You must specify a language**
using the `lang` HTML attribute (e.g.
[on `<html>` tag](/docs/getting-started/usage#full-example)) to guarantee that
automatic hyphenation is applied in that language.

👉 [Manually suggested line break opportunities](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens#suggesting_line_break_opportunities)
will override automatic break point selection in `auto` mode when present.

📖 [Read more about `hyphens` CSS property at MDN.](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)

```docoff-react-preview
React.createElement(() => {
  const [hyphens, setHyphens] = React.useState('none');
  const [wordWrapping, setWordWrapping] = React.useState('normal');
  return (
    <div>
      <Toolbar>
        <ToolbarGroup align="baseline">
          <ToolbarItem>
            <span id="word-wrapping-options-label">Word wrapping:</span>
          </ToolbarItem>
          <ToolbarItem>
            <ButtonGroup aria-labelledby="word-wrapping-options-label" priority="outline">
              <Button
                aria-pressed={wordWrapping === 'normal'}
                color={wordWrapping === 'normal' ? 'selected' : 'secondary'}
                label="normal"
                onClick={() => setWordWrapping('normal')}
              />
              <Button
                aria-pressed={wordWrapping === 'long-words'}
                color={wordWrapping === 'long-words' ? 'selected' : 'secondary'}
                label="long-words"
                onClick={() => setWordWrapping('long-words')}
              />
              <Button
                aria-pressed={wordWrapping === 'anywhere'}
                color={wordWrapping === 'anywhere' ? 'selected' : 'secondary'}
                label="anywhere"
                onClick={() => setWordWrapping('anywhere')}
              />
            </ButtonGroup>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup align="baseline">
          <ToolbarItem>
            <span id="hyphens-options-label">Hyphens:</span>
          </ToolbarItem>
          <ToolbarItem>
            <ButtonGroup aria-labelledby="hyphens-options-label" priority="outline">
              <Button
                aria-pressed={hyphens === 'none'}
                color={hyphens === 'none' ? 'selected' : 'secondary'}
                label="none"
                onClick={() => setHyphens('none')}
              />
              <Button
                aria-pressed={hyphens === 'auto'}
                color={hyphens === 'auto' ? 'selected' : 'secondary'}
                label="auto"
                onClick={() => setHyphens('auto')}
              />
              <Button
                aria-pressed={hyphens === 'manual'}
                color={hyphens === 'manual' ? 'selected' : 'secondary'}
                label="manual"
                onClick={() => setHyphens('manual')}
              />
            </ButtonGroup>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
      <docoff-placeholder width="11em" bordered>
        <Text hyphens={hyphens} wordWrapping={wordWrapping}>
          {hyphens === 'manual'
            ? (<>LongWord&shy;ThatHasManual&shy;Breaking&shy;Possibilities</>)
            : (<>LongWordThatHasNoBreakingPossibilities</>)}
          {' '}
          and a couple of ordinary words that are nice and well behaved.
        </Text>
      </docoff-placeholder>
    </div>
  );
});
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to:

- `<span>` HTML element in case that `blockLevel` is set to `false`
- `<div>` HTML element in case that `blockLevel` is set to `true`

This enables making the component interactive and helps to improve its
accessibility.

👉 For the full list of supported attributes refer to:

- [`<span>` HTML element attributes][span-attributes]{:target="_blank"}
- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/Text/Text.jsx"></docoff-react-props>

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[span-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span#attributes
