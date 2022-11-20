let counter = 0;
let pg = 
	["amogus.gif", 
	"amongParty.gif", 
	"bananaDance.gif", 
	"birbRave.gif", 
	"BLANKIES.webp", 
	"blobDance.webp", 
	"bongoTap.gif", 
	"BONK.gif", 
	"browsW.gif", 
	"catJAM.webp", 
	"clapW.gif", 
	"clappingW.gif", 
	"coolDoge.gif", 
	"dogeDance.gif",
	"drumTime.webp", 
	"duckPls.webp", 
	"EDM.webp", 
	"FeelsRainMan.gif", 
	"fluteJAM.gif", 
	"guitarTime.webp", 
	"headbangingW.gif", 
	"jammiesW.webp", 
	"KEKW.webp", 
	"marioDance.gif", 
	"catParty.gif", 
	"miyanoHype.gif", 
	"MYAAA.gif", 
	"NOPERS.gif", 
	"nyanPls.webp", 
	"parrotJAM.gif", 
	"partyKirby.gif", 
	"peepoArrive.webp", 
	"peepoBlanket.png", 
	"peepoBye.webp", 
	"peepoChat.webp", 
	"peepoClap.webp", 
	"peepoDj.webp", 
	"peepoShy.webp", 
	"pepeJAM.gif", 
	"pikachuS.png", 
	"PogU.webp", 
	"popCat.webp", 
	"pressF.png", 
	"pugPls.webp", 
	"rainbowPls.webp", 
	"ratJAM.webp", 
	"rickroll.gif", 
	"SadCatW.png", 
	"SadgeCry.webp", 
	"turtleHop.webp", 
	"turtleAngry.png", 
	"turtleCry.png", 
	"turtleDrip.png", 
	"turtleFlush.png", 
	"turtleHYPE.gif", 
	"turtleJAM.webp", 
	"turtlePop.gif", 
	"turtleShower.gif", 
	"turtleHi.png", 
	"turtleYo.gif", 
	"turtleShoe.gif", 
	"lightersUp.gif", 
	"lionDance.gif", 
	"widepeepoHappy.webp"];

let table = document.createElement('table');
let tbody = document.createElement('tbody');

table.appendChild(tbody);
document.getElementById('tb').appendChild(table);

for (let i = 0; i < pg.length; i+=10){
	let row = document.createElement('tr');
	for(let j = 0; j < 10; j++){
		if(i+j<pg.length){
			let fullname = pg[i+j];
			const arr = fullname.split('.');
			let name = arr[0];
			let cell = document.createElement('td');
			let div0 = document.createElement('div');
			div0.className = "polaroid";
			let img = document.createElement('img');
			img.src = "emotes/" + fullname;
			img.id = name + "_img";
			let div1 = document.createElement('div');
			div1.id = name + "_container";
			div1.className = "container";
			let p = document.createElement('p');
			p.innerText = name;
			let input = document.createElement('input');
			input.type = "text";
			input.value = name;
			input.id = name;
			input.hidden = true;
			div1.appendChild(input);
			div1.appendChild(p);
			div0.appendChild(img);
			div0.appendChild(div1);
			cell.appendChild(div0);
			row.appendChild(cell);
		}
	}
	tbody.appendChild(row);
}

for (let i = 0; i < pg.length; i++){
	let name = pg[i].split('.')[0];
	document.getElementById(name + "_container").addEventListener('click', () => {CopyName(name);}, false);
	document.getElementById(name + "_img").addEventListener('click', () => {CopyName(name);}, false);
}

let timerid = setInterval(changeQR, 30000);

function CopyName(id) {
  let copyText = document.getElementById(id);
  copyText.hidden = false;
  copyText.select();
  document.execCommand("copy");
  copyText.hidden = true;
}

function randomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min);
  return Math.round(rand);
}

function GetRandomEmote() {
  let idx = randomInt(0, pg.length);
  CopyName(pg[idx].split('.')[0]);
}

function changeQR() {
    let QR = document.getElementsByClassName("qr");
    for (let i = 0; i < QR.length; i++) {
        QR[i].hidden = true;
    }
    QR[counter].hidden = false;
    counter++;
    if (counter >= QR.length) counter = 0;
}