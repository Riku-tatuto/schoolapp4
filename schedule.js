const user = JSON.parse(sessionStorage.getItem("loginUser"));
if (!user) {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const course = user.course.toUpperCase();
  fetch(`schedule_${course}.csv`)
    .then(res => res.text())
    .then(data => {
      const table = document.getElementById("schedule-table");
      const rows = data.trim().split("\n").map(row => row.split(","));

      rows.forEach((cols, i) => {
        const tr = document.createElement("tr");
        cols.forEach(col => {
          const cell = i === 0 ? document.createElement("th") : document.createElement("td");
          cell.textContent = col;
          tr.appendChild(cell);
        });
        table.appendChild(tr);
      });
    });

  // ハイライト調整
  document.getElementById("nav-schedule")?.classList.add("active");
});
