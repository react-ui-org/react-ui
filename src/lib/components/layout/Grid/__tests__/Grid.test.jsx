import React from 'react';
import { shallow } from 'enzyme';
import { Grid } from '../Grid';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <Grid />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Grid>
        <div>content</div>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Grid>
        <div>content 1</div>
        <div>content 2</div>
        <div>content 3</div>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with simple props', () => {
    const tree = shallow((
      <Grid
        alignContent="center"
        alignItems="center"
        autoFlow="dense"
        columns="1fr 1fr"
        columnGap="1rem"
        id="my-grid"
        justifyContent="center"
        justifyItems="center"
        rows="auto"
        rowGap="1rem"
      >
        <div>content</div>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with complex props', () => {
    const tree = shallow((
      <Grid
        alignContent="center"
        alignItems="center"
        autoFlow="dense"
        columns={{
          md: '1fr 2fr',
          xs: '1fr',
        }}
        columnGap={{
          lg: 'var(--rui-spacing-4)',
          md: 'var(--rui-spacing-2)',
        }}
        id="my-grid"
        justifyContent="center"
        justifyItems="center"
        rows={{
          md: 'auto 200px auto',
          xs: 'auto auto 200px 200px',
        }}
        rowGap={{
          md: 'var(--rui-spacing-4)',
          xs: 'var(--rui-spacing-3)',
        }}
      >
        <div>content</div>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });
});
