"use strict";
function checkWeight(element) {
  
  var elemencikAlt = element.getAttribute('alt'),
      wagaStr = elemencikAlt.indexOf("Waga:");
  return parseInt(elemencikAlt.slice(wagaStr  +6, wagaStr + 7), 10);
}
function checkGrade(grade) {
  var liczba = parseInt(grade, 10);
  if (isNaN(liczba)) return false;
  else {
    if(liczba > 6 || liczba < 1) {
      return false;
    }
    else {
      switch(grade[1]) {
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
for(i = 0; i < tableRecords.length; i++) {
  var nazwaPrzedmiotu = tableRecords[i].querySelector('td:nth-child(1)').innerHTML,
      kolumnaOcen = tableRecords[i].querySelector('td.break-word'),
      oceny = kolumnaOcen.querySelectorAll('span.ocenaCzastkowa.masterTooltip'),
      sredniaTd = document.createElement('td'),
      sredniaTdInner,
      ocenyTablica = [],
      ocenySrednia = 0, 
      ocenySuma = 0,
      sumaWag = 0;
  for(j = 0; j < oceny.length; j++) {
      if(checkGrade(oceny[j].innerHTML)) {
        ocenyTablica.push(checkGrade(oceny[j].innerHTML));
        ocenySuma += (checkGrade(oceny[j].innerHTML)*checkWeight(oceny[j]));
        sumaWag += checkWeight(oceny[j]);
      }  
  }
  ocenySrednia = (ocenySuma/sumaWag).toFixed(2);
  if(isNaN(ocenySrednia)) {
    sredniaTdInner = document.createTextNode("-");
  }
  else {
    sredniaTdInner = document.createTextNode(ocenySrednia.toString());
  }
  sredniaTd.appendChild(sredniaTdInner);
  tableRecords[i].appendChild(sredniaTd);
  //console.log("Suma ocen: " + ocenySuma + ", Ilość ocen: " + ocenyTablica.length + ", Średna ocen: " + ocenySrednia + ", Suma Wag: " + sumaWag); 
}

