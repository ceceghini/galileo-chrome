document.addEventListener('DOMContentLoaded', function() {

  var copyPageButton = document.getElementById('copy');
  copyPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {action: "getOrderId"}, function(response) {
        var orderid = response.dom;
        if (orderid.indexOf("Errore")!==-1) {
          alert(orderid);
        }
        else {
          var background = chrome.extension.getBackgroundPage();
          background.orderid = orderid;
          alert("Ordine copiato: " + orderid);
        }
      });
    });

  }, false);

  var pastePageButton = document.getElementById('paste');
  pastePageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

      var background = chrome.extension.getBackgroundPage();
      orderid = background.orderid;
      chrome.tabs.sendRequest(tab.id, {action: "pasteAddress", id: orderid}, function(response) {
        alert(response.dom);
      });
    });

  }, false);

  var anonimoPageButton = document.getElementById('anonimo');
  anonimoPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

      chrome.tabs.sendRequest(tab.id, {action: "anonimo"});
    });

  }, false);

  var test = document.getElementById('test');
  test.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {action: "test"}, function(response) {
        alert(response.dom);
      });
    });

  }, false);

}, false);
