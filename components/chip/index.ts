import { customElement, html, LitElement, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

@customElement('mdc-chip')
export class Chip extends LitElement {
  @property({type: String})
  icon = '';

  @property({type: String})
  trailingIcon = '';

  @property({type: String})
  label = '';

  @query('.mdc-chip')
  root: HTMLElement

  get rootClasses() {
    return classMap({
      'mdc-chip': true,
    });
  }

  createRenderRoot() {
    return this;
  }

  getIconTemplate(icon) {
    if (!icon) {
      return null;
    }

    return html`<span class="material-icons mdc-chip__icon mdc-chip__icon--leading">${icon}</span>`;
  }

  getTrailingIconTemplate() {
    if (!this.trailingIcon) {
      return null;
    }

    return html`
    <span role="gridcell">
      <span class="material-icons mdc-chip__icon mdc-chip__icon--trailing" tabindex="-1" role="button">
        ${this.trailingIcon}
      </span>
    </span>
    `;
  }

  render() {
    return html`
    <div class=${this.rootClasses} role="row">
      <div class="mdc-chip__ripple"></div>
      ${this.getIconTemplate(this.icon)}
      <span role="gridcell">
        <span role="button" tabindex="0" class="mdc-chip__text">${this.label}</span>
      </span>
      ${this.getTrailingIconTemplate()}
    </div>`;
  }
}
