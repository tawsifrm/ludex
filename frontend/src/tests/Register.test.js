import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('Register Component', () => {
  it('renders registration form', () => {
    render(<Register />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('displays error message on registration failure', async () => {
    mock.onPost('/api/auth/register').reply(400, { msg: 'Registration failed' });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/registration failed/i)).toBeInTheDocument();
  });

  it('redirects to profile on successful registration', async () => {
    mock.onPost('/api/auth/register').reply(200, { token: 'fake-jwt-token' });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(window.location.href).toBe('/profile');
  });
});
