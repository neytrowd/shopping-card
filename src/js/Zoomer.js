export function zoom(block) {
   let img = block.querySelector('img');
   let lens = document.createElement('div');
   let result = document.querySelector('.zoom__result');
   lens.setAttribute('class', 'zoom__lens');
   block.append(lens);

   let lensWidth = 70;
   let lensHeight = 70;
   let resultWidth = 500;
   let resultHeight = 500;

   let dimensionX = resultWidth / lensWidth;
   let dimensionY = resultHeight / lensHeight;

   result.style.cssText = `
      background: url(${img.src});
      background-size: ${570 * dimensionX}px ${710 * dimensionY}px;`;

   img.addEventListener('mousemove', move);
   lens.addEventListener('mousemove', move);

   function move(event) {
      let pos, posX, posY;
      pos = getCurPos(event);
      posX = pos.x - lensWidth / 2;
      posY = pos.y - lensHeight / 2;

      if (posX > 570 - lensWidth) {
         posX = 570 - lensWidth;
      }
      if (posY > 710 - lensHeight) {
         posY = 710 - lensHeight;
      }
      if (posX < 0) posX = 0;
      if (posY < 0) posY = 0;

      lens.style.left = `${posX}px`;
      lens.style.top = `${posY}px`;
      result.style.backgroundPosition = `
         -${posX * dimensionX}px -${posY * dimensionY}px`;
   }

   function getCurPos(event) {
      let pos = img.getBoundingClientRect();
      let x = event.pageX - pos.left - window.pageXOffset;
      let y = event.pageY - pos.top - window.pageYOffset;
      return { x, y };
   }
}

