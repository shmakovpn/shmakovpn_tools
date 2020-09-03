Using **realmd** to connect to an Active Directory Domain
---------------------------------------------------------

Note: all commands requires *root* privileges.

Install **sssd**.

 .. code-block: bash

  yum install -y sssd

Install **adcli**.

 .. code-block: bash

  yum install -y adcli

Install **realmd**. **oddjob**, **oddjob-mkhomedir** will be installed automatically.

 .. code-block: bash

  yum install -y realmd


