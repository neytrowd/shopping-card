class Dom {
   constructor(selector) {
      this.$el = typeof selector == 'string' ? document.querySelector(selector) : selector;
   }
   getAttr(type) {
      return this.$el.getAttribute(type);
   }
   setAttr(type, value) {
      return this.$el.setAttribute(type, value);
   }
   on(eventType, callback, options = {}) {
      this.$el.addEventListener(eventType, callback, options);
   }
   closest(selector) {
      return this.$el.closest(selector);
   }
   add() {
      throw new Error('Method add is not implemented');
   }
   append() {
      throw new Error('Method append is not implemented');
   }
   clear() {
      throw new Error('Method clear is not implemented');
   }
   content() {
      throw new Error('Method content is not implemented');
   }
}

class DomInput extends Dom {
   constructor(selector) {
      super(selector);
   }
   clear() {
      this.$el.value = '';
      return this;
   }
   add(content) {
      this.$el.value += content;
      return this;
   }
   content(str) {
      if (typeof str == 'string') {
         this.$el.value = str;
         return this;
      }
      return this.$el.value;
   }
}

class DomNode extends Dom {
   constructor(selector) {
      super(selector);
   }
   add(content) {
      this.$el.innerHTML += content;
      return this;
   }
   append(item) {
      this.$el.append(item);
      return this;
   }
   clear() {
      this.$el.innerHTML = '';
      return this;
   }
   content(str) {
      if (str != null) {
         this.$el.innerHTML = str;
         return this;
      }
      return this.$el.innerHTML;
   }
}

export function $(selector) {
   return new DomNode(selector);
}

export function $input(selector) {
   return new DomInput(selector);
}

$.create = (tag, className = '', content = '') => {
   let item = document.createElement(tag);
   if (className) {
      item.classList.add(className);
   }
   if (content) {
      item.innerHTML = content;
   }
   return item;
};
