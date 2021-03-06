const znakovi = ["karo", "pik", "skocko", "srce", "tref", "zvezda"];

let kombinacija = [];
let trazenaKombinacija = [];
let finished = false;
let brPoteza = 0;

function refreshPage() {
  window.location.reload();
}

function generisiKombinaciju() {
  /* trazenaKombinacija = []
    for (let i = 0; i < 4; i++) {
    trazenaKombinacija.push(Math.floor(Math.random() * 6));
  }*/

  for (let i = 0; i < 4; i++) {
    trazenaKombinacija[i] = Math.floor(Math.random() * 6);
  }
  console.log("trazena kombinacija: ");
  for (let i = 0; i < 4; i++) {
    console.log(znakovi[trazenaKombinacija[i]]);
  }

  createRow();
}

function play(idZnaka) {
  if (finished) {
    return;
  }

  //console.log("Korisnik igra potez " + znakovi[idZnaka]);
  kombinacija.push(idZnaka);

  if (kombinacija.length <= 4) {
    addSymbol(idZnaka);
  }

  if (kombinacija.length == 4) {
    brPoteza++;
    addEmptyCol();
    let brCrvenih = 0;
    let brZutih = 0;
    let zutiTrKombinacije = [];
    let zutiKorisnikoveKombinacije = [];

    console.log(trazenaKombinacija);
    console.log(kombinacija);

    for (let i = 0; i < 4; i++) {
      if (kombinacija[i] == trazenaKombinacija[i]) {
        brCrvenih++;
      } else {
        zutiTrKombinacije.push(trazenaKombinacija[i]);
        zutiKorisnikoveKombinacije.push(kombinacija[i]);
      }
    }

    console.log(zutiTrKombinacije);
    console.log(zutiKorisnikoveKombinacije);

    for (let i = 0; i < zutiKorisnikoveKombinacije.length; i++) {
      for (let j = 0; j < zutiTrKombinacije.length; j++) {
        if (zutiKorisnikoveKombinacije[i] == zutiTrKombinacije[j]) {
          brZutih++;
          zutiTrKombinacije.splice(j, 1);
          break;
        }
      }
    }

    /*  

  <div class="row mt-1 mb-1">
          <div class="col"></div>
          <div class="col">
            <img src="slike/tref.jpg" />
          </div>
          <div class="col">
            <img src="slike/tref.jpg" />
          </div>
          <div class="col">
            <img src="slike/tref.jpg" />
          </div>
          <div class="col">
            <img src="slike/tref.jpg" />
          </div>
          <div class="col">
            <div class="correct"></div>
          </div>
          <div class="col">
            <div class="correct"></div>
          </div>
          <div class="col">
            <div class="halfCorrect"></div>
          </div>
          <div class="col">
            <div class="notCorrect"></div>
          </div>
          <div class="col"></div>
        </div>
 */

    /*  <div class="col">
        <div class="correct"></div>
      </div> */
    addRedCircles(brCrvenih);

    /* <div class="col">
            <div class="halfCorrect"></div>
          </div> */
    addYellowCircles(brZutih);

    /* <div class="col">
             <div class="notCorrect"></div>
          </div> */
    let brSivih = 4 - brCrvenih - brZutih;
    addGreyCircles(brSivih);

    //<div class="col"></div>
    addEmptyCol();

    // logika poteza
    //isprazni niz kombinacija
    // kombinacija = [];
    while (kombinacija.length != 0) {
      kombinacija.pop();
    }
    createRow();
    if (brCrvenih == 4) {
      finishGame();
    }
    if (brPoteza == 6) {
      document.getElementById("doneGame").innerHTML =
        "Gotova igra, poku??ajte ponovo";
      finished = true;
    }
  }
}

function finishGame() {
  var ispis = document.getElementById("ispis");
  ispis.innerHTML = "??estitke!";
  ispis.style.color = "green";
  ispis.style.fontWeight = "bold";
  ispis.style.fontSize = "30px";
  finished = true;
}

function createRow() {
  let newRed = document.createElement("div");
  newRed.setAttribute("class", "row mt-1 mb-1");

  //<div class="col"></div>
  let praznaKolona = document.createElement("div");
  praznaKolona.setAttribute("class", "col ps-0");
  newRed.appendChild(praznaKolona);

  let potezi = document.getElementById("moves");
  potezi.appendChild(newRed);
}

function addSymbol(idZnaka) {
  let el = document.createElement("div");
  el.setAttribute("class", "col ps-0");

  let znak = znakovi[idZnaka];
  let slika = document.createElement("img");
  slika.setAttribute("src", "slike/" + znak + ".png");
  //slika.src = "slike/tref.jpg";       nacin 2

  el.appendChild(slika);
  let red = document.querySelector(".row.mt-1.mb-1:last-child");
  red.appendChild(el);
}

function addRedCircles(brCrvenih) {
  /*  <div class="col">
        <div class="correct"></div>
      </div> */
  for (let i = 0; i < brCrvenih; i++) {
    let el = document.createElement("div");
    el.setAttribute("class", "col ps-0");

    el.innerHTML = ' <div class="correct"></div>';
    let red = document.querySelector(".row.mt-1.mb-1:last-child");
    red.appendChild(el);
  }
}

function addYellowCircles(brZutih) {
  /* <div class="col">
            <div class="halfCorrect"></div>
          </div> */
  for (let i = 0; i < brZutih; i++) {
    let el = document.createElement("div");
    el.setAttribute("class", "col ps-0");

    el.innerHTML = ' <div class="halfCorrect"></div>';
    let red = document.querySelector(".row.mt-1.mb-1:last-child");
    red.appendChild(el);
  }
}

function addGreyCircles(brSivih) {
  /* <div class="col">
             <div class="notCorrect"></div>
          </div> */
  for (let i = 0; i < brSivih; i++) {
    let el = document.createElement("div");
    el.setAttribute("class", "col ps-0");

    el.innerHTML = ' <div class="notCorrect"></div>';
    let red = document.querySelector(".row.mt-1.mb-1:last-child");
    red.appendChild(el);
  }
}

function addEmptyCol() {
  //<div class="col"></div>
  let praznaKolona = document.createElement("div");
  praznaKolona.setAttribute("class", "col ps-0");
  let red = document.querySelector(".row.mt-1.mb-1:last-child");
  red.appendChild(praznaKolona);
}
