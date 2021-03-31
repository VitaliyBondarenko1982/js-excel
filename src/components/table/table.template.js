const CODES = {
  A: 65,
  Z: 90,
};

const toCell = (row, col) => {
  return `
    <div
      class="cell"
      contenteditable
      data-type="cell"
      data-col="${col}"
      data-id="${row}:${col}"
    ></div>
  `;
};

const toColumn = (col, index) => {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
};

const createRow = (content, index = '') => {
  const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${resizer}
      </div>  
      <div class="row-data">${content}</div>
    </div>
  `;
};

const toChar = (_, index) => {
  return String.fromCharCode(CODES.A + index);
};

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  const rows = [];

  rows.push(createRow(cols));

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill(row)
        .map(toCell)
        .join('');
    rows.push(createRow(cells, row));
  }

  return rows.join('');
};
