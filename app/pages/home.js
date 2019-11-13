import { Page, html } from '@webformula/pax-core';

export default class Home extends Page {
  get title() {
    return 'Home';
  }

  isTokenExpired() {
    return window.authService && window.authService.isTokenExpired();
  }

  async makeRequest(button) {
    try {
      await axios.get('https://pax-test.free.beeceptor.com');
    } catch {}
    button.resolve();
    this.render();
  }

  template() {
    return html`
      <h2>Hello World</h2>

      <mdw-button onclick="activePage.render()" class="mdw-primary">Check token</mdw-button>
      ${this.isTokenExpired() ? '<span style="color: red"> Expired</span>' : '<span style="color: green"> Valid</span>'}

      <div></div>

      <mdw-button mdw-async onclick="activePage.makeRequest(this)" class="mdw-secondary">HTTP request</mdw-button>
      <span>Request will refresh expired tokens</span>
    `;
  }
};
