import QRCode from "qrcode";

const qrImg = document.getElementById("qr") as HTMLImageElement;
const textEl = document.getElementById("text") as HTMLInputElement;
const downloadBtn = document.getElementById("download") as HTMLButtonElement;
const clearBtn = document.getElementById("clear") as HTMLButtonElement;

clearBtn.addEventListener("click", clearData);

type StorageData = {
  selectedText?: string
}

downloadBtn.disabled = true;
clearBtn.disabled = true;

chrome.storage.local.get("selectedText", async (data: StorageData) => {
  if (!data.selectedText) {
    return;
  }

  const text = data.selectedText;

  textEl.textContent = text;

  try {
    const qr = await QRCode.toDataURL(text)
    qrImg.src = qr;

    downloadBtn.addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = qr;
      a.download = "qrcode.png";
      a.click();
    })
    downloadBtn.disabled = false;
    clearBtn.disabled = false;
  } catch (error) {
    if (error instanceof Error) {
      textEl.textContent = `Erro ao gerar QR Code`;
      throw new Error(`Erro ao gerar QR Code: ${error.message}`);
    } else {
      textEl.textContent = "Erro desconhecido ao gerar QR Code.";
      throw new Error("Erro desconhecido ao gerar QR Code.");
    }
  }
})

function clearData() {
  chrome.storage.local.remove("selectedText", () => {
    qrImg.src = "";
    textEl.textContent = "Selecione um texto para gerar o QR Code";
    textEl.classList.add("italic");
    downloadBtn.disabled = true;
    clearBtn.disabled = true;
  })
}