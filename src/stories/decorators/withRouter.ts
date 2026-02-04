import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Decorator para envolver componentes que usam Router
 * Permite que componentes com hooks de router funcionem no Storybook
 */
export const withRouter = (Story: any) =>
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(Story)
  );
