const username = "alex";
const pass = "qwerty";

document.querySelector(".post").addEventListener("click", () => {
  // JSON

  fetch("/post-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      pass: pass,
    }),
  });
});

document.querySelector(".post-form").addEventListener("click", () => {
  // x-www-form-urlencoded

  const params = new URLSearchParams({
    uname: username,
    password: pass,
  });

  fetch("/post-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
});

document.querySelector("#uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const fileInput = form.querySelector('input[name="file"]');

  if (fileInput.files.length === 0) {
    console.log("choose file");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch("/upload-file", {
      method: "POST",
      body: formData, // Content-Type выставится автоматически
    });

    if (response.ok) {
      const text = await response.text();
      console.log(text);
    } else {
      console.log("some error");
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
});
