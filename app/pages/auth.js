import { Page, html } from '@webformula/pax-core';

export default class Auth extends Page {
  get title() {
    return 'Auth playground';
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
      <article class="page-article">
        <h3>Auth playground</h3>

        <mdw-card id="contained">
          <div class="mdw-card__content">
            <h6>Contained button</h6>
            <div class="description">Contained buttons have more emphasis, as they use use a color fill and shadow</div>
          </div>
        </mdw-card>

        <a href="https://material.io/design/components/buttons.html" target="_new">Material Design Guidlines: Buttons</a>
        <p>Buttons allow users to take actions, and make choices, with a single tap</p>
      </article>
    `;
  }
};
