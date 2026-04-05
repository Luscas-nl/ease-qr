chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateQR",
    title: "Gerar QR Code",
    contexts: ["selection"],
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "generateQR") {
    chrome.storage.local.set({
      selectedText: info.selectionText,
    })
  }
})