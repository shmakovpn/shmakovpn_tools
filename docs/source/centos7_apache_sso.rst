Configuring SSO on Httpd under Centos7
======================================

Note: all commands require *root* privileges.

Install **httpd**, **mod_auth_gssapi**, **mod_ssl**.

 .. code-block:: shell-session

  # yum install -y httpd
  # yum install -y mod_ssl
  # yum install -y mod_auth_gssapi

Parameters:
 - The name of the domain is **shmakovpn.ru**.
 - The hostname of the domain controller **dc.shmakovpn.ru**.
 - The username of HTTP service of the site **userspy**.
 - The URL of the site **userspy.shmakovpn.ru**.
 - The site is a Django project placed in */var/www/userspy*.
 - The project python version is **python3.6**.
 - The Http WSGI module installed system wide using pip3 in */usr/local/lib64/python3.6/site-packages/mod_wsgi/server/mod_wsgi-py36.cpython-36m-x86_64-linux-gnu.so*.
 - The project virtual environent placed in */var/www/userspy/venv*.
 - The site uses SSL.
 - The path to SSL cert is */var/www/userspy/ssl/userspy.shmakovpn.ru.crt*.
 - The path to SSL key is */var/www/userspy/ssl/userspy.shmakovpn.ru.pem*.
 - The login form URL *https://userspy.shmakovpn.ru/login*.
 - The login URL for SSO *https://userspy.shmakovpn.ru/login/gssapi*.

Create user in the active directory domain with name **userspy**.
The password of this user has to never expire.


Run commands below on your domain controller to configure the account created before and generate a keytab file.

 .. code-block:: shell-session

  > setspn -S HTTP/userspy.shmakovpn.ru\userspy
  Checking domain DC=shmakovpn,DC=ru

  Registering ServicePrincipleNames for CN=userspy,OU=Service Accounts,DC=shmakovpn,DC=ru
      HTTP/userspy.shmakovpn.ru
  Updated object

  > ktpass /princ HTTP/userspy.shmakovpn.ru@SHMAKOVPN.RU /mapuser shmakovpn\userspy /pass p@ssw0rd /out c:\temp\userspy.shmakovpn.ru.keytab /crypto all /ptype KRB5_NT_PRINCIPAL /mapop set
  Targeting domain controller: dc.shmakovpn.ru
  Successfully mapped HTTP/userspy.shmakovpn.ru to userspy.
  Password successfully set!
  Key created.
  Key created.
  Key created.
  Key created.
  Key created.
  Output keytab to c:\temp\userspy.shmakovpn.ru.keytab:
  Keytab version: 0x502
  keysize 63 HTTP/userspy.shmakovpn.ru@shmakovpn.ru ptype 1 <KRB5_NT_PRINCIPAL> vno 3 etype 0x1 <DES-CBC-CRC> keylength 8 <0x15e6eaaa1730d3404>
  keysize 63 HTTP/userspy.shmakovpn.ru@shmakovpn.ru ptype 1 <KRB5_NT_PRINCIPAL> vno 3 etype 0x3 <DES-CBC-MD5> keylength 8 <0x15e6eaaa1730d3404>
  keysize 71 HTTP/userspy.shmakovpn.ru@shmakovpn.ru ptype 1 <KRB5_NT_PRINCIPAL> vno 3 etype 0x17 <RC4-HMAC> keylength 16 <0x1a70039fb711819183a4b58aad9f7a>
  keysize 87 HTTP/userspy.shmakovpn.ru@shmakovpn.ru ptype 1 <KRB5_NT_PRINCIPAL> vno 3 etype 0x12 <AES256-SHA1> keylength 32 <0x2d226143e43ce719f85f3cc862ab32d0eff75d45bd1c0b1257f3ec15cabbbf07>
  keysize 71 HTTP/userspy.shmakovpn.ru@shmakovpn.ru ptype 1 <KRB5_NT_PRINCIPAL> vno 3 etype 0x11 <AES128-SHA1> keylength 16 <0x03bca9a453446e2b223e2ebd5e7b702a>

Configure **httpd**, create file */etc/httpd/conf.d/userspy-ssl.conf*.

 .. code-block:: apacheconf

  Listen 443
  LoadModule wsgi_module /usr/local/lib64/python3.6/site-packages/mod_wsgi/server/mod_wsgi-py36.cpython-36m-x86_64-linux-gnu.so
  WSGIPythonPath /var/www/userspy
  WSGIPythonHome /var/www/userspy/venv
  <VirtualHost *:443>
      SSLEngine on
      SSLCertificateFile /var/www/userspy/ssl/userspy.shmakovpn.ru.crt
      SSLCertificateKeyFile /var/www/userspy/ssl/userspy.shmakovpn.ru.pem

      ServerName userspy.krw.oao.rzd
      DocumentRoot /var/www/userspy/html-stub

      # django admin aliases
      Alias /static/admin /var/www/userspy/venv/lib/python3.6/site-packages/django/contrib/admin/static/admin
      <Directory /var/www/userspy/venv/lib/python3.6/site-packages/django/contrib/admin/static/admin>
          Require all granted
      </Directory>

      WSGIScriptAlias / /var/www/userspy/userspy/wsgi.py
      WSGIPassAuthorization On
      <Directory /var/www/userspy/userspy>
          <Files wsgi.py>
              Require all granted
          </Files>
      </Directory>

      <Location "/login/gssapi">
          GssapiSSLonly On
          AuthType GSSAPI
          AuthName "Userspy Login"
          GssapiLocalName On
          GssapiCredStore keytab:/var/www/userspy/userspy.krw.oao.rzd.keytab
          Require valid-user
          ErrorDocument 401 "<html><meta http-equiv=\"refresh\" content=\"0;url=/login\"></html>"
      </Location>
  </VirtualHost>

Todo: insert схема переходов



End
