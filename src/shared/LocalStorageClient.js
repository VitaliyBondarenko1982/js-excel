import {storage, storageName} from '../core/utils';

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject();
  }

  get() {
    return new Promise((resolve) => {
      const state = storage(this.name);

      setTimeout(() => {
        resolve(state);
      }, 1000);
    });
  }
}
