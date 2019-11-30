import { html, render } from 'lit-html';
import '../../components/button';
import '../../components/checkbox';
import '../../components/chip';
import '../../components/icon-button';
import '../../components/text-field';
import './index.scss';

const app = () => {
  return html`
    <mdc-button
      label="Add to cart"
      unelevated="true"
      icon="add_to_cart"
    >
    </mdc-button>

    <br><br>

    <mdc-checkbox label="Checkbox"></mdc-checkbox>

    <br><br>

    <mdc-icon-button icon="favorite"></mdc-icon-button>

    <br><br>

    <mdc-text-field label="Full name" outlined="true" icon="account_circle"></mdc-text-field>

    <br><br>

    <mdc-chip label="Top Rated" icon="check"></mdc-checkbox>

    <br><br>
  `;
};

render(app(), document.querySelector('.app'));
