Using **realmd** to connect to an Active Directory Domain
=========================================================

Centos 7
--------

Note: all commands require *root* privileges.

Install **sssd**.

 .. code-block:: shell-session

  # yum install -y sssd

Install **adcli**.

 .. code-block:: shell-session

  # yum install -y adcli

Install **realmd**. (**oddjob**, **oddjob-mkhomedir** will be installed automatically).

 .. code-block:: shell-session

  # yum install -y realmd

Install **bind-utils** (this package provides **nslookup** utility).

 .. code-blockk:: shell-session

  # yum install -y bind-utils

Check your DNS configuration (looking up for SRV records of Domain Controllers).
The output must contain one or more records.

 .. code-block:: shell-session

  $ nslookup -type=srv _ldap._tcp.shmakovpn.ru
  Server:         192.168.1.2
  Address:        192.168.1.2#53
  
  _ldap._tcp.shmakovpn.ru  service = 0 100 389 dc.shmakovpn.ru.

Discover the domain

 .. code-block:: shell-session

  # realm discover shmakovpn.ru
  shmakovpn.ru
  type: kerberos
  realm-name: SHMAKOVPN.RU
  domain-name: shmakovpn.ru
  configured: no
  server-software: active-directory
  client-software: sssd
  required-package: oddjob
  required-package: oddjob-mkhomedir
  required-package: sssd
  required-package: adcli
  required-package: samba-common-tools

Install **krb5-workstation** (this package provides **kinit** utility).

 .. code-block:: shell-session

  # yum install -y krb5-workstation

Test login in to the domain

 .. code-block:: shell-session

  $ kinit shmakovpn@SHMAKOVPN.RU
  Password for shmakovpn@SHMAKOVPN.RU:
  $ klist
  Ticket cache: KCM:1000
  Default principal: shmakovpn@SHMAKOVPN.RU
  
  Valid starting       Expires              Service principal
  03.09.2020 00:51:39  03.09.2020 10:51:39  krbtgt/SHMAKOVPN.RU@SHMAKOVPN.RU
           renew until 10.09.2020 00:51:34


Install **samba-common-tools**.

 .. code-block:: shell-session

  # yum install -y samba-common-tools

Join to domain.

 .. code-block:: shell-session

  # realm join SHMAKOVPN.RU -U shmakovpn@SHMAKOVPN.RU
  Password for shmakovpn@SHMAKOVPN.RU:
  # realm list
  shmakovpn.ru
    type: kerberos
    realm-name: SHMAKOVPN.RU
    domain-name: shmakovpn.ru
    configured: kerberos-member
    server-software: active-directory
    client-software: sssd
    required-package: oddjob
    required-package: oddjob-mkhomedir
    required-package: sssd
    required-package: adcli
    required-package: samba-common-tools
    login-formats: %U@shmakovpn.ru
    login-policy: allow-realm-logins

Perform testing login (from the same sever).

 .. code-block:: shell-session

  $ ssh shmakovpn\@shmakovpn.ru@localhost
  The authenticity of host 'localhost (::1)' can't be established.
  ECDSA key fingerprint is SHA256:something_something
  ECDSA key fingerprint is MD5:so:me:th:in:ng_.
  Are you sure you want to continue connecting (yes/no)? yes
  Warning: Permanently added 'localhost' (ECDSA) to the list of known hosts.
  shmakovpn@shmakovpn.ru@localhost's password:
  Creating home directory for shmakovpn@shmakovpn.ru.
  $ whoami
  shmakovpn@shmakovpn.ru
  $ pwd
  /home/shmakovpn@shmakovpn.ru

Set access rules (allow access only for members of the group *SERVER-ADMINS*).

 .. code-block:: shell-session

  # realm deny --all
  # realm permit -g SERVER-ADMINS

Add the group *SEVER-ADMINS* to sudoers.

 .. code-block:: shell-session

  # echo '%SERVER-ADMINS@SHMAKOVPN.RU  ALL=(ALL)       NOPASSWD: ALL' > /etc/sudoers.d/SERVER-ADMINS

Perform the last check.

 .. code-block:: shell-session

  # realm list
  shmakovpn.ru
    type: kerberos
    realm-name: SHMAKOVPN.RU
    domain-name: shmakovpn.ru
    configured: kerberos-member
    server-software: active-directory
    client-software: sssd
    required-package: oddjob
    required-package: oddjob-mkhomedir
    required-package: sssd
    required-package: adcli
    required-package: samba-common-tools
    login-formats: %U@shmakovpn.ru
    login-policy: allow-permitted-logins
    permitted-logins:
    permitted-groups: SERVER-ADMINS

Congratulations. Now members of the SERVER-ADMINS group will be able to login in on your server and get root privileges.

 
 
