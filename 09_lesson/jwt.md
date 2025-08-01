# Схема роботи JWT

```plaintext
1. Користувач -> [Аутентифікація (логін)]
                      |
                      v
         Сервер створює JWT токен
                      |
                      v
2. Сервер -> [JWT] -> Користувач (браузер)

3. Користувач -> [Запит до захищеного ресурсу з JWT у заголовку Authorization]

4. Сервер -> [Перевірка токена]
                      |
                      v
           Якщо валідний — доступ дозволено
           Якщо ні — 401 Unauthorized
```

## Основні етапи:
- **Аутентифікація:** Користувач вводить логін/пароль.
- **Видача токена:** Сервер генерує підписаний JWT і відправляє клієнту.
- **Збереження токена:** Клієнт зберігає токен у localStorage або cookies.
- **Доступ до ресурсів:** Клієнт надсилає токен у заголовку `Authorization: Bearer <token>`.
- **Валідація:** Сервер перевіряє підпис та час дії токена.
