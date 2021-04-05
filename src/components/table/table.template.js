import {charCodes, defaultStyles, excelConfig} from '../../core/constants';
import {toInlineStyles} from '../../core/utils';

const getWidth = (state, index) => {
  return `${state[index + 1] || excelConfig.DEFAULT_WIDTH}px`;
};

const getHeight = (state, index) => {
  return `${state[index] || excelConfig.DEFAULT_HEIGHT}px`;
};

const toCell = (state, row) => {
  return (_, index) => {
    const width = getWidth(state.colState, index);
    const col = index + 1;
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
      <div
        class="cell"
        contenteditable
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        style="${styles}; width: ${width}"
      >${data || ''}</div>
    `;
  };
};

const toColumn = ({col, index, width}) => {
  return `
    <div 
      class="column"
      data-type="resizable"
      data-col="${index + 1}"
      style="width: ${width}"
    >  
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
};

const createRow = (content, index = '', state = {}) => {
  const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  const height = getHeight(state, index);
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}"
      style="height: ${height}"
     >
      <div class="row-info">
        ${index}
        ${resizer}
      </div>  
      <div class="row-data">${content}</div>
    </div>
  `;
};

const toChar = (_, index) => {
  return String.fromCharCode(charCodes.A + index);
};

const withWidthFrom = (state) => {
  return (col, index) => {
    return {
      col,
      index,
      width: getWidth(state, index),
    };
  };
};

export const createTable = (rowsCount = 15, state = {}) => {
  console.log(state);
  const colsCount = charCodes.Z - charCodes.A + 1;
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('');

  const rows = [];

  rows.push(createRow(cols));

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(cells, row, state.rowState));
  }

  return rows.join('');
};
