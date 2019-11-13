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


      <div mdw-row mdw-wrap mdw-flex-position="top space-around">
        <mdw-card style="max-width: 400px;">
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

        <mdw-card style="max-width: 400px; margin-top: 0;">
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
