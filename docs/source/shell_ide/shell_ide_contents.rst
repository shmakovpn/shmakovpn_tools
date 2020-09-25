Turning a Linux console to an IDE
=================================

Configure **vim**.

.. code-block:: shell-session

 $ cd
 $ git clone https://github.com/shmakovpn/.configs
 $ ln -sf .configs/.vimrc

Configure **tmux**.

.. code-block:: shell-session

 $ cd
 $ git clone https://github.com/gpakosz/.tmux
 $ ln -sf .tmux/.tmux.conf
 $ ln -sf .configs/.tmux.conf.local

About this **tmux** features:

* **Prefix** set to *Ctrl a*
* Disable/enable mouse *prefix m* (disabled by default)
* Copy *prefix [Enter]* (mouse must be disabled),
  select text using mouse, then press *Ctrl c*
* Reload **thux** configuration *prefix r*.

Lorem Ipsum generator
---------------------

Lorem Ipsum generates random paragraphs or sentences

.. code-block:: shell-session

 $ cd
 $ ln -sf ~/.configs/bash/lorem .local/bin/
 $ lorem p 3  # prints three paragraphs to stdout
 $ lorem s 4  # prints four sentencies to stdout

In **vim** use *:r!lorem p 3*

Using vim as an IDE
-------------------

.. code-block:: shell-session

 $ cd
 $ pip install pyflakes pep8 pylint ipython  # installing packages
 $ git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim

Run run **vim** and perform **:PluginInstall** command
