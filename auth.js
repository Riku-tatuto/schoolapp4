// CSVファイルを読み込む関数
async function loadCSV(file) {
  const res = await fetch(file);
  const text = await res.text();
  return text.split("\n").slice(1).map(line => {
    const [username, password, name, grade, classNum, number, course] = line.trim().split(",");
    return { username, password, name, grade, classNum, number, course };
  });
}

// ログイン処理
document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const users = await loadCSV("user_data.csv");

      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location.href = "home.html";
      } else {
        document.getElementById("error-banner").style.display = "block";
      }
    });
  }

  // ホームページ処理
  if (window.location.pathname.endsWith("home.html")) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    document.getElementById("welcome-message").textContent = 
      `ようこそ、${user.course.toUpperCase()}コースの${user.grade}年${user.classNum}組${user.number}番の${user.name}さん！`;

    // ログアウト
    document.getElementById("logout-btn").addEventListener("click", () => {
      sessionStorage.removeItem("user");
      window.location.href = "index.html";
    });

    // ページ切り替え
    document.getElementById("home-link").addEventListener("click", () => {
      document.getElementById("home-section").style.display = "block";
      document.getElementById("schedule-section").style.display = "none";
    });

    document.getElementById("schedule-link").addEventListener("click", () => {
      document.getElementById("home-section").style.display = "none";
      document.getElementById("schedule-section").style.display = "block";
      loadSchedule(user.course.toLowerCase());
    });
  }
});

// 時間割読み込み
async function loadSchedule(course) {
  const res = await fetch(`schedule_${course}.csv`);
  const text = await res.text();
  const rows = text.trim().split("\n").map(row => row.split(","));
  const table = document.createElement("table");
  rows.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  const container = document.getElementById("schedule-table");
  container.innerHTML = "";
  container.appendChild(table);
}
