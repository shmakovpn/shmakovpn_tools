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



