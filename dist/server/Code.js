function search(pageToken) {
  if (pageToken === 'start') {
    SpreadsheetApp.getActive()
      .getSheets()[0]
      .clearContents()
      .appendRow([
        'title',
        'alternateLink',
        'modifiedDate',
        'createdDate',
        'permission',
        'mimeType'
      ]);
    pageToken = undefined;
  }
  var optionalArgs = {
    q: '"me" in owners and trashed != true',
    maxResults: 1000,
    orderBy: 'modifiedDate desc',
    fields:
      'items(title, modifiedDate, createdDate, mimeType, alternateLink, permissions(type, id)), nextPageToken'
  };
  if (pageToken) optionalArgs.pageToken = pageToken;
  var list = Drive.Files.list(optionalArgs);
  var files = list.items.filter(shared_).map(map_);
  if (files.length) fillSpreadsheet(files);
  return { nextPageToken: list.nextPageToken, count: files.length };
}

function fillSpreadsheet(data) {
  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  sheet
    .getRange(sheet.getLastRow() + 1, 1, data.length, data[0].length)
    .setValues(data);
}

function shared_(item) {
  return item.permissions.some(function(permission) {
    return /anyone/.test(permission.type);
  });
}

function map_(item) {
  return [
    item.title,
    item.alternateLink,
    item.modifiedDate,
    item.createdDate,
    item.permissions
      .filter(function(permission) {
        return permission.type === 'anyone';
      })
      .map(function(permission) {
        return permission.id;
      })[0],
    item.mimeType
    // JSON.stringify(JSON.parse(item))
  ];
}
