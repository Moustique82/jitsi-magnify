import { fireEvent, render, screen } from '@testing-library/react';
import { Grommet } from 'grommet';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { customTheme } from '../../../themes';
import { Toggle, ToggleProps } from './Toggle';

function StatefullToggle(props: ToggleProps) {
  const [checked, setChecked] = React.useState(false);
  return <Toggle {...props} checked={checked} onChange={() => setChecked(() => !checked)} />;
}

describe('Toggle', () => {
  it('should render as a checkbox', () => {
    render(
      <Grommet>
        <IntlProvider locale="en">
          <Toggle label="This is a toggle" title="My toggle" />
        </IntlProvider>
      </Grommet>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should change its value on click', () => {
    render(
      <Grommet theme={customTheme}>
        <IntlProvider locale="en">
          <StatefullToggle label="This is a toggle" title="My toggle" />
        </IntlProvider>
      </Grommet>,
    );
    const toggle = screen.getByTitle('My toggle');
    expect(toggle).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });
});
