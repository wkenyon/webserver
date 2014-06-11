secret.wkenyon.net
==================

A simple webserver to serve a single, password protected page, over https.

Dependencies
=========================
* node.js
* npm
* python2

Install
=======

1. git clone ssh://git@github.com/wkenyon/secret.wkenyon.net.git
2. cd secret.wkenyon.net
3. npm install --python=python2
   (--python=python2 only required if you have python2 and python3 on the same system)
4. node app.js singlepage.html private-key.pem certificate.pem
