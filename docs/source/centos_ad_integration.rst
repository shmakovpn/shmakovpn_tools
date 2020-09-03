Using **realmd** to connect to an Active Directory Domain
=========================================================

Centos 7
--------

 Note: all commands require *root* privileges.
 
 Install **sssd**.
 
  .. code-block:: bash
 
   $ yum install -y sssd
 
 Install **adcli**.
 
  .. code-block:: bash
 
   $ yum install -y adcli
 
 Install **realmd**. **oddjob**, **oddjob-mkhomedir** will be installed automatically.
  .. code-block:: bash
 
   $ yum install -y realmd

 Checking your DNS configuration (looking up for SRV records of Domain Controllers).
 The output must contain one or more records.
  .. code-block:: bash

   $ nslookup -type=srv _ldap._tcp.shmakovpn.ru
   Server:         192.168.1.2
   Address:        192.168.1.2#53
   
   _ldap._tcp.shmakovpn.ru  service = 0 100 389 dc.shmakovpn.ru.

 
 
