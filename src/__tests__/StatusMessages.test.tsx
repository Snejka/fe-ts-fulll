import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusMessages from '../components/StatusMessages';

describe('StatusMessages', () => {
  it('renders loading message when loading is true', () => {
    render(<StatusMessages loading={true} error="" usersCount={0} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error is present', () => {
    const errorText = 'Something went wrong';
    render(<StatusMessages loading={false} error={errorText} usersCount={0} />);
    const errorElement = screen.getByText(errorText);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('error');
  });

  it('renders empty users message when usersCount is zero and no loading/error', () => {
    render(<StatusMessages loading={false} error="" usersCount={0} />);
    const emptyMsg = screen.getByText('Make a search to show users');
    expect(emptyMsg).toBeInTheDocument();
    expect(emptyMsg).toHaveClass('error');
  });

  it('renders nothing when users exist and no loading or error', () => {
    const { container } = render(<StatusMessages loading={false} error="" usersCount={5} />);
    expect(container).toBeEmptyDOMElement();
  });
});
