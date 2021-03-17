import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

// Configure enzyme to use adapter for React
Enzyme.configure({ adapter: new Adapter() });

// Configure jest to use json serializer for snapshot creation
expect.addSnapshotSerializer(createSerializer({
  ignoreDefaultProps: true,
  mode: 'deep',
  noKey: true,
}));
