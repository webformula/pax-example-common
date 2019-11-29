import { Page, html } from '@webformula/pax-core';

export default class Building extends Page {
  get title() {
    return 'Building';
  }

  template() {
    return html`
      <h2>Build file</h2>
      <div class="mdw-subtitle" style="margin-top: -36px; margin-bottom: 36px;">A look at the build configuration for this application</div>

      <div mdw-column mdw-flex-position="top space-around">
        <mdw-card>
          <div class="mdw-card__content">
            <h6>Build file properties</h6>
          </div>


          <div class="mdw-card__content">
            <mdw-list class="mdw-two-line">
              <mdw-list-item>
                <div class="mdw-list-item__text">
                  <div class="mdw-list-item__primary-text"><b>rootFolder</b>: 'app'</div>
                  <div class="mdw-list-item__secondary-text">main app folder</div>
                </div>
              </mdw-list-item>

              <mdw-list-item>
                <div class="mdw-list-item__text">
                  <div class="mdw-list-item__primary-text"><b>pagesFolder</b>: 'pages'</div>
                  <div class="mdw-list-item__secondary-text">pages folder within root folder</div>
                </div>
              </mdw-list-item>

              <mdw-list-item>
                <div class="mdw-list-item__text">
                  <div class="mdw-list-item__primary-text"><b>layoutFilePath</b>: 'layout/index.js'</div>
                  <div class="mdw-list-item__secondary-text">layout file whithin root folder</div>
                </div>
              </mdw-list-item>

              <mdw-list-item>
                <div class="mdw-list-item__text">
                  <div class="mdw-list-item__primary-text"><b>distFolder</b>: 'build'</div>
                  <div class="mdw-list-item__secondary-text">distribution folder for build files</div>
                </div>
              </mdw-list-item>

              <mdw-list-item>
                <div class="mdw-list-item__text">
                  <div class="mdw-list-item__primary-text"><b>routerConfig</b>: { root: 'build', fourOFour: 'fourOFour' }</div>
                  <div class="mdw-list-item__secondary-text">define main routes</div>
                </div>
              </mdw-list-item>

              <mdw-list-item>
                <div class="mdw-list-item__text">
                  <div class="mdw-list-item__primary-text"><b>copyFiles</b>: [ { from: 'app/public/**', to: 'build/' } ]</div>
                  <div class="mdw-list-item__secondary-text">copy files from one folder to another. you can use wild card syntax (app/public/**/*.js)</div>
                </div>
              </mdw-list-item>
            </mdw-list>
          </div>
        </mdw-card>
      </div>
    `;
  }
}
