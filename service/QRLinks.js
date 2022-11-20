let counter = 0;

let timerid = setInterval(changeQR, 30000);

function changeQR() {
    let QR = document.getElementsByClassName("qr");
    for (let i = 0; i < QR.length; i++) {
        QR[i].hidden = true;
    }
    QR[counter].hidden = false;
    counter++;
    if (counter >= QR.length) counter = 0;
}