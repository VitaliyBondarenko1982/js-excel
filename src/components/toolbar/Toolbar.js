import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';
import {defaultStyles, listeners} from '../../core/constants';
const {click} = listeners;

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: [click],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHtml() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);

      this.setState(value);
    }
  }
}
