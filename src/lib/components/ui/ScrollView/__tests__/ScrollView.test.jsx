import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import * as elementPositionService from '../../../../services/elementPositionService';
import ScrollView from '..';

describe('rendering', () => {
  const mockedPositionDifference = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  };
  const stub = sinon
    .stub(elementPositionService, 'getElementsPositionDifference')
    .returns(mockedPositionDifference);

  it('renders correctly with a single child', () => {
    const tree = mount((
      <ScrollView>
        <span>content</span>
      </ScrollView>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = mount((
      <ScrollView>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </ScrollView>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with scrollbar disabled', () => {
    const tree = mount((
      <ScrollView scrollbar={false}>
        <span>content</span>
      </ScrollView>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with arrows', () => {
    const tree = mount((
      <ScrollView arrows arrowsColor="white" arrowsScrollStep={200}>
        <span>content</span>
      </ScrollView>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = mount((
      <ScrollView
        arrows
        arrowsColor="blue"
        arrowsScrollStep={300}
        customEndShadow={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
        customNextArrow={<span>→</span>}
        customPrevArrow={<span>←</span>}
        customStartShadow={{
          background: 'none',
        }}
        debounce={100}
        direction="horizontal"
        id="my-scrollview"
        scrollbar={false}
        shadowColor={{
          alpha: 0.5,
          blue: 122,
          green: 122,
          red: 122,
        }}
        shadowSize="100px"
      >
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </ScrollView>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  stub.restore();
});
