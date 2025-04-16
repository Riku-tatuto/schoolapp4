const user = JSON.parse(sessionStorage.getItem("loginUser"));
if (!user) {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const info = `${user.grade}年${user.classNum}組${user.number}番 ${user.course}コース`;
  document.getElementById("user-info").textContent = info;

  // ハイライト調整
  document.getElementById("nav-home")?.classList.add("active");
});
