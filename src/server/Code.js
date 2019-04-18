/* exported search */
function search(pageToken) {
  if (pageToken === 'start') pageToken = undefined;

  var optionalArgs = {
    q: '"me" in owners',
    maxResults: 1000,
    orderBy: 'modifiedDate desc',
    fields:
      'items(id, title, modifiedDate, createdDate, mimeType, alternateLink, permissions(type, id, name, emailAddress), labels(trashed)), nextPageToken'
  };
  if (pageToken) optionalArgs.pageToken = pageToken;
  var list = Drive.Files.list(optionalArgs);
  var files = list.items.filter(shared_);
  return { nextPageToken: list.nextPageToken, files: files };
}

function shared_(item) {
  return item.permissions.some(function(permission) {
    return /anyone/.test(permission.type);
  });
}
