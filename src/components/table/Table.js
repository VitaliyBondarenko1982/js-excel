import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import * as actions from '../../redux/actions';
import {defaultStyles, listeners} from '../../core/constants';
import {parse} from '../../core/parse';

const {mousedown, input, keydown} = listeners;

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: [mousedown, input, keydown],
      ...options,
    });
  }

  toHtml() {
    return createTable(1000, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:1"]');
    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      console.log({text});
      this.selection.current
          .attr('data-value', text)
          .text(parse(text));
      this.updateTextInStore(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds,
      }));
    });

    // this.$subscribe((state) => {
    //   console.log('TableState', state);
    // });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"`));

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const {col, row} = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, col, row));
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
