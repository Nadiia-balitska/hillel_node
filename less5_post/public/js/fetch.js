const username = "alex";
const password = "qwerty";

//JSON
document.querySelector(".post").addEventListener("click", () => {
  fetch("/post-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uname: username,
      pass: password,
    }),
  });
});

//x-www-form-urlencoded
document.querySelector(".post-form").addEventListener("click", () => {
  const params = new URLSearchParams({
    username: username,
    pass: password,
  });

  fetch("/post-data", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
});

document.querySelector("#upload-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const fileInput = form.querySelector('input[type="file"]');

  if (fileInput.files.length === 0) return;

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  fetch("/upload-file", {
    method: "POST",
    body: formData,
  });
});
