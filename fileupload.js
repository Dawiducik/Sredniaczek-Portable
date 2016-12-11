var fileInput = document.querySelector('#myfileinput')
  , uploadButton = document.querySelector('#save');

function checkWeight(element) {
  var elemencikAlt = element.getAttribute('alt')
    , wagaStr = elemencikAlt.indexOf("Waga:");
  return parseInt(elemencikAlt.slice(wagaStr + 6, wagaStr + 7), 10);
}

function checkGrade(grade) {
  var liczba = parseInt(grade, 10);
  if (isNaN(liczba)) return false;
  else {
    if (liczba > 6 || liczba < 1) {
      return false;
    }
    else {
      switch (grade[1]) {
      case '+':
        liczba += 0.25;
        return liczba;
      case '-':
        liczba -= 0.25;
        return liczba;
      default:
        return liczba;
      }
    }
  }
}
var sredniaczek = {
  init: function () {
    var tableRecords = document.querySelectorAll('table.ocenyZwykle-table > tbody > tr'),
        tableHead = document.querySelector('table.ocenyZwykle-table > thead > tr'),
        tableData = [],
        srednia = [],
        i,
        j,
        sredniaElement,
        sredniaElementInner;
    sredniaElement = document.createElement('th');
    sredniaElementInner = document.createTextNode("Średnia");
    sredniaElement.appendChild(sredniaElementInner);
    tableHead.appendChild(sredniaElement);
    for (i = 0; i < tableRecords.length; i++) {
      var nazwaPrzedmiotu = tableRecords[i].querySelector('td:nth-child(1)').innerHTML,
          kolumnaOcen = tableRecords[i].querySelector('td.break-word'),
          oceny = kolumnaOcen.querySelectorAll('span.ocenaCzastkowa.masterTooltip'),
          sredniaTd = document.createElement('td'),
          sredniaTdInner,
          ocenyTablica = [],
          ocenySrednia = 0,
          ocenySuma = 0,
          sumaWag = 0;
      for (j = 0; j < oceny.length; j++) {
        if (checkGrade(oceny[j].innerHTML)) {
          ocenyTablica.push(checkGrade(oceny[j].innerHTML));
          ocenySuma += (checkGrade(oceny[j].innerHTML) * checkWeight(oceny[j]));
          sumaWag += checkWeight(oceny[j]);
        }
      }
      ocenySrednia = (ocenySuma / sumaWag).toFixed(2);
      if (isNaN(ocenySrednia)) {
        sredniaTdInner = document.createTextNode("-");
      }
      else {
        sredniaTdInner = document.createTextNode(ocenySrednia.toString());
      }
      sredniaTd.appendChild(sredniaTdInner);
      tableRecords[i].appendChild(sredniaTd);
      //console.log("Suma ocen: " + ocenySuma + ", Ilość ocen: " + ocenyTablica.length + ", Średna ocen: " + ocenySrednia + ", Suma Wag: " + sumaWag); 
    }
  }
};
uploadButton.addEventListener('click', function () {
  if (!window.FileReader) {
    alert('Nie kompatybilna przeglądarka!');
    return false;
  }
  var fileList = fileInput.files,
      numFiles = fileList.length;
  var reader = new FileReader(); //Stworzenie obiektu render
  if (fileInput.files.length) { // idzie dalej jeśli plik nie jest pusty
    var textFile = fileInput.files[0]; // wzięcie pliku
    reader.readAsText(textFile); // "konwertowanie" do textu
    reader.onload = function (event) {
      var file = event.target.result,
          body = document.querySelector('body'),
          tableStart, tableEnd, table, tableContainer;
      if (file && file.length) {
        tableStart = file.indexOf('<table class="ocenyZwykle-table">'); //szuka gdzie zaczyna sie tabela
        tableEnd = file.indexOf("</main>"); //ten element jest tuz po zakonczeiu tabeli
        table = file.slice(tableStart, tableEnd); //wycina kod między rozpoczeciem i zakonczeniem
        tableContainer = document.createElement("div.container"); //tworzy nowy div z klasa container
        tableContainer.innerHTML = table; //przypisuje wewnętrzny html czyli wyciętą tabele do containera
        body.appendChild(tableContainer);
        document.querySelector('div.flexContainer').setAttribute("style","display: none");
        //uploadButton.setAttribute("style", "display: none");
        sredniaczek.init();
      }
    }
  }
  else {
    alert('Załaduj plik przed klikaniem')
  }
}, false);