let pg = [];

// Funktion zum Laden der Emotes aus der JSON-Datei
async function loadEmotes() {
    try {
        const response = await fetch('/BenjaminR.emotes');
        pg = await response.json();
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
                let emote = pg[i + j];
                let name = emote.code;  
                let src = emote.src;    
                
                let cell = document.createElement('td');
                let div0 = document.createElement('div');
                div0.className = "polaroid";
                
                let img = document.createElement('img');
                img.src = src; 
                img.id = name + "_img";
                img.style.cursor = "pointer"; // Zeigt an, dass es klickbar ist
                
                let div1 = document.createElement('div');
                div1.id = name + "_container";
                div1.className = "container";
                div1.style.cursor = "pointer";
                
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

    // Event-Listener direkt per Schleife binden
    for (let i = 0; i < pg.length; i++) {
        let name = pg[i].code;
        const container = document.getElementById(name + "_container");
        const img = document.getElementById(name + "_img");
        
        if (container) container.addEventListener('click', () => { CopyName(name); }, false);
        if (img) img.addEventListener('click', () => { CopyName(name); }, false);
    }
}

function CopyName(textToCopy) {
    // Falls das versteckte Input-Feld existiert, nutzen wir es als Fallback
    let copyText = document.getElementById(textToCopy);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log("Kopiert: " + textToCopy);
        }).catch(err => {
            fallbackCopy(copyText);
        });
    } else {
        fallbackCopy(copyText);
    }
}

function fallbackCopy(element) {
    if (!element) return;
    element.hidden = false;
    element.select();
    document.execCommand("copy");
    element.hidden = true;
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

// Initialer Start des Skripts
loadEmotes();
