chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  if (request.action == "getOrderId") {
    var href = $(location).attr('href');
    if (href.indexOf("view_type=form") !== -1 && href.indexOf("model=sale.order") !== -1)
      sendResponse({dom: $('.order_id span').text()});
    else
      sendResponse({dom: "Errore: Pagina non compatibile con la funzione: ["+href+"]"});
  }

  if (request.action == "pasteAddress") {

    var orderid = request.id;
    var url = "https://galileo.pointec.it/order/paste-address?id="+orderid;
    var href = $(location).attr('href');
    var message = "Errore: Pagina non compatibile con la funzione";

    if (href.indexOf("https://puntorigenera.com/multishop/b2b/indirizzo") !== -1) {
      pastePuntoRigenera(url);
      message = "Indirizzo compilato correttamente PUNTORIGENERA ["+url+"]";
    }
    if (href.indexOf("https://www.supplies24.it/Checkout") !== -1) {
      pasteSupplies(url);
      message = "Indirizzo compilato correttamente SUPPLIES24 ["+url+"]";
    }
    if (href.indexOf("https://www.mysda.it/wps/myportal/") !== -1) {
      pasteSda(url);
      message = "Indirizzo compilato correttamente SDA ["+url+"]";
    }

    sendResponse({dom: message});
  }

  if (request.action == "anonimo") {
    var href = $(location).attr('href');
    if (href.indexOf("https://puntorigenera.com/multishop/b2b/ordine") !== -1) {
      $("textarea[name=message]").val("PACCO ANONIMO");
    }
  }

  if (request.action == "test") {
    sendResponse({dom: $(location).attr('href')});
  }

  sendResponse({dom: "Errore"});

});

function pastePuntoRigenera(url) {

  $.getJSON(url, function(result){
    $("#firstname").val(result.firstname);
    //console.log("#firstname: " + result.firstname);
    $("#lastname").val(result.lastname);
    //console.log("#lastname: " + result.lastname);
    $("#company").val(result.company);
    //console.log("#company: " + result.company);
    $("#address1").val(result.street);
    //console.log("#address1: " + result.street);
    $("#postcode").val(result.postcode);
    //console.log("#postcode: " + result.postcode);
    $("#city").val(result.city);
    //console.log("#city: " + result.city);
    $("#phone").val(result.telephone);
    //console.log("#phone: " + result.telephone);
    $("#id_state").val(result.regioncode_puntorigenera).change();
    //console.log("#id_state: " + result.regioncode_puntorigenera);
  });

}

function pasteSupplies(url) {

  $.getJSON(url, function(result){
    $("#custFirstName").val(result.firstname);
    //console.log("#custFirstName: " + result.firstname);
    $("#custLastName").val(result.lastname);
    //console.log("#custLastName: " + result.lastname);
    $("#custCompany").val(result.company);
    //console.log("#custCompany: " + result.company);
    $("#custStreet").val(result.street);
    //console.log("#custStreet: " + result.street);
    $("#custPLZ").val(result.postcode);
    //console.log("#custPLZ: " + result.postcode);
    $("#custCity").val(result.city);
    //console.log("#custCity: " + result.city);
    $("#custAddon").val("tel "+result.telephone);
    //console.log("#custAddon: " + result.telephone);
    //$("#id_state").val(result.regioncode_puntorigenera).change();
  });

}

function pasteSda(url) {

  $.getJSON(url, function(result){

    if (result.company) {
      $("input[id='destinatario.intestatario']").val(result.company);
      //console.log("#destinatario.intestatario: " + result.company);
    }
    else {
      $("input[id='destinatario.intestatario']").val(result.firstname + " " + result.lastname);
      //console.log("#destinatario.intestatario: " + result.firstname + " " + result.lastname);
    }

    $("select[id='destinatario.provincia']").val(result.region_code).change();
    //var original = $("input[id='destinatario.provincia']");
    //original.append('<input type="text" id="destinatario.provincia" name="destinatario.provincia" value="'+result.region_code+'">');

    //console.log("#destinatario.provincia: " + result.region_code);

    $("input[id='destinatario.cap']").val(result.postcode);
    //console.log("#destinatario.cap: " + result.postcode);
    $("input[name='destinatario.localita']").val(result.city);
    //console.log("#destinatario.localita: " + result.city);
    $("input[name='destinatario.indirizzo']").val(result.street);
    //console.log("#destinatario.indirizzo: " + result.street);

    $("input[name='destinatario.referente']").val(result.firstname + " " + result.lastname);
    //console.log("#destinatario.referente: " + result.firstname + " " + result.lastname);

    $("input[name='destinatario.telefono']").val(result.telephone);
    //console.log("#destinatario.telefono: " + result.telephone);
    $("input[name='destinatario.email']").val(result.email);
    //console.log("#destinatario.email: " + result.email);

  });

}
