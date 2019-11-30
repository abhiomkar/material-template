import { customElement, html, LitElement, property, query } from 'lit-element';
import {MDCTextField} from '@material/textfield';
import { classMap } from 'lit-html/directives/class-map';
import { getId } from '../common/util';

@customElement('mdc-text-field')
export class TextField extends LitElement {
  @property({type: String})
  label = '';

  @property({type: String})
  placeholder  = '';

  @property({type: String})
  classes  = '';

  @property({type: String})
  icon  = '';

  @property({type: String})
  trailingIcon  = '';

  @property({type: String})
  value  = '';

  @property({type: String})
  ariaLabel = '';

  @property({type: Boolean})
  outlined = false;

  @property({type: String})
  helperText = '';

  @property({type: Number})
  maxLength: number;

  @query('.mdc-text-field')
  root: HTMLElement;

  private labelId = getId();

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    MDCTextField.attachTo(this.root);
  }

  get inputTemplate() {
    return html`<input
      type="text"
      class="mdc-text-field__input"
      id=${this.labelId}
      aria-label=${this.ariaLabel || null}
      placeholder=${this.placeholder || ''}
      maxlength=${this.maxLength || ''}
      .value=${this.value || ''}
      />`
  }

  get rootClasses() {
    return classMap(Object.assign({}, {
      'mdc-text-field': true,
      'mdc-text-field--default': !this.outlined,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--with-leading-icon': !!this.icon,
      'mdc-text-field--with-trailing-icon': !!this.trailingIcon,
      'mdc-text-field--no-label': !this.label,
      ...this.classes && {[this.classes]: true},
    }));
  }

  get floatingLabelClasses() {
    return classMap({
      'mdc-floating-label': true,
      'mdc-floating-label--float-above': !!this.value,
    });
  }

  get notchedOutlineClasses() {
    return classMap({
      'mdc-notched-outline': true,
      'mdc-notched-outline--notched': !!this.value,
    });
  }

  get helperLineTemplate() {
    if (!(this.helperText || this.maxLength)) {
      return null;
    }

    return html`
      <div class="mdc-text-field-helper-line">
        <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">${this.helperText}</div>
        ${this.characterCounterTemplate}
      </div>`;
  }

  get characterCounterTemplate() {
    if (!this.maxLength) {
      return null;
    }
    const length = this.value ? this.value.length : 0;
    const counter = `${length} / ${this.maxLength}`;

    return html`<div class="mdc-text-field-character-counter">${counter}</div>`;
  }

  getIconTemplate(icon, isButton = false) {
    if (!icon) {
      return null;
    }

    return html`<span
      class="material-icons mdc-text-field__icon"
      tabindex=${isButton ? 0 : null}
      role=${isButton ? 'button' : null}>
        ${icon}
      </span>`;
  };

  get labelTemplate() {
    return html`<label class=${this.floatingLabelClasses}>${this.label}</label>`;
  }

  get outlinedTemplate() {
    return html`
    <div class="mdc-text-field-container">
      <div class=${this.rootClasses}>
        ${this.getIconTemplate(this.icon)}
        ${this.inputTemplate}
        ${this.getIconTemplate(this.trailingIcon)}
        <div class=${this.notchedOutlineClasses}>
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            ${this.label ? this.labelTemplate : null}
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>
      ${this.helperLineTemplate}
    </div>`
  }

  get filledTemplate() {
    return html`
    <div class="mdc-text-field-container">
      <div class=${this.rootClasses}>
        ${this.getIconTemplate(this.icon)}
        ${this.inputTemplate}
        ${this.label ? this.labelTemplate : null}
        ${this.getIconTemplate(this.trailingIcon)}
        <div class="mdc-line-ripple"></div>
      </div>
      ${this.helperLineTemplate}
    </div>`;
  }

  render() {
    if (this.outlined) {
      return this.outlinedTemplate;
    } else {
      return this.filledTemplate;
    }
  }
}
