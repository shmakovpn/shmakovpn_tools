Certbot (Letsencrypt) configuration
===================================

Certbot can be configured to use multiple domain names e.g. 
*shmakovpn.ru*, *www.shmakovpn.ru*, *something.shmakovpn.ru*.

To perform changes in the list of domains of your certbot configuration,
perform the command shown below.

 .. code-block:: shell-session

  # certbot certonly -n -d shmakovpn.ru -d www.shmakovpn.ru -d something.shmakovpn.ru --expand
  Saving debug log to /var/log/letsencrypt/letsencrypt.log
  Plugins selected: Authenticator webroot, Installer None
  Renewing an existing certificate
  Performing the following challenges:
  http-01 challenge for something.shmakovpn.ru
  Using the webroot path /var/www/html for all unmatched domains.
  Waiting for verification...
  Challenge failed for domain something.shmakovpn.ru
  http-01 challenge for something.shmakovpn.ru
  Cleaning up challenges
  Running post-hook command: systemctl reload nginx
  Some challenges have failed.
  
  IMPORTANT NOTES:
   - The following errors were reported by the server:
  
     Domain: something.shmakovpn.ru
     Type:   dns
     Detail: DNS problem: NXDOMAIN looking up A for something.shmakovpn.ru
     - check that a DNS record exists for this domain

But something wrong has happened. The command was failed. 

The output reports that the DNS error has occurred and the name *something.shmakovpn.ru* can not be resolved.

Thus I have to add the A-record *something.shmakovpn.ru* into the DNS configuration on the provider side.

Ok. I have added the needed A-record then waited for a bit.

Let's try to run the program once again.

 .. code-block:: shell-session

  # certbot certonly -n -d shmakovpn.ru -d www.shmakovpn.ru -d something.shmakovpn.ru --expand
  Saving debug log to /var/log/letsencrypt/letsencrypt.log
  Plugins selected: Authenticator webroot, Installer None
  Renewing an existing certificate
  Performing the following challenges:
  http-01 challenge for something.shmakovpn.ru
  Using the webroot path /var/www/html for all unmatched domains.
  Waiting for verification...
  Challenge failed for domain something.shmakovpn.ru
  http-01 challenge for something.shmakovpn.ru
  Cleaning up challenges
  Running post-hook command: systemctl reload nginx
  Some challenges have failed.
  
  IMPORTANT NOTES:
   - The following errors were reported by the server:
  
     Domain: something.shmakovpn.ru
     Type:   unauthorized
     Detail: Invalid response from
     http://something.shmakovpn.ru/.well-known/acme-challenge/pAo2WPW8b2c-5LWvP4AcZ3zUJVm5pvSLIU16wtCkqE8
     [95.188.88.74]: "<html>\r\n<head><title>404 Not
     Found</title></head>\r\n<body bgcolor=\"white\">\r\n<center><h1>404
     Not Found</h1></center>\r\n<hr><center>"
  
     To fix these errors, please make sure that your domain name was
     entered correctly and the DNS A/AAAA record(s) for that domain
     contain(s) the right IP address.
  
