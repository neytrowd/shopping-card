export class Mask {
   constructor(input) {
      this.input = document.querySelector(`${input}`);
      this.init();
   }

   init() {
      this.input.addEventListener('input', this.format.bind(this, this.input));
   }

   format(element) {
      element.value = this.mask(element);
   }

   mask(element) {
      let value;
      let result;
      let number;
      let step = 0;
      let data = element.value;
      let temp = element.placeholder;
      let symbol = temp.replace(/[-+()\s\d]/g, '')[0];

      if (data.length > temp.length) {
         data = data.substring(0, data.length - 1);
      }

      value = data.replace(/\D/g, '');
      number = temp.replace(/\D/g, '');

      if (number.length >= value.length) {
         value = number;
      }

      result = temp = temp.replace(/[*\d]/g, () => {
         return value.charAt(step++) || '*';
      });

      step = this.step(element, temp, value);
      this.setCursorPosition(element, step);

      return result;
   }

   step(element, temp, value) {
      let step = temp.lastIndexOf(value.substr(-1));

      if (step < temp.length) {
         if (temp != element.placeholder) step++;
         else step = temp.indexOf('*');
      }

      return step;
   }

   setCursorPosition(element, pos) {
      window.setTimeout(function () {
         element.setSelectionRange(pos, pos);
      }, 0);
   }

}