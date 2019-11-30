import { customElement, html, LitElement, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import {MDCRipple} from '@material/ripple';

@customElement('mdc-icon-button')
export class IconButton extends LitElement {
  @property({type: String})
  icon = '';

  @property({type: String})
  ariaLabel = '';

  @query('.mdc-icon-button')
  root: HTMLElement;

  private ripple: MDCRipple;

  get rootClasses() {
    return classMap({
      'mdc-icon-button': true,
      'material-icons': true,
    });
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const ripple = MDCRipple.attachTo(this.root);
    ripple.unbounded = true;
  }

  render() {
    return html`
      <button class=${this.rootClasses}} aria-label=${this.ariaLabel}>
        ${this.icon}
      </button>`;
  }
}
