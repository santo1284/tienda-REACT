import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // The default test looks for "learn react", which is not in our app.
  // Let's look for something that IS in our app, like the footer text.
  const footerElement = screen.getByText(/© 2025 Mi Moto del Pueblo. Todos los derechos reservados./i);
  expect(footerElement).toBeInTheDocument();
});
