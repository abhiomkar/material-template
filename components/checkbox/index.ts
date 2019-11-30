import { customElement, html, LitElement, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { getId } from '../common/util';
import {MDCCheckbox} from '@material/checkbox';

@customElement('mdc-checkbox')
export class Checkbox extends LitElement {
  private labelId = getId();
  private checkbox!: MDCCheckbox;

  @property({type: String})
  label = '';

  @property({type: String})
  name = '';

  @property({type: Boolean})
  checked = false;

  @property({type: Boolean})
  indeterminate = false;

  @query('.mdc-checkbox')
  root: HTMLElement;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.checkbox = MDCCheckbox.attachTo(this.root);
    this.checkbox.indeterminate = this.indeterminate;
  }

  get rootClasses() {
    return classMap({
      'mdc-checkbox': true,
      'mdc-checkbox--selected': this.checked,
    })
  }

  get labelTemplate() {
    if (!this.label) {
      return null;
    }

    return html`<label for=${this.labelId}>${this.label}</label>`;
  }

  render() {
    return html`
    <div class="mdc-form-field">
      <div class=${this.rootClasses}>
        <input type="checkbox" id=${this.labelId}
              class="mdc-checkbox__native-control" ?checked=${this.checked} />
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark"
              viewbox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
        <div class="mdc-checkbox__ripple"></div>
      </div>
      ${this.labelTemplate}
    </div>
      `;
  }
}
