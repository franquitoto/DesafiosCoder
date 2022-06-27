curl --location --request POST 'http://localhost:8080/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3A9KE6Og1pgdCkD55ffhi78L8X2idf8Ppz.3utVbmHLdZe8bjkR46G7C5wxGOMXU5Vkikaq4YbL8gg' \
--data-raw '
  {
      "usuario":"Pepito7",
      "contrasena":"pepito12345"
  }'

artillery quick --count 50 -n 40 http://localhost:8080/info > result_2.txt