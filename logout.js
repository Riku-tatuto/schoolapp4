document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.removeItem("loginUser");
  window.location.href = "index.html";
});
