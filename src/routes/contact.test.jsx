import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './contact';
import { getContact, updateContact } from '../contacts';
import { expect, test, vi } from 'vitest';

// Mock the contacts functions
vi.mock('../contacts', () => ({
  getContact: vi.fn(),
  updateContact: vi.fn(),
}));

test('Contact component renders and handles interactions', async () => {
  // Mock data
  const FAKE_CONTACT = {
    id: '123',
    first: 'John',
    last: 'Doe',
    avatar: '',
    twitter: 'johndoe',
    notes: 'Some notes here.',
    favorite: false,
  };

  // Mock implementations
  getContact.mockResolvedValueOnce(FAKE_CONTACT);
  updateContact.mockResolvedValueOnce({ ...FAKE_CONTACT, favorite: true });

  // Define routes with loaders and actions
  const routes = [
    {
      path: '/contact/:contactId',
      element: <Contact />,
      loader: contactLoader,
      action: contactAction,
    },
  ];

  // Create a router with initial entry pointing to the contact route
  const router = createMemoryRouter(routes, {
    initialEntries: ['/contact/123'],
  });

  // Render the component within the router context
  render(<RouterProvider router={router} />);

  // Wait for the component to render with the contact data
  await waitFor(() => screen);

  expect(screen.getByText('johndoe')).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
