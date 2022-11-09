# Modal

Modal allows prompting users to take or complete an action.

## Basic Usage

To implement the Modal component, you need to import it first:

```js
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch modal"
        onClick={() => setModalOpen(true)}
      />
      <div>
        {modalOpen && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
          >
            <ModalHeader>
              <ModalTitle>Delete the user?</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <p>
                  Do you really want to delete the user <code>admin</code>?
                  This cannot be undone.
                </p>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                label="Delete"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

See [API](#api) for all available options.

## General Guidelines

- Use modals to **confirm an action,** display a **blocking alert**, or reveal
  **contextual options or settings** that cannot be displayed in line with the
  parent content.

- **The title** should communicate the **purpose of the modal** rather than a
  generic text. For example “Delete the user?” tells more than “Are you sure?” or
  “Warning”.

- **Modal actions** should correspond to the modal purpose, too. E.g. “Delete”
  tells better what happens rather than “OK”.

- Modal **automatically focuses the first non-disabled form field** by default
  which allows users to confirm the modal by hitting the enter key. When no
  field is found then the primary button (in the footer) is focused. To turn
  this feature off, set the `autofocus` prop to `false`.

- **Avoid stacking** of modals. While it may technically work, the modal is just
  not designed for that.

## Composition

Modal is decomposed into the following components:

- [Modal](#api)
  - [ModalHeader](#modalheader_1)
    - [ModalTitle](#modaltitle)
    - [ModalCloseButton](#modalclosebutton)
  - [ModalBody](#modalbody_1)
    - [ModalContent](#modalcontent)
      (may be wrapped with [ScrollView](/components/ScrollView))
  - [ModalFooter](#modalfooter_1)

Using different combinations, you can compose different kinds of modals,
e.g. dialog modal, blocking modal, scrollable modal, etc.

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(null);
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch blocking modal without title"
        onClick={() => {
          setModalOpen(1);
          setTimeout(() => setModalOpen(null), 2500);
        }}
      />
      <Button
        label="Launch blocking modal with title"
        onClick={() => {
          setModalOpen(2);
          setTimeout(() => setModalOpen(null), 3500);
        }}
      />
      <Button
        label="Launch modal as dialog"
        onClick={() => setModalOpen(3)}
      />
      <Button
        label="Launch modal as form"
        onClick={() => setModalOpen(4)}
      />
      <div>
        {modalOpen === 1 && (
          <Modal>
            <ModalBody>
              <ModalContent>
                <p className="text-center">
                  Application is being loaded.
                  <span className="d-inline-flex align-items-center animation-spin-counterclockwise">
                    <rui-icon icon="loading" />
                  </span>
                </p>
              </ModalContent>
            </ModalBody>
          </Modal>
        )}
        {modalOpen === 2 && (
          <Modal>
            <ModalHeader>
              <ModalTitle>Action finished</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <p>
                  Action has been successfully finished.
                  You will be redirected within a few seconds.
                </p>
              </ModalContent>
            </ModalBody>
          </Modal>
        )}
        {modalOpen === 3 && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
          >
            <ModalHeader>
              <ModalTitle>Delete the user?</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <p>
                  Do you really want to delete the user <code>admin</code>?
                  This cannot be undone.
                </p>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                label="Delete"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
        {modalOpen === 4 && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
          >
            <ModalHeader>
              <ModalTitle>Add new user</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <FormLayout fieldLayout="horizontal">
                  <TextField label="Username" />
                  <TextField label="Password" type="password" />
                </FormLayout>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                label="Save"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

### ModalHeader

ModalHeader is an optional part of the Modal which allows you to display the title
of the modal and its close button.

It is recommended to compose ModalHeader from the following elements. For title,
use ModalTitle. For the close button, use ModalCloseButton, however it can
be omitted if a close button is part of ModalFooter.

There are two ways how to position elements within the ModalHeader:

1. You can use provided positioning. Place previously mentioned elements into
   the ModalHeader and use `justify` prop to set up the positioning of those
   elements.
2. You can customize positioning using another component (e.g.
   [Toolbar](/components/Toolbar)). In that case, set `justify` to `stretch` and
   position elements on your own.

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [variant, setVariant] = React.useState(null);
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch with close button"
        onClick={() => {
          setModalOpen(true);
          setVariant(1);
        }}
      />
      <Button
        label="Launch without close button"
        onClick={() => {
          setModalOpen(true);
          setVariant(2);
        }}
      />
      <Button
        label="Launch without close button and with centered title"
        onClick={() => {
          setModalOpen(true);
          setVariant(3);
        }}
      />
      <Button
        label="Launch with custom layout"
        onClick={() => {
          setModalOpen(true);
          setVariant(4);
        }}
      />
      <div>
        {modalOpen && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
          >
            {variant === 1 && (
              <ModalHeader>
                <ModalTitle>Delete the user?</ModalTitle>
                <ModalCloseButton onClick={() => setModalOpen(false)} />
              </ModalHeader>
            )}
            {variant === 2 && (
              <ModalHeader>
                <ModalTitle>Delete the user?</ModalTitle>
              </ModalHeader>
            )}
            {variant === 3 && (
              <ModalHeader justify="center">
                <ModalTitle>Delete the user?</ModalTitle>
              </ModalHeader>
            )}
            {variant === 4 && (
              <ModalHeader justify="stretch">
                <Toolbar justify="space-between">
                  <ToolbarItem>
                    {''}
                  </ToolbarItem>
                  <ToolbarItem>
                    <ModalTitle>Delete the user?</ModalTitle>
                  </ToolbarItem>
                  <ToolbarItem>
                    <ModalCloseButton onClick={() => setModalOpen(false)} />
                  </ToolbarItem>
                </Toolbar>
              </ModalHeader>
            )}
            <ModalBody>
              <ModalContent>
                <p>
                  Do you really want to delete the user <code>admin</code>?
                  This cannot be undone.
                </p>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                label="Delete"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

### ModalBody

ModalBody is a mandatory part of the Modal which allows you to display the
content of the Modal.

Although the ModalBody allows you to display arbitrary content, you should not
place content directly into the ModalBody, but wrap it with ModalContent first.

In case your content is expected to be long, consider wrapping ModalContent
with ScrollView. Check [Scrolling Long Content](#scrolling-long-content) section
below.

### ModalFooter

ModalFooter is an optional part of the Modal which allows you to display
user actions.

There are two ways to position buttons within the ModalFooter:

1. You can use provided positioning. Place Button component (or any arbitrary
   element) and use `justify` prop to set up the positioning of those elements.
2. You can customize positioning using another component (e.g.
   [Toolbar](/components/Toolbar)). In that case, set `justify` to `stretch`
   and position elements on your own.

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalJustify, setModalJustify] = React.useState('center');
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch modal with footer variants"
        onClick={() => setModalOpen(true)}
      />
      <div>
        {modalOpen && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
          >
            <ModalHeader>
              <ModalTitle>Footer justification</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <Radio
                  label="Footer justification"
                  onChange={(e) => setModalJustify(e.target.value)}
                  options={[
                    {
                      label: 'start',
                      value: 'start',
                    },
                    {
                      label: 'center',
                      value: 'center',
                    },
                    {
                      label: 'end',
                      value: 'end',
                    },
                    {
                      label: 'space-between',
                      value: 'space-between',
                    },
                    {
                      label: 'stretch (with a custom layout)',
                      value: 'stretch',
                    },
                  ]}
                  value={modalJustify}
                />
              </ModalContent>
            </ModalBody>
            <ModalFooter justify={modalJustify}>
              {
                modalJustify === 'stretch'
                  ? (
                    <Toolbar justify="space-between">
                        <ToolbarGroup>
                          <ToolbarItem>
                            <Button
                              color="danger"
                              label="Delete"
                              onClick={() => setModalOpen(false)}
                              ref={modalPrimaryButtonRef}
                            />
                          </ToolbarItem>
                          <ToolbarItem>
                            <Button
                              color="warning"
                              label="Archive"
                              onClick={() => setModalOpen(false)}
                              ref={modalPrimaryButtonRef}
                            />
                          </ToolbarItem>
                        </ToolbarGroup>
                      <ToolbarItem>
                        <Button
                          color="secondary"
                          label="Close"
                          onClick={() => setModalOpen(false)}
                          priority="outline"
                          ref={modalCloseButtonRef}
                        />
                      </ToolbarItem>
                    </Toolbar>
                  ) : (
                    <>
                      <Button
                        label="OK"
                        onClick={() => setModalOpen(false)}
                        ref={modalPrimaryButtonRef}
                      />
                      <Button
                        color="secondary"
                        label="Close"
                        onClick={() => setModalOpen(false)}
                        priority="outline"
                        ref={modalCloseButtonRef}
                      />
                    </>
                  )
              }
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

## Sizes

Modal is available in three fixed-width sizes: small, medium, large and fullscreen.
Modals of any size automatically shrink when they cannot fit the screen width.

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalSize, setModalSize] = React.useState('small');
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch small modal"
        onClick={() => {
          setModalSize('small');
          setModalOpen(true);
        }}
      />
      <Button
        label="Launch medium modal"
        onClick={() => {
          setModalSize('medium');
          setModalOpen(true);
        }}
      />
      <Button
        label="Launch large modal"
        onClick={() => {
          setModalSize('large');
          setModalOpen(true);
        }}
      />
      <Button
        label="Launch fullscreen modal"
        onClick={() => {
          setModalSize('fullscreen');
          setModalOpen(true);
        }}
      />
      <div>
        {modalOpen && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
            size={modalSize}
          >
            <ModalHeader>
              <ModalTitle>Delete the user?</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <p>
                  Do you really want to delete the user <code>admin</code>?
                  This cannot be undone.
                </p>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                label="Delete"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

On top of that, the modal can adjust to the width of its content.

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch auto-width modal"
        onClick={() => setModalOpen(true)}
      />
      <div>
        {modalOpen && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
            size="auto"
          >
            <ModalHeader>
              <ModalTitle>Delete the user?</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <p>
                  Do you really want to delete the user <code>admin</code>?
                  This cannot be undone.
                </p>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                label="Delete"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

👉 Please note the auto width may not function correctly in combination with
other auto-layout mechanisms, e.g. the auto-width
[FormLayout](/components/FormLayout#label-width). It's just too much
magic that doesn't work together (yet?) 🎩.

👉 Beware of horizontal FormLayout inside `small` modals. While automatic
overflow handling comes to the rescue in this kind of scenario, you will be
better off with the combination of auto-sized modal and horizontal FormLayout
with a fixed label width (i.e. any other than `auto`, see the previous note).

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch auto-with modal with a form"
        onClick={() => setModalOpen(true)}
      />
      <div>
        {modalOpen && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
            size="auto"
          >
            <ModalHeader>
              <ModalTitle>Form inside modal</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <FormLayout fieldLayout="horizontal">
                  <TextField label="A form element" />
                  <TextField label="Another form element" />
                  <TextField label="Yet another one" />
                </FormLayout>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                label="Save"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Cancel"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

## Position

Modal can be aligned either to the top or center of the screen.

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalPosition, setModalPosition] = React.useState('center');
  const modalPrimaryButtonRef = React.useRef();
  const modalCloseButtonRef = React.useRef();
  return (
    <>
      <Button
        label="Launch modal at center"
        onClick={() => {
          setModalPosition('center');
          setModalOpen(true);
        }}
      />
      <Button
        label="Launch modal at top"
        onClick={() => {
          setModalPosition('top');
          setModalOpen(true);
        }}
      />
      <div>
        {modalOpen && (
          <Modal
            closeButtonRef={modalCloseButtonRef}
            position={modalPosition}
            primaryButtonRef={modalPrimaryButtonRef}
          >
            <ModalHeader>
              <ModalTitle>Delete the user?</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>
              <ModalContent>
                <p>
                  Do you really want to delete the user <code>admin</code>?
                  This cannot be undone.
                </p>
              </ModalContent>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                label="Delete"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

## Keyboard Control

Modal can be controlled either by mouse or keyboard. To enhance user
experience, primary action can be fired by pressing `Enter` key and the modal
can be closed by pressing the `Escape` key.

To enable it, you just need to pass a reference to the buttons using
`primaryButtonRef` and `closeButtonRef` props on Modal. The advantage of passing
a reference to the button is that if the button is disabled, the key press will
not fire the event.

👉 We strongly recommend using this feature together with Autofocus for a better
user experience.

## Autofocus

Autofocus is implemented to enhance the user experience by automatically
focussing an element within the modal.

How does it work? It tries to find `input`, `textarea`, and `select` elements
inside of Modal and moves focus onto the first non-disabled one. If none is
found and the `primaryButtonRef` prop on Modal is set, then the primary button
is focused.

Autofocus is enabled by default, so if you want to control the focus of
elements manually, set the `autoFocus` prop on Modal to `false`.

## Scrolling Long Content

When modals become too long for the user's viewport or device, they scroll
independent of the page itself. This can be done in three ways using the
`scrolling` option of the ModalBody component:

- `auto` (default) — ModalBody is responsible for scrolling,
- `custom` — you must provide a custom component to handle scrolling,
   typically an instance of [ScrollView](/components/ScrollView) wrapping
   ModalContent,
- `none` — entire Modal is responsible for scrolling.

```docoff-react-preview
React.createElement(() => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalScrolling, setModalScrolling] = React.useState('auto');
  const modalCloseButtonRef = React.useRef();
  const modalPrimaryButtonRef = React.useRef();
  const modalContent = (
    <ModalContent>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa.
      </p>
      <p>
        Cum sociis natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem.
      </p>
      <p>
        Nulla consequat massa quis enim. Donec pede justo, fringilla
        vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
        ut, imperdiet a, venenatis vitae, justo.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa.
      </p>
      <p>
        Cum sociis natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem.
      </p>
      <p>
        Nulla consequat massa quis enim. Donec pede justo, fringilla
        vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
        ut, imperdiet a, venenatis vitae, justo.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa.
      </p>
      <p>
        Cum sociis natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem.
      </p>
      <p>
        Nulla consequat massa quis enim. Donec pede justo, fringilla
        vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
        ut, imperdiet a, venenatis vitae, justo.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa.
      </p>
      <p>
        Cum sociis natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem.
      </p>
      <p>
        Nulla consequat massa quis enim. Donec pede justo, fringilla
        vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
        ut, imperdiet a, venenatis vitae, justo.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa.
      </p>
      <p>
        Cum sociis natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem.
      </p>
      <p>
        Nulla consequat massa quis enim. Donec pede justo, fringilla
        vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
        ut, imperdiet a, venenatis vitae, justo.
      </p>
    </ModalContent>
  )
  return (
    <>
      <Button
        label="Launch modal with scrolling body"
        onClick={() => {
          setModalScrolling('auto');
          setModalOpen(true);
        }}
      />
      <Button
        label="Launch modal with ScrollView"
        onClick={() => {
          setModalScrolling('custom');
          setModalOpen(true);
        }}
      />
      <Button
        label="Launch modal with non-scrolling body"
        onClick={() => {
          setModalScrolling('none');
          setModalOpen(true);
        }}
      />
      <div>
        {modalOpen && (
          <Modal
            autoFocus={false}
            closeButtonRef={modalCloseButtonRef}
            primaryButtonRef={modalPrimaryButtonRef}
            size="small"
          >
            <ModalHeader>
              <ModalTitle>Modal with long content</ModalTitle>
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody scrolling={modalScrolling}>
              {
                modalScrolling === 'custom'
                  ? (
                    <ScrollView>
                      {modalContent}
                    </ScrollView>
                  )
                  : modalContent
              }
            </ModalBody>
            <ModalFooter>
              <Button
                label="OK"
                onClick={() => setModalOpen(false)}
                ref={modalPrimaryButtonRef}
              />
              <Button
                label="Close"
                onClick={() => setModalOpen(false)}
                priority="outline"
                ref={modalCloseButtonRef}
              />
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
});
```

### Long Content and Autofocus

👉 If you wrap ModalContent with ScrollView, you may want to turn `autoFocus`
off to prevent the modal from scrolling to the end immediately after being
opened.

<!-- markdownlint-disable MD024 -->

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify [React synthetic events] or **any HTML attribute you like.** All
attributes that don't interfere with the API are forwarded to the:

- `<div>` HTML element in case of the `Modal` component. This `<div>` is not the
  root, but its first child which represents the modal window.
- root `<div>` HTML element in case of `ModalHeader`, `ModalBody`, `ModalContent`
  and `ModalFooter` components.
- heading HTML element, which level can be specified through `level` option, in
  case of the `ModalTitle` component.
- native HTML `<button>` in case of the `ModalCloseButton` component.

This enables making the component interactive and helps to improve its
accessibility.

👉 Refer to the MDN reference for the full list of supported attributes of the
[div], [heading] and [button] element.

## API

<docoff-react-props src="/components/Modal/Modal.jsx"></docoff-react-props>

### ModalHeader

<docoff-react-props src="/components/Modal/ModalHeader.jsx"></docoff-react-props>

### ModalTitle

<docoff-react-props src="/components/Modal/ModalTitle.jsx"></docoff-react-props>

### ModalCloseButton

<docoff-react-props src="/components/Modal/ModalCloseButton.jsx"></docoff-react-props>

### ModalBody

<docoff-react-props src="/components/Modal/ModalBody.jsx"></docoff-react-props>

### ModalContent

<docoff-react-props src="/components/Modal/ModalContent.jsx"></docoff-react-props>

### ModalFooter

<docoff-react-props src="/components/Modal/ModalFooter.jsx"></docoff-react-props>

## Theming

| Custom Property                                      | Description                                                   |
|------------------------------------------------------|---------------------------------------------------------------|
| `--rui-Modal__padding-x`                             | Inline padding of individual modal components                 |
| `--rui-Modal__padding-y`                             | Block padding of individual modal components                  |
| `--rui-Modal__background`                            | Modal background (including `url()` or gradient)              |
| `--rui-Modal__box-shadow`                            | Modal box shadow                                              |
| `--rui-Modal__separator__width`                      | Width of separator between modal header, body, and footer     |
| `--rui-Modal__separator__color`                      | Color of separator between modal header, body, and footer     |
| `--rui-Modal__outer-spacing-xs`                      | Spacing around modal, `xs` screen size                        |
| `--rui-Modal__outer-spacing-sm`                      | Spacing around modal, `sm` screen size and bigger             |
| `--rui-Modal__header__gap`                           | Modal header gap between children                             |
| `--rui-Modal__footer__background`                    | Modal footer background (including `url()` or gradient)       |
| `--rui-Modal__footer__gap`                           | Modal footer gap between children                             |
| `--rui-Modal__backdrop__background`                  | Modal backdrop background (including `url()` or gradient)     |
| `--rui-Modal--auto__min-width`                       | Min width of auto-sized modal (when enough screen estate)     |
| `--rui-Modal--auto__max-width`                       | Max width of auto-sized modal (when enough screen estate)     |
| `--rui-Modal--small__width`                          | Width of small modal                                          |
| `--rui-Modal--medium__width`                         | Width of medium modal                                         |
| `--rui-Modal--large__width`                          | Width of large modal                                          |
| `--rui-Modal--fullscreen__width`                     | Width of fullscreen modal                                     |
| `--rui-Modal--fullscreen__height`                    | Height of fullscreen modal                                    |

[React synthetic events]: https://reactjs.org/docs/events.html
[div]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[heading]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#attributes
[button]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes
