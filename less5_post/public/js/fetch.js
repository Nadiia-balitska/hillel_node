const username = "alex";
const password = "qwerty";

document.querySelector(".post").addEventListener("click", () => {
  //JSON
  fetch("/post-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uname: username,
      pass: password,
    }),
  });
});

document.querySelector(".post-form").addEventListener("click", () => {
  //x-www-form-urlencoded
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
