document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    // ログイン処理
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      fetch("users.csv")
        .then((response) => {
          if (!response.ok) throw new Error("ユーザーデータの読み込みに失敗しました");
          return response.text();
        })
        .then((csvText) => {
          const lines = csvText.split("\n");
          const headers = lines[0].split(",");
          const users = lines.slice(1).map((line) => {
            const values = line.split(",");
            const userObj = {};
            headers.forEach((header, index) => {
              userObj[header.trim()] = values[index]?.trim();
            });
            return userObj;
          });

          const matchedUser = users.find((user) => user.username === username && user.password === password);

          if (matchedUser) {
            // ログイン成功 → セッション保存
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("username", matchedUser.username);
            sessionStorage.setItem("name", matchedUser.name);
            sessionStorage.setItem("course", matchedUser.course);
            sessionStorage.setItem("grade", matchedUser.grade);
            sessionStorage.setItem("class", matchedUser.class);
            sessionStorage.setItem("number", matchedUser.number);

            window.location.href = "home.html";
          } else {
            document.getElementById("error-banner").style.display = "block";
          }
        })
        .catch((error) => {
          console.error("ログインエラー:", error);
          alert("エラーが発生しました。");
        });
    });
  }

  // 不正アクセス防止（ログイン後ページでのみ有効）
  const currentPage = window.location.pathname;

  if (!currentPage.endsWith("index.html") && !currentPage.endsWith("/")) {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      window.location.href = "index.html"; // 未ログイン → ログインページへ
    }
  }
});

// ログアウト処理（ログアウトボタンで呼び出し）
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}
