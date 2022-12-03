// JS Entry File
console.log('Hello');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
// canvas.width = 1200;
// canvas.height = 800;
ctx.fillRect(0,0,canvas.width, canvas.height);

const map = new Image();
map.src = '../img/tilemap2_rough.png';
//map.onload or window.onload? Use window.onload if u want to load with window, when map loads
map.onload = function() { //map png in window on canvas when map loads
  ctx.drawImage(map, -1000, -700);
}
console.log(map)
