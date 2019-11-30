import { customElement, html, LitElement, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import {MDCRipple} from '@material/ripple';

@customElement('mdc-button')
export class Button extends LitElement {
  @property({type: String})
  icon = '';

  @property({type: String})
  trailingIcon = '';

  @property({type: String})
  label = '';

  @property({type: String})
  classes  = '';

  @property({type: Boolean})
  unelevated = false

  @property({type: Boolean})
  outlined = false

  @property({type: Boolean})
  raised = false

  @query('.mdc-button')
  root: HTMLElement

  createRenderRoot() {
    return this;
  }

  get rootClasses() {
    return classMap({
      'mdc-button': true,
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      ...this.classes && {[this.classes]: true},
    });
  }

  getIconTemplate(icon) {
    if (!icon) {
      return null;
    }

    return html`<span aria-hidden="true" class="material-icons mdc-button__icon">${icon}</span>`;
  }

  firstUpdated() {
    MDCRipple.attachTo(this.root);
  }

  render() {
    return html`
      <button class=${this.rootClasses}>
        <div class="mdc-button__ripple"></div>
        ${this.getIconTemplate(this.icon)}
        <span class="mdc-button__label">${this.label}</span>
        ${this.getIconTemplate(this.trailingIcon)}
      </button>`;
  }
}
