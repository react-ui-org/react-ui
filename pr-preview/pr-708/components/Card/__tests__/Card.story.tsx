import React from 'react';
import type { HTMLAttributes } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
} from '..';
import { TextLink } from '../../TextLink';
import { Button } from '../../Button';
import { ScrollView } from '../../ScrollView';

// Types for story component will be improved when we have full TypeScript support
type CardForTestProps = HTMLAttributes<HTMLDivElement>;

export const CadForTest = ({
  ...props
}: CardForTestProps) => (
  <div style={{ padding: '20px' }}>
    <Card {...props}>
      <CardBody>
        This is a card body.
        <TextLink href="/" label="This is a link" />
      </CardBody>
      <CardFooter>
        <Button label="Footer button" />
      </CardFooter>
    </Card>
  </div>
);

export const CadWithScrollableForTest = ({
  ...props
}: CardForTestProps) => (
  <div
    style={{
      display: 'flex',
      height: '400px',
      padding: '20px',
      width: '500px',
    }}
  >
    <Card {...props}>
      <ScrollView arrows>
        <CardBody id="card-body">
          Hello! I&apos;m scrollable card.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Donec quam felis,
          ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
          quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
          imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
          ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
          eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
          sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
          hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
          <TextLink href="/" label="This is a link" />
        </CardBody>
      </ScrollView>
      <CardFooter>
        <Button label="Footer button" />
      </CardFooter>
    </Card>
  </div>
);

export const CardOnlyWithBodyForTest = ({
  ...props
}: CardForTestProps) => (
  <div style={{ padding: '20px' }}>
    <Card {...props}>
      <CardBody>
        This is a card body.
        <TextLink href="/" label="This is a link" />
      </CardBody>
    </Card>
  </div>
);
