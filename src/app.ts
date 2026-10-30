// 1. Model de dades (Interface)
interface Tasca {
    nom: string;
    tipus: string;
    data:Date;
    estat: string;
}

let tasca1 : Tasca;

let llistaTasques : Tasca[] = [];

// 2. Funció per llegir el formulari i afegir un nou element a l'array
function afegirElement(): void {
    const inputNom = document.getElementById('iNom') as HTMLInputElement;
    const selectTipus = document.getElementById('sTipus') as HTMLSelectElement;
    const inputData = document.getElementById('iData') as HTMLInputElement;

    tasca1 = {
        nom: inputNom.value,
        tipus: selectTipus.value,
        data: new Date(inputData.value),
        estat: 'No completat'
    }

    llistaTasques.push(tasca1);
    console.log(tasca1.data.getDate().toString()+'-'+ (tasca1.data.getMonth().toString()));
    console.log(llistaTasques);

    // Actualitzar la pantalla
    actualitzarUI();
}

function canviarEnProces(i:number){
    if (llistaTasques[i].estat==='No completat'){llistaTasques[i].estat='En procés'}
actualitzarUI();
}

function canviarCompletat(i:number){
    if (llistaTasques[i].estat==='En procés'){llistaTasques[i].estat='Completat'}
    actualitzarUI();
}

function esborrar(i:number){
    if (llistaTasques[i].estat==='Completat'){llistaTasques.splice(i,1);}
    actualitzarUI();
}

function escriureData(data: Date) {
    let dia = data.getDate();
    let mes = data.getMonth()+1;
    let any= data.getFullYear();
    return dia+"-"+mes+"-"+any;
}

// 5. Funció per dibuixar l'array al DOM
function actualitzarUI(): void {
    // const nom = document.getElementById('nom') as HTMLElement;
    // const tipus = document.getElementById('tipus') as HTMLElement;
    // const importancia = document.getElementById('importancia') as HTMLElement;
    // nom.innerText= tasca1.nom;
    // tipus.innerText='Tipus: ' + tasca1.tipus;
    // importancia.innerText='Importància: ' + tasca1.importancia;

    const contenidorNoCompletades = document.getElementById('contenidorTasquesNoCompletades') as HTMLElement;
    const contenidorEnProces = document.getElementById('contenidorTasquesEnProces') as HTMLElement;
    const contenidorCompletades = document.getElementById('contenidorTasquesCompletades') as HTMLElement;
    let htmlNoCompletades:string='<h1>No completades</h1>'
    let htmlEnProces:string='<h1>En procés</h1>'
    let htmlCompletades:string='<h1>Completades</h1>'

    for (let i = 0; i < llistaTasques.length; i++) {
        if (llistaTasques[i].estat === 'No completat') {
            htmlNoCompletades += '<div class=\"card abaix\">'
            htmlNoCompletades += '<h2>' + llistaTasques[i].nom + '</h2>'
            htmlNoCompletades += '<h3>' +'Tipus: '+ llistaTasques[i].tipus + '</h3>'
            htmlNoCompletades += '<h3>' +'Data: '+ escriureData(llistaTasques[i].data) + '</h3>'
            htmlNoCompletades += `<button onclick="canviarEnProces(${i})">Canvi</button>`
            htmlNoCompletades += '</div>'
        }
        if (llistaTasques[i].estat === 'En procés') {
            htmlEnProces += '<div class=\"card abaix\">'
            htmlEnProces += '<h2>' + llistaTasques[i].nom + '</h2>'
            htmlEnProces += '<h3>' +'Tipus: '+ llistaTasques[i].tipus + '</h3>'
            htmlEnProces += '<h3>' +'Data: '+ escriureData(llistaTasques[i].data) + '</h3>'
            htmlEnProces += `<button onclick="canviarCompletat(${i})">Canvi</button>`
            htmlEnProces += '</div>'
        }
        if (llistaTasques[i].estat === 'Completat') {
            htmlCompletades += '<div class=\"card abaix\">'
            htmlCompletades += '<h2>' + llistaTasques[i].nom + '</h2>'
            htmlCompletades += '<h3>' +'Tipus: '+ llistaTasques[i].tipus + '</h3>'
            htmlCompletades += '<h3>' +'Data: '+ escriureData(llistaTasques[i].data) + '</h3>'
            htmlCompletades+= `<button onclick="esborrar(${i})">Esborrar</button>`
            htmlCompletades += '</div>'
        }
    }
    contenidorNoCompletades.innerHTML= htmlNoCompletades;
    contenidorEnProces.innerHTML= htmlEnProces;
    contenidorCompletades.innerHTML= htmlCompletades;
}

// 6. Assegurar que el DOM està carregat abans d'assignar esdeveniments
document.addEventListener('DOMContentLoaded', () => {
    const btnAfegir = document.getElementById('btnAfegir');
    btnAfegir?.addEventListener('click', afegirElement);
    actualitzarUI();
});

actualitzarUI()

//ctrl+z=undo ctrl+shift+z=redo
//pitjar per amunt a sa terminal
//commit