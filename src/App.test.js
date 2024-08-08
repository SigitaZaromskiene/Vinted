import { render, screen } from '@testing-library/react';
import App from './App';


test('renders img list', async () => {
    render(<App/>);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });