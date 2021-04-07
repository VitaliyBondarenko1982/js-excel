export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Method "getRood" should be implemented');
  }

  afterRender() {

  }

  destroy() {}
}
