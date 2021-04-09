export class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }

  getRoot() {
    throw new Error('Method "getRood" should be implemented');
  }

  afterRender() {

  }

  destroy() {}
}
