# 10. State collection

Status: Proposed

## Context

Form fields take `validationState` with the values `valid`, `invalid` and
`warning`. [#723][723] asks for a `changed` state: the value differs from the
saved one.

Projects using React UI already work around the missing state:

- `valid` is never used.
- `warning` is repainted to mean "changed", which makes it unusable for real
  warnings in the same app.
- Projects define their own state type and map it to `validationState` for
  fields and to `color` for containers, because nothing relates the two.
- Every project already decides that `invalid` wins over `changed` before the
  value reaches React UI.

`validationState` is also an outlier. It is an undocumented list hand-written in
nine components, not one of the [collections][collections].

## Decision

We add a **State** collection with the values `valid`, `invalid`, `warning` and
`changed`, and rename the form field prop `validationState` to `state`.

State is not a colour collection. `color` says what a component should look
like and is the author's choice. `state` says what condition the data is in and
follows from the data. That is why `changed` gets its own colour token but does
not join the Feedback colours: `<Alert color="changed">` would mean nothing.

Each state maps to a colour in one place:

```scss
--rui-color-state-valid: var(--rui-color-feedback-success);
--rui-color-state-invalid: var(--rui-color-feedback-danger);
--rui-color-state-warning: var(--rui-color-feedback-warning);
--rui-color-state-changed: /* new hue */;
```

A component shows one state at a time. Data can be changed and invalid at once,
but the consuming app decides which one to show. Where React UI has to pick one
itself, such as `InputGroup` summarising its fields, it uses what matters most
to the user:

1. `invalid`: the user must act before continuing.
2. `warning`: the user should know something may break.
3. `changed`: no action needed, but the user wants to see what they edited.
4. `valid`

We do not reuse `valid` for changed data. `valid` is a validation result,
`changed` is a comparison with the saved value, and a form that confirms valid
input would look the same as a form with unsaved edits.

## Consequences

- Breaking change: `validationState` is removed, not deprecated. We have no
  deprecation mechanism, and wrapper libraries can absorb the rename.
- Theme overrides keep working, because the `--rui-FormField--<STATE>--*` token
  names do not change.
- Projects that repainted `warning` can drop the override and use `changed`.
- `warning` now exists both as a state and as a Feedback colour. The docs need
  to explain the difference.
- [#711][711] and [#712][712] rework the same code and docs. They land as
  separate commits in the same release, so consumers migrate once.
- Other data-bearing components, such as `Card`, can adopt the collection in
  follow-up changes.

## Alternatives considered

- **A new `validationState` value.** The prop name would be wrong, since
  `changed` is not a validation result.
- **A separate `changed` prop.** React UI would own the precedence consumers
  already decide, and two props would interact in hidden ways.
- **A generic `color` prop ([#721][721]).** Consumers would keep mapping meaning
  to colour themselves.

## Open questions

- Which hue for `--rui-color-state-changed`? The blues are taken by `note`,
  `selected`, `info` and `primary`, and violet is close to `help`.

[711]: https://github.com/react-ui-org/react-ui/issues/711
[712]: https://github.com/react-ui-org/react-ui/issues/712
[721]: https://github.com/react-ui-org/react-ui/issues/721
[723]: https://github.com/react-ui-org/react-ui/issues/723
[collections]: ../src/docs/foundation/collections.md
