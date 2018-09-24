/**
 * @file Пользовательские вызовы и манипуляции с Ui
 */

/* exported onOpen, userActionStart, userActionShowSidebar */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Поиск')
    .addItem('Начать поиск', 'userActionStart')
    .addItem('Показать боковую панель', 'userActionShowSidebar')
    .addToUi();
}

function userActionShowSidebar() {
  var userInterface = HtmlService.createTemplateFromFile(
    'client/index'
  ).evaluate();
  SpreadsheetApp.getUi().showSidebar(userInterface);
}

function fileInfo() {
  var file = Drive.Files.get(
    '1mt5rBJZH2ZnsoFifXp4BPCg-ftumrOUsSOaWcc5Q5N4Ot3-YHaAsXl9P',
    { fields: 'permissions' }
  );
  SpreadsheetApp.getActive()
    .getSheets()[1]
    .appendRow([JSON.stringify(JSON.parse(file), null, ' ')]);
  //  Drive.Permissions.
}

/**
 * Ничего не делает пока еще
 */
function userActionStart() {
  // var spreadsheet = SpreadsheetApp.getActive();
  // spreadsheet.toast('Ку');

  //  var f = Drive.Files.get(fileId, optionalArgs)
  var i = 30;
  var res = search();
  //  var copy = JSON.stringify(JSON.parse(res));
  //  copy.items = [];
  //  console.log(copy);
  var files = res.items;
  while (res.nextPageToken && i >= 0) {
    console.log(i, res.nextPageToken);
    var res = search(res.nextPageToken);
    files = files.concat(res.items);
    i--;
  }

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheets()[0];
  sheet
    .clearContents()
    .getRange(2, 1, data.length, data[0].length)
    .setValues(data);
}
