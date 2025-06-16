// Task 01

// Проаналізуйте послідовність виконання коду JavaScript. Спробуйте передбачіти порядок виконання методом, який показаний на занятті (файл xlsx завантажений у матеріалах заняття).

console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);

//! Answer: 1 4 3 2

// Task 02

// Проаналізуйте послідовність виконання коду JavaScript. Спробуйте передбачіти порядок виконання методом, який показаний на занятті (файл xlsx завантажений у матеріалах заняття).

console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
}, 0);

Promise.resolve().then(() => console.log(4));

console.log(5);

//! Answer: 1 5 4 2 3

// Task 03

// Проаналізуйте послідовність виконання коду JavaScript. Спробуйте передбачіти порядок виконання методом, який показаний на занятті (файл xlsx завантажений у матеріалах заняття).

console.log(1);

setTimeout(() => {
  console.log(2);
  new Promise((resolve) => {
    console.log(3);
    resolve();
  }).then(() => console.log(4));
}, 0);

Promise((resolve) => {
  console.log(5);
  resolve();
}).then(() => console.log(6));

console.log(7);

//! Answer:1 7 5 6 2 3 4

// Task 04

// Проаналізуйте послідовність виконання коду JavaScript. Спробуйте передбачіти порядок виконання методом, який показаний на занятті (файл xlsx завантажений у матеріалах заняття).

console.log(1);

Promise.resolve().then(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
});

console.log(4);

//! Answer:1 4 2 3

// Task 05

// Проаналізуйте послідовність виконання коду JavaScript. Спробуйте передбачіти порядок виконання методом, який показаний на занятті (файл xlsx завантажений у матеріалах заняття).

setTimeout(() => {
  console.log(1);
}, 0);

Promise.resolve().then(() => {
  console.log(2);
  setTimeout(() => {
    console.log(3);
  }, 0);
});

Promise.resolve().then(() => console.log(4));

//! Answer: 2 4 1 3
// Task 06

// Проаналізуйте послідовність виконання коду JavaScript. Спробуйте передбачіти порядок виконання методом, який показаний на занятті (файл xlsx завантажений у матеріалах заняття).

setTimeout(() => console.log(1), 0);
Promise.resolve().then(() => console.log(2));
console.log(3);

//! Answer:3 2 1

// Task 07

// Проаналізуйте послідовність виконання коду NodeJS.

process.nextTick(() => {
  console.log(1);
});

Promise.resolve().then(() => {
  console.log(2);
});

console.log(3);

//! Answer: 3 1 2

// Task 08

// Проаналізуйте послідовність виконання коду NodeJS.

setTimeout(() => {
  console.log(1);
}, 0);

setImmediate(() => {
  console.log(2);
});

console.log(3);

//! Answer: 3 1 2

// Task 09

// Проаналізуйте послідовність виконання коду NodeJS.

console.log(1);

setTimeout(() => console.log(2), 0);

setImmediate(() => console.log(3));

Promise.resolve().then(() => console.log(4));

process.nextTick(() => console.log(5));

console.log(6);

//! Answer: 1 6 5 4 2 3

// Task 10

// Проаналізуйте послідовність виконання коду NodeJS.

const arr = [11, 22];

const fn = (item) => setTimeout((item) => console.log(item), 0, item);

arr.filter(fn);

//! Answer: 11 22

// Розгляньте цей варіант коду

// const arr = [11, 22];
// const fn = (item) => setTimeout(item => console.log(item));
// arr.filter(fn);

// Task 10

// Створіть анонімний модуль, який читає файл переданий як аргумент, та повертає ЧИСЛО з файла!!!! Приклад файла

const fs = require("fs");

fs.writeFile("text.file", "10", { flag: "a+" }, (err, date) => {
  if (err) throw err;
  console.log(date);
});
