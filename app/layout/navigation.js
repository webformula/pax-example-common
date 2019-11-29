import { html } from '@webformula/pax-core';

export default function () {
  return html`
    <mdw-drawer class="navigation mdw-white mdw-locked-open">
      <mdw-drawer-fixed>
        <mdw-drawer-header>
          <div class="mdw-title">PAX</div>
          <div class="mdw-subtitle">Common example with JWT auth</div>
        </mdw-drawer-header>

        <mdw-drawer-content>
          <mdw-list>
            <mdw-list-item href="#/home" href-alt="#/">
              <span class="mdw-list-item__graphic material-icons">home</span>
              Home
            </mdw-list-item>

            <mdw-list-item href="#/auth">
              <mdw-icon>security</mdw-icon>
              Auth playground
            </mdw-list-item>

            <mdw-list-item href="#/building">
              <mdw-icon>build</mdw-icon>
              App build
            </mdw-list-item>
          </mdw-list>
        </mdw-drawer-content>
      </mdw-drawer-fixed>
    </mdw-drawer>
  `;
}
