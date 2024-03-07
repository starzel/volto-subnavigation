import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import SubnavigationView from './View';

const mockStore = configureStore();

describe('Breadcrumbs', () => {
  it('renders a breadcrumbs component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const props = {
      data: {
        depth: 2,
        title: 'Subnavigation',
      },
    };
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <SubnavigationView {...props} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
