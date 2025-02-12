import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('Login Component', () => {
  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('displays error message on invalid credentials', async () => {
    mock.onPost('/api/auth/login').reply(400, { msg: 'Invalid credentials' });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('redirects to profile on successful login', async () => {
    mock.onPost('/api/auth/login').reply(200, { token: 'fake-jwt-token' });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'correctpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(window.location.href).toBe('/profile');
  });
});
