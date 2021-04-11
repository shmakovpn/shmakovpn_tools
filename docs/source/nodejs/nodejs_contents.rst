Nodejs
======

Intall and **Hello world**.
---------------------------

Install **Node.js** on **Centos 8**.

 .. code-block:: shell-session

  # dnf -y install nodejs

Create the projects folder.

 .. code-block:: shell-session

  $ mkdir -p ~/projects/exapmles-nodejs

Create *'Hello World from Node.js'* project.

 .. code-block:: shell-session

  $ mkdir ~/projects/examples-nodejs/hello_world
  $ touch ~/projects/examples-nodejs/hello_world/hello_world.js

Edit **hello_world.js** file.

 .. code-block:: javascript

  console.log('Hello World from Node.js');

Run your *Hello world* project.

 .. code-block:: shell-session

  $ node ~/projects/exapmles-nodejs/hello_world/hello_world.js
  Hello World from Node.js

Edit **hello_world.js** once again.

 .. code-block:: javascript

  // something like python f-string 
  console.log(`Hello World from Node.js ${process.version}`);

Then run.

 .. code-block:: shell-session

  $ node ~/projects/exapmles-nodejs/hello_world/hello_world.js
  Hello World from Node.js v10.21.0

As you can see, **Node.js** has its own analog of python f-strings.

 .. code-block:: javascript

  let foo='bar';
  console.log(`the 'foo' is '${foo}'`);

The code shown before, in python will be:

 .. code-block:: python

  foo='bar'
  print(f"the 'foo' is '{foo}'")

**nodeenv** the **virtualenv** analog for **Node.js**
-----------------------------------------------------

Install

.. code-block:: shell-session

 $ workon shmakovpn
 $ pip install nodeenv
 $ nodeenv --version
 1.5.0

Get a list of available versions of **Node.js**.

.. code-block:: shell-session
 
 $ nodeenv --list
 ...
 14.11.0

Create your first **Node.js** environment into current **virtualenv** (*-p* flag). 

.. code-block:: shell-session

 $ nodeenv -v 14.11.0 -p
 $ which node
 ~/.virtualenvs/shmakovpn/bin/node
 $ node --version
 v10.21.0
 $ ~/.virtualenvs/shmakovpn/bin/node --version
 v14.11.0

Reactivate your **virtualenv**.


**Typescript** Hello World
--------------------------

We will use **Node.js** with **nodeenv** and **virtualenv**.

Activate **virtualenv**.

.. code-block:: shell-session

 $ workon shmakovpn
 $ node --version
 v14.11.0
 $ which npm
 ~/.virtualenvs/shmakovpn/bin/npm

Install **typescript**.

.. note:: 

 If you use Ubuntu and work behind proxy, you may need to set **NODE_EXTRA_CA_CERTS** environment variable to fix
 *UNABLE_TO_GET_ISSUER_CERT_LOCALLY* error of **npm**.
 
  .. code-block:: bash
  
   export NODE_EXTRA_CA_CERTS="/etc/ssl/certs/ca-certificates.crt"

.. code-block:: shell-session

 $ npm install -g typescript
 /home/shmakovpn/.virtualenvs/shmakovpn/bin/tsc -> /home/shmakovpn/.virtualenvs/shmakovpn/lib/node-modules/typescript/bin/tsc
 /home/shmakovpn/.virtualenvs/shmakovpn/bin/tsserver -> /home/shmakovpn/.virtualenvs/shmakovpn/lib/node-modules/typescript/bin/tsserver
 + typescript@4.0.2
 added 1 package from 1 contributor in 2.351s
 $ npm list -g | grep typescript
 └── typescript@4.0.2
 $ tsc -v
 Version 4.0.2

Create file *~/projects/examples-nodejs/hello_typescript.ts*.

.. code-block:: shell-session

 $ touch ~/projects/examples-nodejs/hello_world/hello_typescript.ts

.. code-block:: typescript

 const myName: string = 'Me';
 console.log(`Hello ${myName}`);

Let's compile **hello_typescript.ts**

.. code-block:: shell-session

 tsc ~/projects/examples-nodejs/hello_world/hello_typescript.ts

**tsc** will create **hello_typescript.js** file

.. code-block:: javascript

 var myName = 'Me';
 console.log("Hello " + myName);

Highlight **typescript** code in **vim**.

todo
 


