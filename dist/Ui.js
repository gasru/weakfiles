/**
 * @file Пользовательские вызовы и манипуляции с Ui
 */

/* exported onOpen, userActionStart */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Поиск')
    .addItem('Начать поиск', 'userActionStart')
    .addToUi();
}

/**
 * Ничего не делает пока еще
 */
function userActionStart() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.toast();
}
