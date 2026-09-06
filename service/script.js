let pg = [];

// 1. Daten dynamisch aus der JSON-Datei laden
async function loadEmotes() {
    try {
        // Sucht relativ zur index.html im Hauptverzeichnis
        const response = await fetch('BenjaminR.emotes');
        if (!response.ok) {
            throw new Error(`Fehler beim Laden: ${response.status}`);
        }
        pg = await response.json();
        
        // Nach erfolgreichem Laden die Tabelle generieren
        buildTable();
    } catch (error) {
        console.error("Fehler beim Laden der Emotes:", error);
    }
}

// 2. Die Tabelle basierend auf den geladenen Daten aufbauen
function buildTable() {
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    document.getElementById('body').appendChild(table);

    // Schleife für die Zeilen (10 Emotes pro Zeile)
    for (let i = 0; i < pg.length; i += 10) {
        let row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            if (i + j < pg.length) {
                // Holt das Emote-Objekt aus dem Array
                let emote = pg[i + j];
                let name = emote.code; // Nutzt das 'code'-Feld (z.B. "amogus")
                let src = emote.src;   // Nutzt die direkte GitHub-Bild-URL
                
                let cell = document.createElement('td');
                let div0 = document.createElement('div');
                div0.className = "polaroid";
                
                let img = document.createElement('img');
                img.src = src;
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

    // 3. Event-Listener exakt wie im Original hinzufügen
    for (let i = 0; i < pg.length; i++) {
        let name = pg[i].code;
        document.getElementById(name + "_container").addEventListener('click', () => { CopyName(name); }, false);
        document.getElementById(name + "_img").addEventListener('click', () => { CopyName(name); }, false);
    }
}

// 4. Originale Hilfsfunktionen unverändert beibehalten
function CopyName(id) {
    let copyText = document.getElementById(id);
    if (!copyText) return;
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
    if (pg.length === 0) return;
    let idx = randomInt(0, pg.length - 1);
    CopyName(pg[idx].code);
}

// Skript starten
loadEmotes();
