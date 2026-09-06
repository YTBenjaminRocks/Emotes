let pg = [];

// Funktion zum Laden der Emotes aus der JSON-Datei
async function loadEmotes() {
    try {
        // Pfad relativ zur Repository-Struktur anpassen, falls nötig
        const response = await fetch('/BenjaminR.emotes');
        pg = await response.json();
        
        // Nach erfolgreichem Laden die Tabelle aufbauen
        buildTable();
    } catch (error) {
        console.error("Fehler beim Laden der Emotes:", error);
    }
}

function buildTable() {
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    const bodyElement = document.getElementById('body');
    if (bodyElement) {
        bodyElement.appendChild(table);
    }

    for (let i = 0; i < pg.length; i += 10) {
        let row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            if (i + j < pg.length) {
                let fullname = pg[i + j];
                const arr = fullname.split('.');
                let name = arr[0];
                let cell = document.createElement('td');
                let div0 = document.createElement('div');
                div0.className = "polaroid";
                let img = document.createElement('img');
                // Pfad zu den Bildern anpassen, falls "emotes/" woanders liegt
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

    // Event-Listener direkt nach dem Erstellen der Elemente hinzufügen
    for (let i = 0; i < pg.length; i++) {
        let name = pg[i].split('.')[0];
        const container = document.getElementById(name + "_container");
        const img = document.getElementById(name + "_img");
        
        if (container) container.addEventListener('click', () => { CopyName(name); }, false);
        if (img) img.addEventListener('click', () => { CopyName(name); }, false);
    }
}

function CopyName(id) {
    let copyText = document.getElementById(id);
    if (!copyText) return;
    
    copyText.hidden = false;
    copyText.select();
    
    // Moderne Alternative zu execCommand, falls vom Browser unterstützt
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText.value).then(() => {
            copyText.hidden = true;
        }).catch(err => {
            document.execCommand("copy");
            copyText.hidden = true;
        });
    } else {
        document.execCommand("copy");
        copyText.hidden = true;
    }
}

function randomInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min);
    return Math.round(rand);
}

function GetRandomEmote() {
    if (pg.length === 0) return;
    let idx = randomInt(0, pg.length - 1); // -1 korrigiert den Index-Überlauf
    CopyName(pg[idx].split('.')[0]);
}

// Initialer Start des Skripts
loadEmotes();
