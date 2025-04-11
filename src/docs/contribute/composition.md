# Composition

There are several types of composition approaches.

1. **Self-contained components:** just a single component is needed. E.g.
   `Alert`, `Button`, `TextField`, etc.

2. **Components with subcomponents:** subcomponents cannot exist on their own
   outside their parent components.

     - **Mandatory subcomponents:** subcomponent must be used at least once in
       order for the composition to work. E.g. `Tabs` + `TabsItem`.

     - **Optional subcomponents:** optional subcomponents may be used to achieve
       special results. E.g. `FormLayout` + `FormLayoutCustomField` or `Grid` +
       `GridSpan`.

     - **Both mandatory and optional subcomponents:** e.g. `Card` + `CardBody`
       (mandatory) + `CardFooter` (optional), `Toolbar` + `ToolbarItem`
       (mandatory) + `ToolbarGroup` (optional), etc.

3. **Wrappers for other components:** component is designed to wrap other
   self-contained components. E.g. `FormLayout` + form fields (`CheckboxField`,
   `TextField`, `Toggle`, …) or `ButtonGroup` + `Button`.

While authoring self-contained components (1) and wrappers (3) is quite
straightforward, components with subcomponents require special attention when
styling. Head to [CSS Guidelines] to learn more.

[CSS Guidelines]: /docs/contribute/css
