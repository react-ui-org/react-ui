# Breakpoints

There are 7 CSS breakpoints to provide you maximum control over the
responsive behavior of the layout of your app.

These breakpoint values are used throughout React UI, in components, or in
helper classes. You can reuse them in your own CSS and components to create a
seamless experience for your users.

| Name | Value in em | Value in px* | Usage in CSS**                    | Usage in SCSS                  |
|------|------------:|-------------:|-----------------------------------|--------------------------------|
| xs   | 0 em        | 0 px         | `--rui-dimension-breakpoint-xs`   | `@include breakpoint.up(xs)`   |
| sm   | 36 em       | 576 px       | `--rui-dimension-breakpoint-sm`   | `@include breakpoint.up(sm)`   |
| md   | 48 em       | 768 px       | `--rui-dimension-breakpoint-md`   | `@include breakpoint.up(md)`   |
| lg   | 66 em       | 1056 px      | `--rui-dimension-breakpoint-lg`   | `@include breakpoint.up(lg)`   |
| xl   | 84 em       | 1344 px      | `--rui-dimension-breakpoint-xl`   | `@include breakpoint.up(xl)`   |
| x2l  | 90 em       | 1440 px      | `--rui-dimension-breakpoint-x2l`  | `@include breakpoint.up(x2l)`  |
| x3l  | 120 em      | 1920 px      | `--rui-dimension-breakpoint-x3l`  | `@include breakpoint.up(x3l)`  |

\* Supposed the root font size is 16 px.

\** ⚠️ Consider **CSS breakpoints as read-only:** because
[CSS custom properties][w3-custom-properties] cannot be used inside media
queries (media query is [not a CSS property][so-custom-properties]), changing
their values will have no effect. If you need to adjust the breakpoint values,
you must override the `$values` SCSS map defined in
`styles/settings/_breakpoints.scss`.

[w3-custom-properties]: https://www.w3.org/TR/css-variables-1/#using-variables
[so-custom-properties]: https://stackoverflow.com/q/40722882
