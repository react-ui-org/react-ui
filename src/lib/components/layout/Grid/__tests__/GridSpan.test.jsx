import React from 'react';
import { shallow } from 'enzyme';
import { GridSpan } from '../GridSpan';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <GridSpan />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <GridSpan>
        <div>content</div>
      </GridSpan>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <GridSpan>
        <div>content 1</div>
        <div>content 2</div>
        <div>content 3</div>
      </GridSpan>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with simple props', () => {
    const tree = shallow((
      <GridSpan
        columns={2}
        id="my-grid-span"
        rows={3}
      >
        <div>content</div>
      </GridSpan>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with complex props', () => {
    const tree = shallow((
      <GridSpan
        columns={{
          md: 1,
          xs: 2,
        }}
        id="my-grid-span"
        rows={{
          md: 4,
          xs: 3,
        }}
      >
        <div>content</div>
      </GridSpan>
    ));

    expect(tree).toMatchSnapshot();
  });
});
