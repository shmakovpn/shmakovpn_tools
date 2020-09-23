Working with the project hosted on a remote server
==================================================

.. figure:: ../images/remote_ide/developer_infrastructure.svg
 :alt: A developer infrastructure

.. warning:: Someone gives the advice to use **SFTP Drive**. It is a very slow program.

When I work with documentation,
I write it directly in console using **vim**.
After a file was changed, **inotifywait** runs *sphinx build* automatically.
Built documentation is shared using **Nginx** under **Docker**.
Please, read this:
:ref:`Sphinx/View your documentation on another host <remote_sphinx>`.

Now we are going to use **Samba** under **Docker**.

.. figure:: ../images/remote_ide/ide_to_server.svg
 :alt: An IDE interaction with a server 

I suppose that you are already installed **Docker**.
If not, please read this:
:ref:`Install docker <install_docker>`

Get **uid** and **gid**.

.. code-block:: shell-session

 $ id
 uid=1000(shmakovpn) gid=1000(shmakovpn) ...

Run the docker container.

.. code-block:: shell-session

 $ docker run \
    -it --rm \
    -p 139:139 \
    -p 445:445 \
    -p 137:137/udp \
    -p 138:138/udp \
    -e USERID=1000 \
    -e GROUPID=1000 \
    -v /home/shmakovpn/projects:/mount \
    -d dperson/samba \
    -p -n -r -S -w SHMAKOVPN \
    -u "shmakovpn;12345678" \
    -s "public;/mount;yes;no;no;shmakovpn"
 0c345071b5bace3d0e43092552db5362afea5fef55d13e323072fb34159beaa3
 
Mount **samba** share to a PC with an IDE.

.. figure:: ../images/remote_ide/mount_network_drive1.png
 :alt: Mount the network drive. Step 1.

.. figure:: ../images/remote_ide/mount_network_drive2.png
 :alt: Mount the network drive. Step 2.

.. figure:: ../images/remote_ide/mount_network_drive3.png
 :alt: Mount the network drive. Step 3.

.. figure:: ../images/remote_ide/mount_network_drive4.png
 :alt: Mount the network drive. Step 4.

Run an IDE, then open a project on the drive **Z:**.



