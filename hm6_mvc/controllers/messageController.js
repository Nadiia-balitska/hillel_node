const Message = require("../models/messageModel"); //exported all messages which we have for using it

//в контроллерах ми виконуємо всі дії, які потім передаємо на роботу в роути
exports.home = (req, res) => {
  res.render("index");
};
exports.showForm = (req, res) => {
  res.render("form");
};

exports.submitForm = (req, res) => {
  const { username, text } = req.body; //тут ми отримуємо інформацію, яку потім будем обробляти в моделях
  Message.add(username, text); //передаємо всі дані в модель
  res.redirect("/messages");
};

exports.showMessages = (req, res) => {
  const allMessage = Message.getAll;
  res.render("messages", {
    messages: allMessage, // we use it in message.pug
  });
};
