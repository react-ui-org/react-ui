# ScrollView

ScrollView makes long content scrollable.

👉 Please note that HTML is rendered even when no children are provided.
This is needed to allow the auto-scroll feature to work.

## Basic Usage

To implement the ScrollView component, you need to import it first:

```js
import { ScrollView } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<docoff-placeholder height="200px">
  <ScrollView>
    <div>
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
      hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec
      vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit
      amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris
      sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget
      bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis
      natoque penatibus et magnis dis parturient montes, nascetur ridiculus
      mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
      aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
      a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
      Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
      vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
      vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
      feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
      Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
      Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
      Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
      libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
      vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
      tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
      Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
      Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
      magna. Sed consequat, leo eget bibendum sodales, augue velit cursus
      nunc.
    </div>
  </ScrollView>
</docoff-placeholder>
```

See [API](#api) for all available options.

## General Guidelines

- ScrollView takes up all **available horizontal space and expands vertically**
  according to the length of its content. Depending on your layout, you may need
  to restrict the height of its parent to activate scrolling.

- While arrow controls are optional in the vertical mode, you should always
  **enable arrows in the horizontal mode when the scrollbar is disabled.**
  Because if you don't, users without horizontal-scrolling-enabled devices
  (like an old-school mouse) might not be able to access your content.

- For dynamic content such as chat window or console output, consider using the
  **auto-scroll feature**. This will ensure the newest content is always
  visible.

- ScrollView enables **scrolling on all screen sizes.** If you need to make an
  area in your app scrollable based on viewport size, please use custom CSS
  with media queries instead.

- ScrollView only supports **scrolling in a single direction at a time.** It
  crops content that would possibly overflow in the other direction because
  additional scrollbars would be unreachable under scrolling shadows. If you
  need your content to be ready for bi-directional scrolling, either consider
  using just `overflow: auto` instead of ScrollView, or make your content
  scrollable before putting it into ScrollView and make sure its scrollbars
  don't collide with scrolling shadows.

## Arrows

You can suppress the system scrollbar and display arrow controls instead.

```docoff-react-preview
<docoff-placeholder height="200px">
  <ScrollView arrows scrollbar={false}>
    <div>
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
      hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec
      vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit
      amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris
      sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget
      bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis
      natoque penatibus et magnis dis parturient montes, nascetur ridiculus
      mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
      aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
      a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
      Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
      vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
      vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
      feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
      Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
      Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
      Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
      libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
      vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
      tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
      Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
      Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
      magna. Sed consequat, leo eget bibendum sodales, augue velit cursus
      nunc.
    </div>
  </ScrollView>
</docoff-placeholder>
```

## Horizontal Scrolling

The horizontal mode is useful when you have (or expect to have) a lot of
horizontal content and you need to make sure it remains accessible on all
viewport sizes.

```docoff-react-preview
<ScrollView direction="horizontal" arrows>
  <docoff-placeholder>
    <div style={{ whiteSpace: 'nowrap' }}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
    </div>
  </docoff-placeholder>
</ScrollView>
```

## Auto Scrolling

ScrollView can watch its content for changes and automatically scroll to the
end when the content has changed.

⚠️ The auto-scroll functionality requires all children to have the `key`
property defined because it detects changes of these keys.

```docoff-react-preview
React.createElement(() => {
  const generateRandomString = () => {
    const texts = [
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      'Aenean commodo ligula eget dolor. Aenean massa.',
      'Aenean commodo ligula eget dolor. Aenean massa.',
      'Cum sociis natoque penatibus et magnis dis parturient montes.',
      'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
      'Nulla consequat massa quis enim. Donec pede justo, fringilla vel.',
      'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
    ];
    let text = '';
    const repeatAmount = Math.floor(Math.random() * 9);
    for (let i = 0; i < (repeatAmount + 1); i += 1) {
      text += texts[Math.floor(Math.random() * Math.floor(texts.length - 1))];
    }
    return text;
  }
  const [autoScroll, setAutoScroll] = React.useState('always');
  const [direction, setDirection] = React.useState('vertical');
  const [scrollViewContent, setScrollViewContent] = React.useState(
    generateRandomString(),
  );
  return (
    <div>
      <Toolbar>
        <ToolbarItem>
          <Radio
            label="Direction:"
            onChange={(e) => setDirection(e.target.value)}
            options={[
              {
                label: 'Vertical',
                value: 'vertical',
              },
              {
                label: 'Horizontal',
                value: 'horizontal',
              },
            ]}
            value={direction}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Radio
            label="Autoscroll:"
            onChange={(e) => setAutoScroll(e.target.value)}
            options={[
              {
                label: 'Always',
                value: 'always',
              },
              {
                label: 'When end is detected',
                value: 'detectEnd',
              },
            ]}
            value={autoScroll}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            label="Add text"
            onClick={
              () => setScrollViewContent(
                `${scrollViewContent} ${generateRandomString()}`,
              )
            }
          />
        </ToolbarItem>
      </Toolbar>
      <docoff-placeholder height={direction === 'vertical' ? '200px' : 'auto'}>
        <ScrollView arrows autoScroll={autoScroll} direction={direction}>
          <div
            key={scrollViewContent.length}
            style={{
              whiteSpace: (direction === 'horizontal' ? 'nowrap' : 'normal'),
            }}
          >
            {scrollViewContent}
          </div>
        </ScrollView>
      </docoff-placeholder>
    </div>
  );
});
```

## Customization

It's possible to entirely customize the arrow controls, including the scroll
step, and the scrolling shadows.

### Custom Arrows

You can pass any HTML element or even a custom React component to be used as the
arrow control. Furthermore, you can change the scroll step if you need to scroll
by smaller or bigger portions.

```docoff-react-preview
<ScrollView
  arrows
  arrowsScrollStep={300}
  direction="horizontal"
  nextArrowElement={(<span className="typography-size-3">➡️</span>)}
  prevArrowElement={(<span className="typography-size-3">⬅️</span>)}
  scrollbar={false}
>
  <docoff-placeholder>
    <div style={{ whiteSpace: 'nowrap' }}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
    </div>
  </docoff-placeholder>
</ScrollView>
```

### Scrolling Shadows

You can customize the start and end scrolling shadows using `startShadow*` and
`endShadow*` properties.

```docoff-react-preview
<docoff-placeholder height="200px">
  <ScrollView
    startShadowBackground={'radial-gradient('
        + 'farthest-side at center top, '
        + 'rgba(0, 0, 0, 0.15) 0%, '
        + 'rgba(0, 0, 0, 0.05) 60%, '
        + 'rgba(0, 0, 0, 0.02) 85%, '
        + 'rgba(0, 0, 0, 0) 100%'
      + ')'
    }
    startShadowInitialOffset="-5px"
    startShadowSize="40px"
    endShadowBackground={'radial-gradient('
        + 'farthest-side at center bottom, '
        + 'rgba(0, 0, 0, 0.15) 0%, '
        + 'rgba(0, 0, 0, 0.05) 60%, '
        + 'rgba(0, 0, 0, 0.02) 85%, '
        + 'rgba(0, 0, 0, 0) 100%'
      + ')'
    }
    endShadowInitialOffset="-5px"
    endShadowSize="40px"
  >
    <div>
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
      hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec
      vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit
      amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris
      sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget
      bibendum sodales, augue velit cursus nunc.Aenean massa. Cum sociis
      natoque penatibus et magnis dis parturient montes, nascetur ridiculus
      mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
      aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
      a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
      Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
      vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
      vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
      feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
      Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
      Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
      Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
      libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
      vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
      tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
      Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
      Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
      magna. Sed consequat, leo eget bibendum sodales, augue velit cursus
      nunc.
    </div>
  </ScrollView>
</docoff-placeholder>
```

#### Linear Gradients

For easier CSS definition of [linear gradients] for both vertical and horizontal
directions at the same time, there are `--rui-local-start-shadow-direction` and
`--rui-local-end-shadow-direction` custom properties that can be used inside
`startShadowBackground` and `endShadowBackground` definitions. The value of the
custom properties then reacts to the `direction` option:

| Custom property                      | Vertical direction | Horizontal direction |
|--------------------------------------|--------------------|----------------------|
| `--rui-local-start-shadow-direction` | `to bottom`        | `to right`           |
| `--rui-local-end-shadow-direction`   | `to top`           | `to left`            |

This is useful if you want to create a single definition of linear gradients for
scrolling shadows in both directions via
[global props](/docs/customize/global-props).

```docoff-react-preview
React.createElement(() => {
  const START_SHADOW_BACKGROUND = `linear-gradient(
      var(--rui-local-start-shadow-direction),
      rgba(0 0 0 / 0.5),
      rgba(0 0 0 / 0)
    )`;
  const END_SHADOW_BACKGROUND = `linear-gradient(
      var(--rui-local-end-shadow-direction),
      rgba(0 0 0 / 0.5),
      rgba(0 0 0 / 0)
    )`
  const [direction, setDirection] = React.useState('vertical');
  return(
    <>
      <Radio
        label="Direction:"
        onChange={(e) => setDirection(e.target.value)}
        options={[
          {
            label: 'Vertical',
            value: 'vertical',
          },
          {
            label: 'Horizontal',
            value: 'horizontal',
          },
        ]}
        value={direction}
      />
      <docoff-placeholder height="200px">
        <ScrollView
          direction={direction}
          endShadowBackground={END_SHADOW_BACKGROUND}
          startShadowBackground={START_SHADOW_BACKGROUND}
        >
          <div
            style={{
              width: (direction === 'horizontal' ? '3000px' : 'auto'),
            }}
          >
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
            vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
            ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
            viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
            imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
            ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
            tellus eget condimentum rhoncus, sem quam semper libero, sit amet
            adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
            pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
            tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam
            quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
            leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
            magna. Sed consequat, leo eget bibendum sodales, augue velit
            cursus nunc. Aenean massa. Cum sociis natoque penatibus et magnis
            dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
            massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
            venenatis vitae, justo. Nullam dictum felis eu pede mollis
            pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper
            nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
            ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
            viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
            imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
            ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
            tellus eget condimentum rhoncus, sem quam semper libero, sit amet
            adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
            pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
            tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam
            quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
            leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
            magna. Sed consequat, leo eget bibendum sodales, augue velit
            cursus nunc.
          </div>
        </ScrollView>
      </docoff-placeholder>
    </>
  );
});
```
## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't interfere
with the API of the React component are forwarded to the root `<div>` HTML
element. This enables making the component interactive and helps to improve
its accessibility.

👉 For forwarding HTML attributes programmatically, you can use the `transferProps` function. For detailed usage examples, refer to the [TransferProps documentation](/src/docs/js-helpers/transferProps.md).

For the full list of supported attributes, you can also refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}


## Forwarding ref

If you provide [ref], it is forwarded to the scrolling viewport native HTML
`<div>` element.

## API

<docoff-react-props src="/components/ScrollView/ScrollView.jsx"></docoff-react-props>

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[linear gradients]: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
