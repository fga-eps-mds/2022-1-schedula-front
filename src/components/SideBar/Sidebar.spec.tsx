import { render } from '@testing-library/react';

import { routes } from '@routes';

import { SideBar } from './index';

describe('SideBar', () => {
  it('should render into the document', () => {
    render(<SideBar />);
  });

  it('should render the logo name', () => {
    const { getByText } = render(<SideBar />);

    expect(getByText('Schedula')).toBeInTheDocument();
  });

  it('should render all routes', () => {
    const { getByText } = render(<SideBar />);

    routes.forEach((route) => {
      expect(getByText(route.label)).toBeInTheDocument();
    });
  });

  it('should render an icon for each route', () => {
    const { getByText } = render(<SideBar />);

    routes.forEach((route) => {
      expect(getByText(route.label).firstElementChild?.tagName).toBe(
        'svg' || 'img'
      );
    });
  });
});
