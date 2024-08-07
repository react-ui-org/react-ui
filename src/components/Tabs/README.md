# Tabs

Tabs separate related content into groups within a single context.

## Basic Usage

To implement the Tabs component, you need to import it first:

```js
import { Tabs, TabsItem } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [activeTab, setActiveTab] = React.useState(1);
  const navigate = (event, tab) => {
    setActiveTab(tab);
    event.preventDefault();
  };
  return (
    <Tabs>
      <TabsItem
        href="#design"
        isActive={activeTab === 1}
        label="Design"
        onClick={(e) => navigate(e, 1)}
      />
      <TabsItem
        href="#code"
        isActive={activeTab === 2}
        label="Code"
        onClick={(e) => navigate(e, 2)}
      />
      <TabsItem
        href="#resources"
        isActive={activeTab === 3}
        label="Resources"
        onClick={(e) => navigate(e, 3)}
      />
    </Tabs>
  );
})
```

See [API](#api) for all available options.

## General Guidelines

- **Use tabs to divide similar content.** Tabs make sense when the content they
  contain is related.

- **Make sure everything necessary** to complete a single task is contained
  within one tab. Users don't like switching context to get their task done.

- **Make labels short and clear.** Long tab names impede comprehension. Use as
  few words as possible, preferably just one.

- **Limit the number of tabs.** Having too many tabs increases clutter and
  can be overwhelming for users. Try to have no more than 5 or 6 tabs.

## Tabs with Icons

Tab titles can be accompanied by icons. Once you decide to have icons, use one
for each tab and don't leave some tabs without an icon.

```docoff-react-preview
React.createElement(() => {
  const [activeTab, setActiveTab] = React.useState(1);
  const navigate = (event, tab) => {
    setActiveTab(tab);
    event.preventDefault();
  };
  return (
    <Tabs>
      <TabsItem
        beforeLabel={<rui-icon icon="pencil" />}
        href="#design"
        isActive={activeTab === 1}
        label="Design"
        onClick={(e) => navigate(e, 1)}
      />
      <TabsItem
        beforeLabel={<rui-icon icon="code" />}
        href="#code"
        isActive={activeTab === 2}
        label="Code"
        onClick={(e) => navigate(e, 2)}
      />
      <TabsItem
        beforeLabel={<rui-icon icon="star" />}
        href="#resources"
        isActive={activeTab === 3}
        label="Resources"
        onClick={(e) => navigate(e, 3)}
      />
    </Tabs>
  );
});
```

## Scrollable Tabs

If you have more than a few tabs, you may need to make sure they will be all
accessible no matter the space they have around. Wrap Tabs into
[ScrollView](/components/ScrollView) to make them scrollable if necessary.

```docoff-react-preview
React.createElement(() => {
  const [activeTab, setActiveTab] = React.useState(1);
  const navigate = (event, tab) => {
    setActiveTab(tab);
    event.preventDefault();
  };
  return (
    <div style={{ width: '19rem' }}>
      <ScrollView direction="horizontal">
        <Tabs>
          <TabsItem
            href="#design"
            isActive={activeTab === 1}
            label="Design"
            onClick={(e) => navigate(e, 1)}
          />
          <TabsItem
            href="#code"
            isActive={activeTab === 2}
            label="Code"
            onClick={(e) => navigate(e, 2)}
          />
          <TabsItem
            href="#resources"
            isActive={activeTab === 3}
            label="Resources"
            onClick={(e) => navigate(e, 3)}
          />
          <TabsItem
            href="#other"
            isActive={activeTab === 4}
            label="Other"
            onClick={(e) => navigate(e, 4)}
          />
          <TabsItem
            href="#more"
            isActive={activeTab === 5}
            label="More"
            onClick={(e) => navigate(e, 5)}
          />
        </Tabs>
      </ScrollView>
    </div>
  );
})
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to:

- the root `<nav>` HTML element in case of `Tabs` component
- the `<a>` HTML element in case of `TabsItem`

This enables making the component interactive and helps to improve its
accessibility.

👉 For the full list of supported attributes refer to:

- [`<nav>` HTML element attributes][nav-attributes]{:target="_blank"}
- [`<a>` HTML element attributes][a-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/Tabs/Tabs.jsx"></docoff-react-props>

### TabsItem

<docoff-react-props src="/components/Tabs/TabsItem.jsx"></docoff-react-props>

## Theming

### Tabs Theming

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-Tabs__border-bottom-width`                    | Width of decorative bottom border                            |
| `--rui-Tabs__border-bottom-color`                    | Color of decorative bottom border                            |
| `--rui-Tabs__gap--xs`                                | Gap between individual tab items on smallest screens         |
| `--rui-Tabs__gap--sm`                                | Gap between individual tab items from `sm` breakpoint up     |
| `--rui-Tabs__gap--md`                                | Gap between individual tab items from `md` breakpoint up     |
| `--rui-Tabs__padding-x`                              | Horizontal padding                                           |

### TabsItem Theming

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-Tabs__item__padding--xs`                      | Padding of tab items on smallest screens                     |
| `--rui-Tabs__item__padding--sm`                      | Padding of tab items from `sm` breakpoint up                 |
| `--rui-Tabs__item__padding--md`                      | Padding of tab items from `md` breakpoint up                 |
| `--rui-Tabs__item__font-weight`                      | Label font weight                                            |
| `--rui-Tabs__item__color`                            | Label color                                                  |
| `--rui-Tabs__item__border-width`                     | Border width, allows specifying for individual sides         |
| `--rui-Tabs__item__border-color`                     | Border color, allows specifying for individual sides         |
| `--rui-Tabs__item__border-radius`                    | Top corners radius                                           |
| `--rui-Tabs__item__background-color`                 | Background color                                             |
| `--rui-Tabs__item__box-shadow`                       | Box shadow                                                   |
| `--rui-Tabs__item__icon__gap`                        | Gap between label and accompanying elements, e.g. icons      |

#### Theming TabsItem Hover and Active States

Most of TabsItem options can be adjusted for hover and active states as follows:

`--rui-Tabs__item--<STATE>__<PROPERTY>`

Where:

- `<STATE>` is one of `hover` or `active`,
- `<PROPERTY>` is one of `font-weight`, `color`, `border-width`, `border-color`,
  `background-color`, `box-shadow`, `shift-y` (shifts vertically the whole
  item), or `label__shift-y` (tweaks vertical position of tab label).

[a-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attributes
[nav-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
