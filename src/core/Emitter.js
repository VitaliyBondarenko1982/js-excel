export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event]
          .filter((listener) => listener !== fn);
    };
  }
}


// example
// const emitter = new Emitter();
//
// const unsubscribe = emitter
//     .subscribe('vitalii', (data) => console.log('Sub', data));
// emitter.emit('vitalii', 42);
//
// setTimeout(() => {
//   emitter.emit('vitalii', 'After 2 seconds');
// }, 2000);
//
// setTimeout(() => {
//   unsubscribe();
// }, 3000);
//
// setTimeout(() => {
//   emitter.emit('vitalii', 'After 4 seconds');
// }, 4000);
