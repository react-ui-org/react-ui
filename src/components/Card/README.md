# Card

Cards contain content and actions about a single subject.

## Basic Usage

To implement the Card component, you need to import at least Card and
[CardBody](#cardbody) components:

```js
import { Card, CardBody } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Card>
  <CardBody>
    Hello!
  </CardBody>
</Card>
```

See [API](#api) for all available options.

## General Guidelines

- Default card is **designed for non-white background.** You may want to either
  use the [raised variant](#raised-card) or
  [customize](/docs/customize/theming/overview) the default appearance to make the
  card stand out on white surfaces.

- Use optional [CardBody](#cardbody) and [CardFooter](#cardfooter) components to
  provide your content with expected spacing.

- Use **medium or low-emphasis buttons** when there are more cards, e.g. in a
  grid. It will help you keep the UI clean and easy to scan.

- **Card, or Paper?** Card is a versatile surface for displaying content.
  However, there is also the [Paper](/components/Paper) component. While Card
  is designed for displaying items (and also supports more visual options),
  Paper is usually used to hold larger content areas like lists, grids, or
  forms.

## Composition

Card is decomposed into the following components:

- [Card](#api)
    - [CardBody](#cardbody)
    - [CardFooter](#cardfooter)

Aside from the [CardBody](#cardbody) element, you can add a
[CardFooter](#cardfooter) to better separate your card's actions from the rest
of the content.

Import all necessary components:

```js
import { Card, CardBody, CardFooter } from '@react-ui-org/react-ui';
```

And use them:

```docoff-react-preview
<Card>
  <CardBody>
    Hello! I&apos;m card with footer.
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" />
  </CardFooter>
</Card>
```

👉 CardFooter is required in case you need to align the actions of multiple
cards with varying height of content.

## Raised Card

Add optional shadow to lift the card above surface.

```docoff-react-preview
<Card raised>
  <CardBody>
    Hello! I&apos;m raised card with footer.
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" />
  </CardFooter>
</Card>
```

## Dense Card

Use a dense card when you need to save space on screen. Other elements in the
card should be also smaller to keep the card contained and easy to scan.

```docoff-react-preview
<Card dense raised>
  <CardBody>
    <small>Hello! I&apos;m dense card. Everything is smaller here.</small>
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" size="small" />
  </CardFooter>
</Card>
```

## Scrollable Card

Combine Card with [ScrollView](/components/ScrollView) to enable scrolling
for card content.

```docoff-react-preview
<div
  style={{
    display: 'flex',
    height: '200px',
  }}
>
  <Card raised>
    <ScrollView>
      <CardBody>
        Hello! I&apos;m scrollable card.
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
        tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
        enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
        imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
        ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
        eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
        sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
        hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
      </CardBody>
    </ScrollView>
  </Card>
</div>
```

## Color Variants

To cover all possible needs of your project, Card is available in colors from
[Feedback color collection](/docs/foundation/collections#colors).

```docoff-react-preview
<Card color="success">
  <CardBody>
    Hello! I&apos;m success variant of card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" color="success" />
  </CardFooter>
</Card>
<Card color="warning">
  <CardBody>
    Hello! I&apos;m warning variant of card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" color="warning" />
  </CardFooter>
</Card>
<Card color="danger">
  <CardBody>
    Hello! I&apos;m danger variant of card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" color="danger" />
  </CardFooter>
</Card>
<Card color="help">
  <CardBody>
    Hello! I&apos;m help variant of card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" color="help" />
  </CardFooter>
</Card>
<Card color="info">
  <CardBody>
    Hello! I&apos;m info variant of card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" color="info" />
  </CardFooter>
</Card>
<Card color="note">
  <CardBody>
    Hello! I&apos;m note variant of card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" color="note" />
  </CardFooter>
</Card>
```

## States

### Disabled State

Entire card can appear disabled. However, you'll still need to manually disable
its interactive elements to disallow user's interaction.

```docoff-react-preview
<Card disabled>
  <CardBody>
    Hello! I&apos;m a disabled card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" disabled />
  </CardFooter>
</Card>
<Card disabled raised>
  <CardBody>
    Hello! I&apos;m a disabled raised card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" disabled />
  </CardFooter>
</Card>
<Card color="success" disabled>
  <CardBody>
    Hello! I&apos;m a disabled success variant of card.
    {' '}
    <TextLink href="/" label="This is a link" />
  </CardBody>
  <CardFooter>
    <Button label="Read more" priority="outline" color="success" disabled />
  </CardFooter>
</Card>
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

## API

<docoff-react-props src="/components/Card/Card.jsx"></docoff-react-props>

### CardBody

Space your content with CardBody. See [Composition](#composition) for
all details.

<docoff-react-props src="/components/Card/CardBody.jsx"></docoff-react-props>

### CardFooter

Separate your card actions with CardFooter. See
[Composition](#composition) for all details.

<docoff-react-props src="/components/Card/CardFooter.jsx"></docoff-react-props>

## Theming

### Common Theming Options

| Custom Property                          | Description                                    |
|------------------------------------------|------------------------------------------------|
| `--rui-Card__padding`                    | Padding shared by card header, body and footer |
| `--rui-Card__border-width`               | Border width                                   |
| `--rui-Card__border-color`               | Border color                                   |
| `--rui-Card__border-radius`              | Corner radius                                  |
| `--rui-Card__background-color`           | Card background color                          |
| `--rui-Card--dense__padding`             | Padding of dense card                          |
| `--rui-Card--raised__box-shadow`         | Box shadow of raised card                      |
| `--rui-Card--disabled__background-color` | Card background color in disabled state        |
| `--rui-Card--disabled__opacity`          | Card opacity in disabled state                 |
| `--rui-Card--disabled__border-width`     | Card border width in disabled state            |
| `--rui-Card--disabled__border-color`     | Card border color in disabled state            |

### Theming Variants

It's possible to adjust the theme of specific color variant. Naming convention
looks as follows:

`--rui-Card--<COLOR>__<PROPERTY>`

Where:

- `<COLOR>` is a value from supported
  [color collections](/docs/foundation/collections#colors)
  (check [color variants](#color-variants) and [API](#api) to see which
  collections are supported),
- `<PROPERTY>` is one of `color` (color of text), `border-color`, or
  `background-color`.

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
