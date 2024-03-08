# Spacing

With only few reasonable exceptions, all margins and paddings in React UI use
predefined spacing values. Using only the values from the spacing scale will
help you keep your UI consistent.

👉 You can adjust all custom properties on this page (and more) in your theme by
overriding values in the
[design tokens](/docs/customize/theming/overview#design-tokens) section.

| Space | Value    | Usage in CSS              | Usage in SCSS   | Usage in HTML/JSX* |
|-------|---------:|---------------------------|-----------------|--------------------|
| 0     | 0        | `--rui-dimension-space-0` | `spacing.of(0)` | `class="mt-0"`     |
| 1     | 0.25 rem | `--rui-dimension-space-1` | `spacing.of(1)` | `class="mt-1"`     |
| 2     | 0.5 rem  | `--rui-dimension-space-2` | `spacing.of(2)` | `class="mt-2`      |
| 3     | 0.75 rem | `--rui-dimension-space-3` | `spacing.of(3)` | `class="mt-3`      |
| 4     | 1 rem    | `--rui-dimension-space-4` | `spacing.of(4)` | `class="mt-4"`     |
| 5     | 1.5 rem  | `--rui-dimension-space-5` | `spacing.of(5)` | `class="mt-5`      |
| 6     | 2 rem    | `--rui-dimension-space-6` | `spacing.of(6)` | `class="mt-6`      |
| 7     | 2.5 rem  | `--rui-dimension-space-7` | `spacing.of(7)` | `class="mt-7"`     |

\* For the sake of brevity, usage in HTML only illustrates the top margin
property. See [Spacing helpers](/docs/css-helpers/spacing) for the full list of
options.

## Shared Spacings

Commonly reused spacings. Bottom spacing is applied unless the element in
question is a last child of its parent.

| Category | Usage in CSS                            | Usage in SCSS              | Space | Shared by              |
|----------|-----------------------------------------|----------------------------|-------|------------------------|
| base     | `--rui-dimension-space-bottom-base`     | `spacing.bottom()`         | 5     | Paragraphs, lists etc. |
| headings | `--rui-dimension-space-bottom-headings` | `spacing.bottom(headings)` | 5     | Heading elements       |
| layouts  | `--rui-dimension-space-bottom-layouts`  | `spacing.bottom(layouts)`  | 5     | Layout components      |

### Note on Live Playgrounds

For demonstration purposes, all elements that are direct descendants of live
playgrounds in these docs are given a standard margin on all sides which
suppresses default spacing behavior described above:

```docoff-react-preview
<p>This paragraph will have standard playground margin an all sides.</p>
<p>This paragraph will have it too.</p>
```

Once wrapped in a `div`, all elements and components remain unaffected and have
exactly the same margins as they would have in a real-world React UI project:

```docoff-react-preview
<div>
    <p>
        This paragraph will have bottom margin of
        <code>--rui-dimension-space-bottom-base</code>.
    </p>
    <p>
        This paragraph is a last child of its parent and thus will have no bottom
        margin.
    </p>
</div>
```
