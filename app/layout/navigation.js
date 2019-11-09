import { html } from '@webformula/pax-core';

export default function () {
  return html`
    <mdw-drawer class="navigation mdw-locked-open">
      <mdw-drawer-fixed>
        <mdw-drawer-header>
          <div class="mdw-title">PAX</div>
          <div class="mdw-subtitle">Example with auth</div>
        </mdw-drawer-header>

        <mdw-drawer-content>
          <mdw-list>
            <mdw-list-item href="#/home" href-alt="#/">
              <span class="mdw-list-item__graphic material-icons">inbox</span>
              Home
            </mdw-list-item>

            <mdw-list-item href="#/ddd">
              <span class="mdw-list-item__graphic material-icons">star</span>
              Non existing
            </mdw-list-item>
          </mdw-list>
        </mdw-drawer-content>
      </mdw-drawer-fixed>
    </mdw-drawer>
  `;
}
