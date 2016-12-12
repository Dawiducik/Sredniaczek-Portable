'use strict';
var fileInput = document.querySelector('#myfileinput'),
    uploadButton = document.querySelector('#save');
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
          tableStart, tableEnd, table;
      if (file && file.length) {
        tableStart = file.indexOf('<table class="ocenyZwykle-table">'); //szuka gdzie zaczyna sie tabela
        tableEnd = file.indexOf("</main>"); //ten element jest tuz po zakonczeiu tabeli
        table = file.slice(tableStart, tableEnd); //wycina kod między rozpoczeciem i zakonczeniem
        localStorage.setItem('table', table); //zapisanie wyciętej tabeli 
        location = "file.html"; // redirect do kolejnego pliku
      }
    }
  }
  else {
    alert('Załaduj plik przed klikaniem')
  }
}, false);

