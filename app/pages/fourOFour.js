import { Page, html } from '@webformula/pax-core';

export default class FourOFour extends Page {
  get title() {
    return '404';
  }

  template() {
    return html`
      <h2>Page not found</h2>
    `;
  }
};
