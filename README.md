# shmakovpn_tools

## History
```shell
PACKAGE_NAME=shmakovpn
PROJECT_NAME=${PACKAGE_NAME}_tools
PROJECT_DIR=~/${PROJECT_NAME}
mkvirtualenv shmakovpn -p /usr/bin/python3.6
mkdir $PROJECT_DIR
cd $PROJECT_DIR
touch README.md

# configuring .gitignore
touch .gitignore
echo '# IDEs' >> .gitignore
echo '.idea/' >> .gitignore
echo '' >> .gitignore
echo '# python' >> .gitignore
echo '*.pyc' >> .gitignore
echo '__pychache__/' >> .gitignore
echo '*.egg-info/' >> .gitignore
echo '.eggs/' >> .gitignore
echo '' >> .gitignore
echo '# Django' >> .gitignore
echo 'migrations/' >> .gitignore
echo 'db.sqlite3' >> .gitignore
echo 'settings.py' >> .gitignore
echo 'manage.py' >> .gitignore
echo '' >> .gitignore
echo '# virtualenv' >> .gitignore
echo 'venv/' >> .gitignore
echo '' >> .gitignore
echo '# sphinx' >> .gitignore
echo 'docs/build/html/' >> .gitignore
echo 'docs/build/doctrees/' >> .gitignore
echo '_build/' >> .gitignore
echo '_static/' >> .gitignore
echo '_templates/' >> .gitignore
echo '' >> .gitignore
echo '# codecov' >> .gitignore
echo '.coverage' >> .gitignore
echo '' >> .gitignore
echo '# pytest' >> .gitignore
echo '.pytest_cache/' >> .gitignore
echo '' >> .gitignore
echo '# vim swp' >> .gitignore
echo '*.swp' >> .gitignore
echo '' >> .gitignore
echo '# pytest cache' >> .gitignore
echo '.pytest_cache/' >> .gitignore


# conguring requirements.txt
touch requirements.txt
## turning vim to IDE
echo 'pyflakes' >> requirements.txt
echo 'pep8' >> requirements.txt
echo 'pylint' >> requirements.txt
echo 'ipython' >> requirements.txt
## sphinx
echo 'sphinx' >> requirements.txt
echo 'sphinx-rtd-theme' >> requirements.txt
## shmakovpn whatprovides
echo 'whatprovides' >> requirements.txt

# installing packages
pip install --upgrade pip
pip install -r requirements.txt

# configuring travis-ci
touch .travis.yml
echo 'language: python' >> .travis.yml
echo 'sudo: false' >> .travis.yml
echo 'jobs:' >> .travis.yml
echo '  include:' >> .travis.yml
echo '    - name: "Python 3.6 on Linux"' >> .travis.yml
echo '      python: "3.6"' >> .travis.yml
echo '    - name: "Python 3.7 on Linux"' >> .travis.yml
echo '      python: "3.7"' >> .travis.yml
echo '    - name: "Python 3.8 on Linux"' >> .travis.yml
echo '      python: "3.8"' >> .travis.yml
echo '    - name: "Python 3.8.0 on Windows"' >> .travis.yml
echo '      os: windows' >> .travis.yml
echo '      language: shell' >> .travis.yml
echo '      before_install:' >> .travis.yml
echo '        - choco install python --version 3.8.0' >> .travis.yml
echo '        - python -m pip install --upgrade pip' >> .travis.yml
echo '      env: PATH=/c/Python38:/c/Python38/Scripts:$PATH' >> .travis.yml
echo 'install:' >> .travis.yml
echo '  - pip install -r requirements.txt' >> .travis.yml
echo '  - pip install codecov' >> .travis.yml
echo '  - pip install pytest-cov' >> .travis.yml
echo "script: coverage run -m pytest $PACKAGE_NAME/tests.py" >> .travis.yml
echo 'after_success:' >> .travis.yml
echo '  - codecov' >> .travis.yml

# creating folders and files
mkdir $PACKAGE_NAME
touch $PACKAGE_NAME/__init__.py  # we will stay this file empty
touch $PACKAGE_NAME/version.py
echo "VERSION: str = '1.1'" >> $PACKAGE_NAME/version.py

# sphinx quick start
sphinx-quickstart -q -p $PROJECT_NAME -a shmakovpn -v $(cat $PACKAGE_NAME/version.py | grep 'VERSION' | sed -re 's/^[^=]*=\s*([^ #]*).*$/\1/') -r $(cat $PACKAGE_NAME/version.py | grep 'VERSION' | sed -re 's/^[^=]*=\s* ([^ #]*).*$/\1/') -l en --ext-autodoc --ext-intersphinx --ext-viewcode --ext-todo




```

