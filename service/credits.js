let ftable = document.createElement('table');
let ftbody = document.createElement('tbody');
let row = document.createElement('tr');
let cell0 = document.createElement('td');
let cell1 = document.createElement('td');
let cell2 = document.createElement('td');
let img0 = document.createElement('img');
let img1 = document.createElement('img');
let p = document.createElement('p');

img0.src = "service/QR_Youtube.png";
img0.className = "qr";
img1.src = "service/QR_Discord.png";
img1.className = "qr";
img1.align = "right";
p.className = "alert";
p.innerText = "Join community";

cell0.appendChild(img0);
cell1.appendChild(p);
cell2.appendChild(img1);
row.appendChild(cell0);
row.appendChild(cell1);
row.appendChild(cell2);
ftbody.appendChild(row);
ftable.appendChild(ftbody);
document.getElementById('footer').appendChild(ftable);
