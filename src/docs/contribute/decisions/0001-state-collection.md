# 1. A State collection for data-bearing components

**Status:** Proposed — resolves #723, supersedes the approach discussed in #721.

## Context

Form fields support `validationState` with the values `valid`, `invalid` and
`warning`, rendered in green, red and amber. #723 asks for a new `changed`
state — "this field's value differs from the saved one" — in a colour of its own.

Feedback from projects building on React UI shows the current API doesn't cover
what they need, and the workarounds they've adopted are informative:

- **`valid` is not used.** Across the products we have visibility into, no form
  field ever sets `valid`. The state exists but earns nothing.
- **`warning` is being abused to mean "changed".** Because there's no state for
  "this value has been edited but not saved", projects set `warning` and then
  override the `--rui-FormField--warning--*` tokens to repaint it. One project
  has an entire app-level theme file that exists for no other purpose, and has to
  place it outside any cascade layer to win against the library's `theme` layer.
  The override is global, so it also recolours genuine `warning` uses elsewhere
  in the same app — the state becomes unusable for its actual meaning.
- **Projects invent the vocabulary we didn't give them.** More than one has
  defined its own state type (`invalid | modified | null`) plus adapter functions
  whose only job is to downgrade that vocabulary at the React UI boundary. One
  carries *two* such adapters for a single concept: one mapping it to a field's
  `validationState`, another mapping it to a container's `color`, because nothing
  relates the two.
- **Precedence is already settled downstream.** Every implementation resolves its
  own precedence — invalid beats changed — before reaching us.

That last point matters for the API shape: a separate `changed` prop would make
the library re-implement a policy consumers already own, and introduce a hidden
interaction between two props.

The deeper problem is that `validationState` is an outlier in our own design
system. `foundation/collections.md` defines Collections with the rule *"if an
option from a collection is used in a component, all other options from the same
collection must be available for use in that component too."* Card, Alert, Badge,
Button and Modal implement the Feedback **colour** collection through `color`,
looping it in their settings. `validationState` is an ad-hoc, undocumented
three-value list that only *coincidentally* maps to three of the six feedback
colours, hand-written as three SCSS blocks in each of nine components.

## Decision

Introduce a **State collection** — `valid`, `invalid`, `warning`, `changed` — as
a first-class collection alongside the Colour collections, and rename the
form-field prop `validationState` → `state`.

| | Answers the question | Values | Taken by |
|---|---|---|---|
| **Feedback colours** | what should this look like? | `success` `warning` `danger` `help` `info` `note` | Alert, Badge, Button, Modal — messaging and decoration |
| **State** | what condition is this data in? | `valid` `invalid` `warning` `changed` | form fields, and later Card and other components that hold or contain data |

`changed` receives a colour of its own but **does not** join the Feedback palette.
The state → colour mapping becomes one small, themeable surface:

```scss
--rui-color-state-valid: var(--rui-color-feedback-success);
--rui-color-state-invalid: var(--rui-color-feedback-danger);
--rui-color-state-warning: var(--rui-color-feedback-warning);
--rui-color-state-changed: /* one new hue */;
```

Documented precedence, for components that derive a state from their children
(such as `InputGroup`): `invalid` > `warning` > `changed` > `valid`.

## Rationale

### Aren't `valid`/`success` and `invalid`/`danger` duplicates?

No — they're different kinds of list. **Feedback is a palette; State is a
vocabulary.** `success` is a colour name meaning "whatever you want to say in
green". `valid` is a fact about data. `valid`/`success` isn't a duplicated pair,
it's a *mapping* between the two.

The mismatch at both ends is what proves they're distinct collections: `changed`
has no feedback colour, and `help`, `info` and `note` have no state. If they were
one list, that couldn't happen.

The test that separates them is what question the prop answers. `color` answers
"what should this look like" — a free authoring choice. `state` answers "what
condition is this data in" — not a choice, a consequence. You'd never write
`<Button state="invalid">`, because a button holds no data to be invalid; you'd
never write `<TextField color="help">`, because a field's colour isn't the
author's to pick.

Three of the four mappings above are one-line aliases, and that's the point: the
relation is stated once, explicitly, instead of being re-derived in every
component's tokens and again in every consumer's hand-map.

