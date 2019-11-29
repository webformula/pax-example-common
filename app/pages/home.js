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
      <h2>Welcome</h2>
      <div class="mdw-subtitle" style="margin-top: -36px; margin-bottom: 36px;">Welcome to the common example sjowing you how to use PAX-core mixed with PAX-components. This example show you how to build a simple application with JWT authentication.</div>


      <div mdw-column mdw-flex-position="top space-around">
        <mdw-card>
          <div class="mdw-card__content">
            <h6>Verify token</h6>
            <div class="mdw-subtitle">Check if the token has expired. Token is valid for 1 minute</div>
          </div>

          <div class="mdw-card__content">
            ${
              this.isTokenExpired()
              ? '<span style="color: red"> Expired</span>'
              : '<span style="color: green"> Valid</span>'
            }
          </div>

          <div class="mdw-card__actions" style="padding: 8px;">
            <mdw-button onclick="activePage.render()" class="mdw-primary">Check token</mdw-button>
          </div>
        </mdw-card>

        <mdw-card>
          <div class="mdw-card__content">
            <h6>Refresh token</h6>
            <div class="mdw-subtitle">This will make an http request that will verify and refresh the token using a common jwt refresh strategy</div>
          </div>

          <div class="mdw-card__actions" style="padding: 8px;">
            <mdw-button mdw-async onclick="activePage.makeRequest(this)" class="mdw-primary">HTTP request</mdw-button>
          </div>
        </mdw-card>
      </div>
    `;
  }
};
