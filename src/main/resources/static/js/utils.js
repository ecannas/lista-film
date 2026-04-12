function mostraToast(messaggio, tipo = "info") {
  const toastEl = document.getElementById("toastMessage");
  const toastText = document.getElementById("toastText");

  if (!toastEl || !toastText) {
    console.error("Toast elements not found!");
    return;
  }

  toastEl.className = "toast align-items-center border-0 text-bg-" +
    (tipo === "success" ? "success" :
     tipo === "error" ? "danger" :
     tipo === "warning" ? "warning" : "dark");

  toastText.textContent = messaggio;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function getCsrfToken() {
        const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
        return match ? match[2] : "";
    }