### Why `changed` must not join the Feedback palette

Because `<Alert color="changed">` is nonsense. An Alert *is* a message, and
"changed" isn't a kind of message you deliver. A Card, by contrast, is a
container of data and can genuinely be in a state — but what it wants is
`<Card state="changed">`, not a changed *colour*.

Keeping `changed` out of the Feedback collection also avoids roughly 38 new
token defaults across Alert, Badge, Button, Card and Modal (Button alone needs
27), the corresponding snapshot churn, and a legal-but-meaningless
`<Button color="changed">`.

### Why the existing states move to the new collection rather than staying put

Leaving `validationState` in place and adding `changed` beside it would keep the
name lying — `changed` is not a validation result — and would leave containers
with no way to express the same vocabulary. The collection is what makes a field
and the card summarising it related by construction rather than by convention.

## Consequences

**This is a breaking change.** `validationState` is removed rather than
deprecated, for three reasons:

- Wrapper libraries that re-declare the prop can absorb the rename internally and
  keep exposing their own name, so their consumers need no change at all.
- We have no deprecation mechanism anywhere in the codebase, so a deprecated prop
  would warn nobody and would linger indefinitely.
- An alias costs `state ?? validationState` in eight components plus the
  `InputGroup` reducer, duplicated propTypes and JSDoc, duplicated documentation,
  and an extra test case per component.

**Theming is not broken.** The `--rui-FormField--<STATE>--<INTERACTION>__<PROPERTY>`
token names don't change, so existing theme overrides keep working untouched.

**`warning` becomes usable again** for projects currently spending it on
"changed", and they can drop their token overrides and adapter functions.

**One wart, pre-dating this change:** `warning` appears in both collections. The
*state* `warning` ("validation raised a non-blocking concern") and the *colour*
`warning` (amber) are different things sharing a word. This needs an explicit
note in the documentation; renaming either is out of scope here.

**`validationText` is untouched.** It and `helpText` are already independent
props, both rendered, both coloured from the same token — which is precisely
what #712 is about, and their order is what #711 is about. Folding them together
would destroy the distinction those issues exist to sharpen.

## Alternatives considered

| Option (from #723) | Verdict |
|---|---|
| 1. New `validationState` value | The name would then lie: `changed` is not a validation result. Superseded by renaming the prop. |
| 2. Reuse `valid` for `changed` | Rejected in the thread; and `valid` is unused in practice, so this trades one unused state for a misleading one. |
| 3. Separate `changed` prop | Makes the library own a precedence rule consumers already implement themselves, and adds a hidden interaction between two props. |
| 4. Rename + new value | **This proposal,** generalised beyond form fields into a documented collection. |
| 5. Generic `color` prop (#721) | Gives up the semantics entirely; consumers keep hand-mapping meaning → colour, so the duplicate adapters survive. It also makes a field's colour a free authoring choice, which it shouldn't be. |

## Open questions

1. **Do #711 and #712 ride along?** All three rework the same rendering block,
   the same `surrounding-text-color` token and the same documentation sections.
   One breaking-change window means dependent projects migrate once instead of
   twice; separate PRs are cleaner to review. Leaning towards bundling.
2. **Is `changed` the right word?** Alternatives: `modified`, `unsaved` (names
   the workflow rather than the element), `dirty` (React jargon, reads poorly in
   end-user documentation). Hard to change later.
3. **Which hue?** Every blue-ish slot is taken (`note` and `selected` `#007bff`,
   `info` `#17a2b8`, `primary` `#00778b`, `help` `#6610f2`). Needs a design
   decision.
4. **Does `Card` land in the same change or a follow-up?** Card is where the
   field ↔ container relation is demonstrated, and it's what lets consumers drop
   their second hand-map — but it isn't what #723 asks for. Suggest a follow-up
   issue, given the one-PR-per-subject rule.

## Rough size, if agreed

Nine `*.module.scss` files (a loop over the collection replacing three
hand-written blocks each), eight component prop definitions, the `InputGroup`
precedence reducer, one shared helper, the collections / colours / forms-theming
documentation plus ten component READMEs, and a large Playwright snapshot
regeneration — the state test tables feed `mixPropTests`, so a fourth value
multiplies across all nine snapshot directories, and the prop rename renames
every existing snapshot file.
