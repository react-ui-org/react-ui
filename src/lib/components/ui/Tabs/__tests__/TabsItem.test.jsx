import React from 'react';
import {
  mount,
  shallow,
} from 'enzyme';
import sinon from 'sinon';
import { TabsItem } from '../TabsItem';

describe('rendering', () => {
  it('renders correctly with mandatory props', () => {
    const tree = shallow((
      <TabsItem
        href="/tab-1"
        label="Tab 1"
      />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <TabsItem
        afterLabel={(<span>after label</span>)}
        beforeLabel={(<span>before label</span>)}
        href="/tab-1"
        id="my-tab"
        isActive
        label="Tab 1"
        onClick={() => {}}
      />
    ));

    expect(tree).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onClick() on navigating', () => {
    const spy = sinon.spy();
    const component = mount((
      <TabsItem
        href="/tab-1"
        label="Tab 1"
        onClick={spy}
      />
    ));

    component.find('a').at(0).simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});
