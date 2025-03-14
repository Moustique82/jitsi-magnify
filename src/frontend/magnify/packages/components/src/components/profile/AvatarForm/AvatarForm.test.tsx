import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { AvatarForm } from './AvatarForm';

describe('AvatarForm', async () => {
  it(
    'should render the default avatar, and when a new one is loaded, it should ' +
      'display it as preview',
    async () => {
      const user = userEvent.setup();

      render(
        <QueryClientProvider client={new QueryClient()}>
          <IntlProvider locale="en">
            <AvatarForm id="123" src="test.jpg" />
          </IntlProvider>
        </QueryClientProvider>,
      );

      // Verify the default layout
      const uploadLabel = screen.getByText('Load new avatar');
      const avatarImage = await screen.findByTitle('Your avatar');
      expect(within(avatarImage).getByRole('presentation')).toHaveAttribute('src', 'test.jpg');

      // Import a new file
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });
      await act(() => {
        user.upload(uploadLabel.parentElement as HTMLElement, file);
      });

      // Verify the new layout: it should be a new save button, a new image, and a new remove button
      await screen.findByText('Save');
      await screen.findByLabelText('Remove avatar');
      expect(within(avatarImage).getByRole('presentation')).toHaveAttribute(
        'src',
        'data:image/png;base64,aGVsbG8=',
      );

      // Submit the avatar and verify the new avatar is saved
      await act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
    },
  );
});
