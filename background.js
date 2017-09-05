var orderid = 0;

chrome.commands.onCommand.addListener(function(command) {

  if (command == "copyaddress") {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {action: "getOrderId"}, function(response) {
        orderid = response.dom;
        if (orderid.indexOf("Errore")!==-1) {
          alert(orderid);
        }
        else {
          alert("Ordine copiato: " + orderid);
        }
      });
    });
  }

  if (command == "pasteaddress") {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {action: "pasteAddress", id: orderid}, function(response) {
        alert(response.dom);
      });
    });
  }

  if (command == "paccoanonimo") {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {action: "anonimo"});
    });
  }

});
