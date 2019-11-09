import { Page, html } from '@webformula/pax-core';

export default class Home extends Page {

  get title() {
    return 'Home';
  }

  async makeRequest(button) {
    try {
      await axios.get('https://pax-test.free.beeceptor.com');
    } catch {}
    button.resolve();
  }

  template() {
    return html`
      <h2>Hello World</h2>

      <mdw-button mdw-async onclick="$Home.makeRequest(this)" class="mdw-primary">HTTP request</mdw-button>
      <span>Request will refresh expired tokens</span>
    `;
  }
};