The crash reason has changed.
In this particular case, the problem was in my *Nginx* web server configuration.
I had to be added *something.shmakovpn.ru* into it. So, I have change my
*/etc/nginx/conf.d/shmakovpn-ru-80.conf*.

 .. code-block:: nginx

  server {
      listen 80;
      server_name: shmakovpn.ru www.shmakovpn.ru something.shmakovpn.ru;
      root /var/www/html;
      include /etc/nginx/default.d/*.conf;
  }

Then *Nginx* was restarted and *certbot* command was repeated.

 .. code-block:: shell-session

  # certbot certonly -n -d shmakovpn.ru -d www.shmakovpn.ru -d something.shmakovpn.ru --expand
  Saving debug log to /var/log/letsencrypt/letsencrypt.log
  Plugins selected: Authenticator webroot, Installer None
  Renewing an existing certificate
  Performing the following challenges:
  http-01 challenge for something.shmakovpn.ru
  Using the webroot path /var/www/html for all unmatched domains.
  Waiting for verification...
  Cleaning up challenges
  Running post-hook command: systemctl reload nginx
  
  IMPORTANT NOTES:
   - Congratulations! Your certificate and chain have been saved at:
     /etc/letsencrypt/live/shmakovpn.ru/fullchain.pem
     Your key file has been saved at:
     /etc/letsencrypt/live/shmakovpn.ru/privkey.pem
     Your cert will expire on 2020-12-09. To obtain a new or tweaked
     version of this certificate in the future, simply run certbot
     again. To non-interactively renew *all* of your certificates, run
     "certbot renew"
   - If you like Certbot, please consider supporting our work by:
  
     Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
     Donating to EFF:                    https://eff.org/donate-le

Using given certificates with Onlyoffice
----------------------------------------

The certificates were placed into */etc/letsencrypt/live/shmakovpn.ru/*.

 .. code-block:: shell-session

  # ls -al /etc/letsencrypt/live/shmakovpn.ru/
  total 4
  drwxr-xr-x. 2 root root  93 сен 10 07:40 .
  drwx------. 3 root root  40 янв  5  2020 ..
  lrwxrwxrwx  1 root root  36 сен 10 07:40 cert.pem -> ../../archive/shmakovpn.ru/cert6.pem
  lrwxrwxrwx  1 root root  37 сен 10 07:40 chain.pem -> ../../archive/shmakovpn.ru/chain6.pem
  lrwxrwxrwx  1 root root  41 сен 10 07:40 fullchain.pem -> ../../archive/shmakovpn.ru/fullchain6.pem
  lrwxrwxrwx  1 root root  39 сен 10 07:40 privkey.pem -> ../../archive/shmakovpn.ru/privkey6.pem
  -rw-r--r--. 1 root root 692 янв  5  2020 README

Create directory */app/onlyoffice/DocumentServer/data/certs/*.

 .. code-block:: shell-session

  # mkdir -p  /app/onlyoffice/DocumentServer/data/certs

Copy the certificate and the key into the created folder.

 .. code-block:: shell-session

  # cp /etc/letsencrypt/live/shmakovpn.ru/fullchain.pem /app/onlyoffice/DocumentServer/data/certs/onlyoffice.crt
  # cp /etc/letsencrypt/live/shmakovpn.ru/privkey.pem /app/onlyoffice/DocumentServer/data/certs/onlyoffice.key

Run your Onlyoffice docker container.

 .. code-block:: shell-session

  # docker run -i -t -d -p 8010:80 -p 8011:443 -v /app/onlyoffice/DocumentServer/data:/var/www/onlyoffice/Data --restart=always onlyoffice/documentserver


Using given certificates with Drawio
------------------------------------

Create directory */tomcat-docker*.

 .. code-block:: shell-session

  # mkdir /tomcat-docker

Create keystore.

 .. code-block:: shell-session

  # openssl pkcs12 -export -in /etc/letsencrypt/live/shmakovpn.ru/fullchain.pem -inkey /etc/letsencrypt/live/shmakovpn.ru/privkey.pem -out /tomcat-docker/drawio.p12 -password pass:V3ry1nS3cur3P4ssw0rd
  # keytool -importkeystore -srckeystore /tomcat-docker/drawio.p12 -srcstoretype PKCS12 -destkeystore /tomcat-docker/.keystore -deststoretype JKS -srcstorepass V3ry1nS3cur3P4ssw0rd -deststorepass V3ry1nS3cur3P4ssw0rd
  Importing keystore /tomcat-docker/drawio.p12 to /tomcat-docker/.keystore...
  Entry for alias 1 successfully imported.
  Import command completed:  1 entries successfully imported, 0 entries failed or cancelled
  
  Warning:
  The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore /tomcat-docker/.keystore -destkeystore /tomcat-docker/.keystore -deststoretype pkcs12".

Run your Drawio docker container.

 .. code-block:: shell-session

  # docker run -i -t -d -p 8012:8080 -p 8013:8443 --mount type=bind,source=/tomcat-docker/.keystore,target=/usr/local/tomcat/.keystore --restart=always jgraph/drawio

Automation updating Onlyoffice and Drawio when the certificate was updated
--------------------------------------------------------------------------

todo

