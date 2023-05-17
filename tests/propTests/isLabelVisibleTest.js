import { within } from '@testing-library/react';

export const isLabelVisibleTest = (HtmlTag = 'label') => (
  [
    [
      {
        id: 'id',
        isLabelVisible: true,
      },
      (rootElement) => {
        if (HtmlTag === 'legend') {
          expect(within(rootElement).getByTestId('id__displayLabel')).not.toHaveClass('isLabelHidden');
        } else {
          expect(within(rootElement).getByText('label')).not.toHaveClass('isLabelHidden');
        }
      },
    ],
    [
      {
        id: 'id',
        isLabelVisible: false,
      },
      (rootElement) => {
        if (HtmlTag === 'legend') {
          expect(within(rootElement).getByTestId('id__displayLabel')).toHaveClass('isLabelHidden');
        } else {
          expect(within(rootElement).getByText('label')).toHaveClass('isLabelHidden');
        }
      },
    ],
  ]
);
