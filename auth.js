function loadCSV(url) {
  return fetch(url)
    .then(response => response.text())
    .then(data => {
      return data.trim().split("\n").slice(1).map(row => {
        const [username, password, grade, classNum, number, name, course] = row.split(",");
        return { username, password, grade, classNum, number, name, course };
      });
    });
}

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorBanner = document.getElementById("error-banner");

  const users = await loadCSV("user_data.csv");
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    sessionStorage.setItem("loginUser", JSON.stringify(user));
    window.location.href = "home.html";
  } else {
    errorBanner.style.display = "block";
  }
});
