import { Page, html } from '@webformula/pax-core';
import authService from '../auth-service.js';

export default class Login extends Page {
  constructor() {
    super();

    // hide everthing except for page cvontent
    // This will help block the user from cliking on the navigation
    this.displayPageContentOnly();
  }

  get title() {
    return 'Login';
  }

  get emailInput() {
    return document.querySelector('#email');
  }

  get passwordInput() {
    return document.querySelector('#password');
  }

  get loginButton() {
    return document.querySelector('#login');
  }


  async login() {
    if (this.loginButton.pending) return;
    if (!this.emailInput.parentNode.valid || !this.passwordInput.parentNode.valid) {
      setTimeout(() => {
        this.loginButton.resolve();
      }, 0);
      return;
    }

    try {
      await authService.login(this.emailInput.value, this.passwordInput.value);
      // check if we have a route that was interupted by auth and redirect to it
      // else redirect to home
      console.log(authService.redirectTo);
      if (authService.redirectTo && authService.redirectTo !== '/login') location.hash = authService.redirectTo;
      else location.hash = '/';
    } catch (e) {
      setTimeout(() => {
        this.loginButton.resolve();
      }, 0);
      // do somthing
    }
  }

  register() {
    MDWDialog.show({
      title: 'Register',
      message: 'There is no registration, this is fake. Enter any email and password',
      okLabel: 'ok',
    });
  }


  template() {
    return html`
      <article class="mdw-panel--container">
        <mdw-card style="width: 260px; margin: 0 auto;">
          <div class="mdw-card__content">
            <h6>Welcome</h6>
            <div class="mdw-subtitle">Login (valid for 1 minute)</div>

            <mdw-icon style="font-size: 102px; align-self: center;">security</mdw-icon>
          </div>

          <div class="mdw-card__content">
            <mdw-textfield>
              <label>Email</label>
              <input id="email" required>

              <mdw-textfield-helper>
                <mdw-helper-text validation>Required (enter anything)</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>

            <mdw-textfield style="margin-top: 24px; margin-bottom: 42px">
              <label>Password</label>
              <input id="password" type="password" required>

              <mdw-textfield-helper>
                <mdw-helper-text validation>Required (enter anything)</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>
          </div>

          <div class="mdw-card__actions" style="justify-content: space-around;">
            <mdw-button id="login" mdw-async class="mdw-raised mdw-primary" onclick="activePage.login()">Login</mdw-button>
            <mdw-button onclick="activePage.register()">Register</mdw-button>
          </div>
        </mdw-card>
      </article>
    `;
  }
};
