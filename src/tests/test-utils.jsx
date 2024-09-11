import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { router } from '../router';

const AllTheProviders = ({ children }) => {
  console.log(router);
  const testingRoute = createMemoryRouter(router, {
    initialEntries: ['/', '/contact', '/contact/123'],
    initialIndex: 1,
  });

  return <RouterProvider router={testingRoute}>{children}</RouterProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
