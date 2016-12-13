'use strict';
var sredniaczek = {
  checkWeight: function (element) {
    var elemencikAlt = element.getAttribute('alt'),
      wagaStr = elemencikAlt.indexOf("Waga: ");
    return parseInt(elemencikAlt.slice(wagaStr + 6, wagaStr + 7), 10);
  },
  checkGrade: function (grade) {
    var liczba = parseInt(grade, 10);
    if (isNaN(liczba) || liczba > 6 || liczba < 0) {
      return -1;
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
    
  },
  init: function () {
    var tableRecords = document.querySelectorAll('table.ocenyZwykle-table > tbody > tr'),
        tableHead = document.querySelector('table.ocenyZwykle-table > thead > tr'),
        sredniaElement = document.createElement('th'),
        sredniaElementInner = document.createTextNode("Średnia"),
        tableData = [],
        srednia = [],
        i,
        j;
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
          sumaWag = 0,
          sumaZer = 0;
      for (j = 0; j < oceny.length; j++) {
        if (this.checkGrade(oceny[j].innerHTML) >= 0) {
          ocenyTablica.push(this.checkGrade(oceny[j].innerHTML));
          if(this.checkGrade(oceny[j].innerHTML) === 0) {
            sumaZer++;
          }
          else {
            ocenySuma += (this.checkGrade(oceny[j].innerHTML) * this.checkWeight(oceny[j]));
            sumaWag += this.checkWeight(oceny[j]);
          }
        }
      }
      ocenySrednia = (ocenySuma / sumaWag).toFixed(2);
      if (isNaN(ocenySrednia)) {
        sredniaTdInner = document.createTextNode("-");
      }
      else {
        if(sumaZer > 0) {
          ocenySrednia -= sumaZer * 0.25;
        }
        sredniaTdInner = document.createTextNode(ocenySrednia.toString());
      }
      sredniaTd.appendChild(sredniaTdInner);
      tableRecords[i].appendChild(sredniaTd);
      //console.log("Suma ocen: " + ocenySuma + ", Ilość ocen: " + ocenyTablica.length + ", Średna ocen: " + ocenySrednia + ", Suma Wag: " + sumaWag + ", Ilość zer: " + sumaZer); 
    }
  }
};
sredniaczek.init();