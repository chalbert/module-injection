https://coderwall.com/p/2gfk4w/your-first-spdy-app

How to generate keys
spdy-js $ mkdir keys
spdy-js $ openssl genrsa -des3 -out keys/server.orig.key 2048
spdy-js $ openssl rsa -in keys/server.orig.key -out keys/server.key
spdy-js $ openssl req -new -key keys/server.key -out keys/server.csr
spdy-js $ openssl x509 -req -days 365 -in keys/server.csr -signkey keys/server.key -out keys/server.crt
