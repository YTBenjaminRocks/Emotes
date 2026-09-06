// Lädt die JSON-Datenbank dynamisch aus dem Hauptverzeichnis
fetch('../BenjaminR.emotes')
  .then(response => response.json())
  .then(data => {
    // Erstellt das Array 'pg' exakt so, wie es dein Original erwartet
    // extrahiert den Dateinamen (z.B. "amogus.gif") aus der URL
    let pg = data.map(item => {
      return item.src.substring(item.src.lastIndexOf('/') + 1);
    });

    // Startet deine originale Logik mit den dynamischen Daten
    initializeEmotes(pg);
  })
  .catch(error => console.error('Fehler beim Laden der Emote-Datenbank:', error));

function initializeEmotes(pg) {
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  document.getElementById('body').appendChild(table);

  // --- AB HIER 1:1 DEIN ORIGINALER CODE ---
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
        img.src = "emotes/" + fullname; // Zurückgeändert auf deinen Originalpfad
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

  // Macht GetRandomEmote global für deine HTML-Buttons verfügbar
  window.GetRandomEmote = function() {
    let idx = randomInt(0, pg.length);
    CopyName(pg[idx].split('.')[0]);
  }
}

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
