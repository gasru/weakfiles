/* exported NEXT_PAGE_TOKEN */

window.addEventListener(
  'DOMContentLoaded',
  function() {
    document.getElementById('btn_find').addEventListener('click', function() {
      search('start');
    });
  },
  true
);

function keepOn() {
  return true;
}

function search(nextPageToken) {
  google.script.run
    .withSuccessHandler(function(res) {
      console.log(res);
      if (keepOn() && res.nextPageToken) search(res.nextPageToken);
    })
    .search(nextPageToken);
}
