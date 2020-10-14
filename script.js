function newPopup() {
  varWindow = window.open (
    'popup.html',
    'popup',
    "width=900, height=500, top=120, left=250, scrollbars=no");
}

function closePopup() {
  fecharWindow = varWindow.close();
}