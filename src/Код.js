function searchDOCs(){
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var array = []
  var t = 0
  var max = 300
  var files = DriveApp.searchFiles(q())
  
  while (files.hasNext() && t<max){
    t++
      var file = files.next();
    try{
      array = array.concat([[file.getName(), file.getUrl(), file.getSharingAccess(), file.getDateCreated(), file.getOwner().getEmail()]]);
    }catch (err){}
  }
  var r = ss.getRange(3, 1, array.length, array[0].length)
  r.clearContent()
  r.setValues(array)
}


function q(){
  var userEmail = Session.getActiveUser().getEmail()
  var t = "'%s' in writers and (visibility = 'anyoneWithLink' or visibility = 'anyoneCanFind')";
  var q = Utilities.formatString(t, userEmail);
  return q
}

function onOpen(e){
  SpreadsheetApp.getUi()
  .createMenu("Скрипты ↓↓")
  .addItem("найти Таблицы", "searchDOCs")
  .addToUi();
}