let counter = 0;
let timerid = setInterval(changeQR, 30000);
let arr = 
	["QR_Discord.png",
	"QR_Youtube.png"];

let div = document.getElementById("qr_div");
for (int i = 0; i < arr.length; i++) {
	let img = document.createElement("img");
	img.className = "qr";
	img.hidden = true;
	img.src = "service/" + arr[i];
	div.appendChild(img);
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