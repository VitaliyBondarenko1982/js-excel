class Dom {
  constructor(selector) {
    // #app
    this.$nativeElement = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }

    return this.$nativeElement.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$nativeElement.textContent = text;
      return this;
    }

    if (this.$nativeElement.tagName.toLowerCase() === 'input') {
      return this.$nativeElement.value.trim();
    }

    return this.$nativeElement.textContent.trim();
  }

  clear() {
    this.html('');

    return this;
  }

  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  find(selector) {
    return $(this.$nativeElement.querySelector(selector));
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeElement;
    }

    if (Element.prototype.append) {
      this.$nativeElement.append(node);
    } else {
      this.$nativeElement.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$nativeElement.dataset;
  }

  closest(selector) {
    return $(this.$nativeElement.closest(selector));
  }

  getCoords() {
    return this.$nativeElement.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$nativeElement.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$nativeElement.style[key] = styles[key];
    });
  }

  cssClear(props) {
    props.forEach((prop) => this.$nativeElement.style.removeProperty(prop));
  }

  getStyles(styles = []) {
    return styles.reduce((result, style) => {
      result[style] = this.$nativeElement.style[style];
      return result;
    }, {});
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: Number(parsed[0]),
        col: Number(parsed[1]),
      };
    }
    return this.data.id;
  }

  focus() {
    this.$nativeElement.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$nativeElement.setAttribute(name, value);
      return this;
    }

    return this.$nativeElement.getAttribute(name);
  }

  addClass(className) {
    this.$nativeElement.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$nativeElement.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
