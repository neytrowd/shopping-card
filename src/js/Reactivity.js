let activeEffect;

class Dependency {
   constructor() {
      this.subscribers = new Set();
   }
   depend() {
      if (activeEffect) {
         this.subscribers.add(activeEffect);
      }
   }
   notify() {
      this.subscribers.forEach(subscriber => subscriber());
   }
}

export function reactive(obj) {
   Object.keys(obj).forEach(key => {
      let internalValue = obj[key];
      let dep = new Dependency();

      Object.defineProperty(obj, key, {
         get() {
            dep.depend();
            return internalValue;
         },
         set(value) {
            if (value !== internalValue) {
               internalValue = value;
               dep.notify();
            }
         }
      });
   });

   return obj;
}

export function watchEffect(func) {
   activeEffect = func;
   func();
   activeEffect = null;
}