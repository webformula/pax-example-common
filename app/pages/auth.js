import { Page, html } from '@webformula/pax-core';
import authService from '../auth-service.js';

export default class Auth extends Page {
  constructor() {
    super();
    this.bound_setPercent = this.setPercent.bind(this);
  }

  get title() {
    return 'Auth playground';
  }

  connectedCallback() {
    this.setPercent();
    this.interval = setInterval(this.bound_setPercent, 1000);
  }

  disconnectedCallback() {
    if (this.interval) clearInterval(this.interval);
  }

  setPercent() {
    const expProgressText = document.querySelector('#minute-text');
    const experationSeconds = authService.experationSeconds;
    const percent = parseInt((this.getSecondsLeft() / experationSeconds) * 100);
    document.querySelector('#exp-progress').setAttribute('value', percent);
    expProgressText.innerText = `${this.getSecondsLeft()} s`;

    if (percent > 60) {
      expProgressText.style.color = 'green';
    } else if (percent > 30) {
      expProgressText.style.color = 'rgb(150, 113, 2)';
    } else {
      expProgressText.style.color = 'red';
    }
  }

  async makeRequest(button) {
    try {
      await axios.get('https://pax-test.free.beeceptor.com');
    } catch { }
    button.resolve();
    this.render();
  }

  getTokenData() {
    return authService.decodeToken(authService.token);
  }

  getSecondsLeft() {
    const now = Date.now();
    const { exp } = this.getTokenData();
    const secs = parseInt((exp - now) / 1000);
    return secs > 0 ? secs : 0;
  }

  resetToken() {
    authService.experationMinutes = document.querySelector('#minutes-field').value;
    authService.token = authService.generateToken(this.getTokenData().email);
    this.render();
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Auth playground</h3>

        <mdw-card>
          <div class="mdw-card__content">
            <h6>Token information</h6>
          </div>

          <div class="mdw-card__content" mdw-row mdw-flex-position="center center">
            <div style="position: absolute; color: #BBB; font-size: 20px; margin-top: -14px;">Expires in</div>
            <div id="minute-text" style="position: absolute; color: green; font-size: 28px; margin-top: 14px;">${this.getSecondsLeft()} s</div>
            <mdw-circular-progress id="exp-progress" value="100" mdw-diameter="150" class="mdw-grey"></mdw-circular-progress>
          </div>

          <div class="mdw-card__content" mdw-row mdw-flex-position="center center">
            <mdw-textfield style="width: 148px;">
              <input id="minutes-field" type="number" value="${authService.experationMinutes}">
              <label>Experation in minutes</label>
            </mdw-textfield>
            <span style="width: 20px;"></span>
            <mdw-button class="mdw-secondary" onclick="activePage.resetToken();">Update token</mdw-button>
          </div>

          <div class="mdw-card__content">
            <mdw-textfield>
              <input value="${this.getTokenData().email}" disabled>
              <label>Email</label>
            </mdw-textfield>

            <mdw-textfield>
              <input value="${new Date(this.getTokenData().iat).toLocaleString()}" disabled>
              <label>iat (issued at)</label>
            </mdw-textfield>

            <mdw-textfield>
              <input value="${new Date(this.getTokenData().exp).toLocaleString()}" disabled>
              <label>exp (experation)</label>
            </mdw-textfield>
          </div>

          <div class="mdw-card__actions" style="padding: 16px;">
            <mdw-button mdw-async onclick="activePage.makeRequest(this)" class="mdw-primary">Simulate http call (this will refresh expired token)</mdw-button>
         </div>
        </mdw-card>
      </article>
    `;
  }
};
