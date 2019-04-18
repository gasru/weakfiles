function doGet(e) {
  return HtmlService.createTemplateFromFile('client/app')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
