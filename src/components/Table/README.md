# Table

Table presents complex tabular data in an easy-to-scan way.

## Basic Usage

To implement the Table component, you need to import it first:

```js
import { Table } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Table
  columns={[
    {
      label: 'ID',
      name: 'id',
    },
    {
      label: 'Name',
      name: 'name',
    },
    {
      format: (date) => date.toLocaleDateString('en-GB'),
      label: 'Date of birth',
      name: 'dateOfBirth',
    },
  ]}
  rows={[
    {
      dateOfBirth: new Date(1940, 10, 9),
      id: 1,
      name: 'John Lennon',
    },
    {
      dateOfBirth: new Date(1942, 6, 18),
      id: 2,
      name: 'Paul McCartney',
    },
    {
      dateOfBirth: new Date(1943, 2, 25),
      id: 3,
      name: 'George Harrison',
    },
    {
      dateOfBirth: new Date(1940, 7, 7),
      id: 4,
      name: 'Richard Starkey (Ringo Starr)',
    },
  ]}
/>
```

See [API](#api) for all available options.

## General Guidelines

- **Keep headers short** so users can quickly scan the content of the table.
  Just one or two words should be enough.

- Tables are **good for displaying complex tabular data.** For simpler data sets
  or even plain key-value pairs, consider using the
  [Grid](/components/Grid) component.

- Tables make **lots of information easier to scan and compare.** If you have
  fewer sections and want to emphasize each group more, consider using
  [Cards](/components/Card).

## Responsive Tables

The easiest way to make tables responsive is to wrap them with the
[ScrollView](/components/ScrollView) component in the horizontal mode.

```docoff-react-preview
<ScrollView direction="horizontal">
  <Table
    columns={[
      {
        label: 'ID',
        name: 'id',
      },
      {
        format: (name) => (
          <span style={{ whiteSpace: 'nowrap' }}>{name}</span>
        ),
        label: 'Name',
        name: 'name',
      },
      {
        format: (note) => (
          <span style={{ whiteSpace: 'nowrap' }}>{note}</span>
        ),
        label: 'Note',
        name: 'note',
      },
      {
        format: (date) => date.toLocaleDateString('en-GB'),
        label: 'Date of birth',
        name: 'dateOfBirth',
      },
    ]}
    rows={[
      {
        dateOfBirth: new Date(1940, 10, 9),
        id: 1,
        name: 'John Lennon',
        note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. '
          + 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis '
          + 'natoque penatibus et magnis dis parturient montes, nascetur '
          + 'ridiculus mus. Donec quam felis, ultricies nec, pellentesque '
          + 'eu, pretium quis, sem.',
      },
      {
        dateOfBirth: new Date(1942, 6, 18),
        id: 2,
        name: 'Paul McCartney',
        note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. '
          + 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis '
          + 'natoque penatibus et magnis dis parturient montes, nascetur '
          + 'ridiculus mus. Donec quam felis, ultricies nec, pellentesque '
          + 'eu, pretium quis, sem.',
      },
      {
        dateOfBirth: new Date(1943, 2, 25),
        id: 3,
        name: 'George Harrison',
        note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. '
          + 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis '
          + 'natoque penatibus et magnis dis parturient montes, nascetur '
          + 'ridiculus mus. Donec quam felis, ultricies nec, pellentesque '
          + 'eu, pretium quis, sem.',
      },
      {
        dateOfBirth: new Date(1940, 7, 7),
        id: 4,
        name: 'Richard Starkey (Ringo Starr)',
        note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. '
          + 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis '
          + 'natoque penatibus et magnis dis parturient montes, nascetur '
          + 'ridiculus mus. Donec quam felis, ultricies nec, pellentesque '
          + 'eu, pretium quis, sem.',
      },
    ]}
  />
</ScrollView>
```

## Sortable Columns

The Table supports sorting indicators by adding a simple configuration.

⚠️ The Table component only provides necessary visual support for sorting. Aside
from icons, you must **provide the comparing functionality yourself** if you
aren't rendering **already sorted data.** The reason for this decision is that
client often does not have access to the full dataset.

The following is an example of custom sorting function executed on the client.

```docoff-react-preview
React.createElement(() => {
  const [tableSortColumn, setTableSortColumn] = React.useState('id');
  const [tableSortDirection, setTableSortDirection] = React.useState('asc');
  const [rows, setRows] = React.useState([
    {
      dateOfBirth: new Date(1940, 10, 9),
      id: 1,
      name: 'John Lennon',
    },
    {
      dateOfBirth: new Date(1942, 6, 18),
      id: 2,
      name: 'Paul McCartney',
    },
    {
      dateOfBirth: new Date(1943, 2, 25),
      id: 3,
      name: 'George Harrison',
    },
    {
      dateOfBirth: new Date(1940, 7, 7),
      id: 4,
      name: 'Richard Starkey (Ringo Starr)',
    },
  ]);
  const compare = (items, key, direction) => {
    const sortedItems = [...items];
    if (key === 'id' || key === 'dateOfBirth') {
      sortedItems.sort((a, b) => b[key] - a[key]);
    } else if (key === 'name') {
      sortedItems.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    }
    return direction === 'desc' ? sortedItems.reverse() : sortedItems;
  };
  const columns = [
    {
      isSortable: true,
      label: 'ID',
      name: 'id',
    },
    {
      isSortable: true,
      label: 'Name',
      name: 'name',
    },
    {
      format: (date) => date.toISOString(),
      isSortable: true,
      label: 'Date of birth',
      name: 'dateOfBirth',
    },
  ];
  return (
    <Table
      columns={columns}
      rows={rows}
      sort={{
        ascendingIcon: <rui-icon icon="up" />,
        column: tableSortColumn,
        descendingIcon: <rui-icon icon="down" />,
        direction: tableSortDirection,
        onClick: (column, direction) => {
          setTableSortColumn(column);
          setTableSortDirection(direction === 'asc' ? 'desc' : 'asc');
          setRows(compare(rows, column, direction));
        },
      }}
    />
  );
});
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
root `<table>` HTML element. This enables making the component interactive and
helps to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<table>` HTML element attributes][table-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/Table/Table.jsx"></docoff-react-props>

[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[table-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#attributes
