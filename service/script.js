// Lädt die JSON-Datenbank dynamisch aus dem Hauptverzeichnis (einen Ordner nach oben)
fetch('../BenjaminR.emotes')
  .then(response => response.json())
  .then(data => {
    // Erstellt das Array 'pg' direkt aus den Dateinamen der src-URLs
    // z.B. "https://.../emotes/amogus.gif" -> "amogus.gif"
    let pg = data.map(item => {
      return item.src.substring(item.src.lastIndexOf('/') + 1);
    });

    initializeEmotes(pg);
  })
  .catch(error => console.error('Fehler beim Laden der Emote-Datenbank:', error));

function initializeEmotes(pg) {
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  document.getElementById('body').appendChild(table);

  // Tabelle in 10er-Schritten aufbauen
  for (let i = 0; i < pg.length; i += 10) {
    let row = document.createElement('tr');
    for (let j = 0; j < 10; j++) {
      if (i + j < pg.length) {
        let fullname = pg[i + j];
        
        // KORREKTUR: Holt den reinen Namen ohne Endung als String (nicht als Array)
        let name = fullname.substring(0, fullname.lastIndexOf('.'));
        
        let cell = document.createElement('td');
        let div0 = document.createElement('div');
        div0.className = "polaroid";
        
        let img = document.createElement('img');
        img.src = "../emotes/" + fullname; // Passt den Pfad an, da emotes im Hauptverzeichnis liegt
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

  // Klick-Events für das Kopieren zuweisen
  for (let i = 0; i < pg.length; i++) {
    let fullname = pg[i];
    let name = fullname.substring(0, fullname.lastIndexOf('.'));
    
    let containerEl = document.getElementById(name + "_container");
    let imgEl = document.getElementById(name + "_img");

    if (containerEl && imgEl) {
      containerEl.addEventListener('click', () => { CopyName(name); }, false);
      imgEl.addEventListener('click', () => { CopyName(name); }, false);
    }
  }

  // Macht GetRandomEmote global verfügbar (z. B. für Buttons im HTML)
  window.GetRandomEmote = function() {
    let idx = randomInt(0, pg.length - 1);
    let fullname = pg[idx];
    let name = fullname.substring(0, fullname.lastIndexOf('.'));
    CopyName(name);
  }
}

function CopyName(id) {
  let copyText = document.getElementById(id);
  if (copyText) {
    copyText.hidden = false;
    copyText.select();
    document.execCommand("copy");
    copyText.hidden = true;
  }
}

function randomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min);
  return Math.round(rand);
}
