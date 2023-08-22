//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {


  //show and hide nationality 
$(document).ready(function () {
  window.GOVUKFrontend.initAll()
  // Code snippet for the nationality page
  $('#second-nationality-link').click(function() {
    $('#second-nationality').show();
    $('#second-nationality-link').hide();
    return false;
  });
  $('#third-nationality-link').click(function() {
    $('#third-nationality').show();
    $('#third-nationality-link').hide();
    return false;
  });       
})


})
