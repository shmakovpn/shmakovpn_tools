Sphinx
======

Automation the building of the sphinx project when a source file was changed
----------------------------------------------------------------------------

Create **makedoc.py** script in your project folder.

.. code-block:: shell-session

 $ touch ~/projects/shmakovpn_tools/makedoc.py

.. literalinclude:: ../../../makedoc.py
 :language: python

Place your project documentation source files into *docs/source* folder, the run

.. code-block:: shell-session

 $ workon shmakovpn_tools  # switch to needed virtual environment
 $ python ~/projects/shmakovpn_tools/makedoc.py
 ...
 ...
 __END__

Install **inotify-tools**

Under **Ubuntu**.

.. code-block:: shell-session

 # apt install -y inotify-tools

Under **Centos 8**.

.. code-block:: shell-session

 # dnf install -y epel-release
 # dnf install -y inotify-tools

Create **auto_makedoc.sh** in your project folder.

.. code-block:: shell-session

 $ touch ~/projects/shmakovpn_tools/auto_makedoc.sh
 $ chmod +x ~/projects/shmakovpn_tools/auto_makedoc.sh

.. literalinclude:: ../../../auto_makedoc.sh
 :language: bash

Run **auto_makedoc.sh** in another terminal.
Create or modify any of documentation source file.

.. _remote_sphinx:

View your documentation on another host.
----------------------------------------

What do you do if your project is on another host?
You can use something like VNC or SSH with -X.
But if the development server doesn't have GUI?
There are several kinds of possible solutions.
One of which is share *docs/build/html* directory using HTTP.

Let's use docker for this.

.. _install_docker:

Install **docker**.

.. code-block:: shell-session

 # dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
 # dnf install -y docker-ce --nobest
 # systemctl enable docker
 # systemctl start docker
 # usermod -aG docker shmakovpn # add your non-root user to docker group

Login under your non-root user and run:

.. code-block:: shell-session

 $ docker run hello-world

Run **nginx** under **docker**.

.. code-block:: shell-session

 $ docker run -i -t -p 80:80 -v ~/projects/shmakovpn_tools/docs/build/html:/usr/share/nginx/html:ro -d nginx

Open *http://server_ip* on your computer with GUI.

Configure **Sphinx** to use **tabs** and **rtd-theme**.
-------------------------------------------------------

Install packages.

.. code-block:: shell-session

 $ workon shmakovpn # switch to your virtual environment
 $ pip install sphinx-rtd-theme
 $ pip install sphinx-tabs

Change **extenstions** section of *~/projects/shmakovpn_tools/docs/source/conf.py*:

.. code-block:: python

 extenstions = [
     'sphinx.ext.autodoc',
     'sphinx.ext.intersphinx',
     'sphinx.ext.viewcode',
     'sphinx.ext.todo',
     'sphinx_tabs.tabs',
 ]

And **html_theme**:

.. code-block:: python

 html_theme = 'sphinx_rtd_theme'

Also, if you want to user **sphinx-tabs** with **readthedocs.io**,
create file *~/projects/shmakovpn_tools/docs/requirements.txt*:

.. code-block:: python

 sphinx-tabs

.. warning:: **Latex** doesn't work with **sphinx-tabs**

