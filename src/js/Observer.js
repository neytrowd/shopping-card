export class Observer {
   constructor() {
      this.listeners = {};
   }

   notify(eventType, ...args) {
      if (!Array.isArray(this.listeners[eventType])) {
         return false;
      }
      this.listeners[eventType].forEach(listener => {
         listener(...args);
      });
   }

   subscribe(eventType, fn) {
      this.listeners[eventType] = this.listeners[eventType] || [];
      this.listeners[eventType].push(fn);
   }

   unsubscribe(eventType, fn) {
      this.listeners[eventType] =
         this.listeners[eventType].filter(listener => listener != fn);
   }
}


