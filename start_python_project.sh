#!/bin/bash
# This script creates a new python project (project template)
#
# Author: shmakovpn <shmakovpn@yandex.ru>
#
# Notes:
# ! This script does not init a new git repository
# 2020-08-04

PACKAGE_NAME=shmakovpn
PROJECT_NAME=${PACKAGE_NAME}_tools
PROJECT_DIR=~/${PROJECT_NAME}
DOCS_DIR=${PROJECT_DIR}/docs
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
echo '*.pyc' >> .gitignore  #* comment for vim highlight
echo '__pychache__/' >> .gitignore
echo '*.egg-info/' >> .gitignore  #* comment for vim hightlight
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
echo '*.swp' >> .gitignore  #* comment for vim highlight
echo '' >> .gitignore
echo '# pytest cache' >> .gitignore
echo '.pytest_cache/' >> .gitignore
echo '' >> .gitignore
echo '# build' >> .gitignore
echo 'build/' >> .gitignore
echo 'dist/' >> .gitignore



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
## twine (need for uploading package to PyPI)
echo 'twine' >> requirements.txt
## coverage
echo 'codecov' >> requirements.txt
echo 'pytest-cov' >> requirements.txt


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

# creating examle module
touch $PACKAGE_NAME/example.py
echo "def hello_world():" >> $PACKAGE_NAME/example.py
echo "    \"\"\"Prints **Hello World** to stdout\"\"\"" >> $PACKAGE_NAME/example.py
echo "    print('Hello World')" >> $PACKAGE_NAME/example.py

# reading version
VERSION=$(cat $PACKAGE_NAME/version.py | grep 'VERSION' | sed -re "s/^[^=]*=\s* '([^ #]*)'.*$/\1/")

# sphinx quick start
sphinx-quickstart -q -p $PROJECT_NAME -a shmakovpn -v $VERSION -r $VERSION -l en --ext-autodoc --ext-intersphinx --ext-viewcode --ext-todo --sep $DOCS_DIR
## change sphinx theme to sphinx_rtd_theme
sed -i $DOCS_DIR/source/conf.py -re "s/^html_theme = 'alabaster'/html_theme = 'sphinx_rtd_theme'/"
## change imports
sed -i $DOCS_DIR/source/conf.py -re "s/^# import os/import os/"
sed -i $DOCS_DIR/source/conf.py -re "s/^# import sys/import sys/"
## configuring sys.path
sed -i $DOCS_DIR/source/conf.py -re "s/^# sys\.path\.insert\(0, os\.path\.abspath\('\.'\)\)/PACKAGE: str='$PACKAGE_NAME'\nTEMP_LABEL1/"
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL1/SCRIPT_DIR: str = os.path.dirname(os.path.abspath(__file__))\nTEMP_LABEL2/"
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL2/DOCS_DIR: str = os.path.dirname(SCRIPT_DIR)\nTEMP_LABEL3/"
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL3/PROJECT_DIR: str = os.path.dirname(DOCS_DIR)\nTEMP_LABEL4/"
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL4/PACKAGE_DIR: str = os.path.join(PROJECT_DIR, PACKAGE)\nTEMP_LABEL5/"
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL5/sys.path.insert(0, PACKAGE_DIR)\nTEMP_LABEL6/"
## configuring version
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL6/VERSION: str = ''\nTEMP_LABEL7/"
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL7/with open(os.path.join(PACKAGE_DIR, 'version.py')) as version_file:\nTEMP_LABEL8/"
sed -i $DOCS_DIR/source/conf.py -re "s/^TEMP_LABEL8/    exec(version_file.read())\n\n/"
sed -i $DOCS_DIR/source/conf.py -re "s/^(version\s*=\s*).*/\1'$VERSION'/"  #* comment for vim highlight
sed -i $DOCS_DIR/source/conf.py -re "s/^(release\s*=\s*).*/\1'$VERSION'/" #* comment for vim hightlight

## creating contents.rst for readthedocs.io
touch $DOCS_DIR/source/contents.rst
echo ".. include:: index.rst" >> $DOCS_DIR/source/contents.rst

## creating introduction.rst
touch $DOCS_DIR/source/introduction.rst
echo "Introduction todo" >> $DOCS_DIR/source/introduction.rst

## adding introduction to index.rst
sed -i $DOCS_DIR/source/index.rst -re "s/^(\.\. toctree::)/.. include:: introduction.rst\n\n\1/"

## adding documentation (not package!) requirements
touch $DOCS_DIR/requirements.txt

## adding code documentation
touch $DOCS_DIR/source/code.rst
echo 'Code' >> $DOCS_DIR/source/code.rst
echo "====\n" >> $DOCS_DIR/source/code.rst
echo ".. automodule:: example" >> $DOCS_DIR/source/code.rst
echo ' :members:' >> $DOCS_DIR/source/code.rst

## adding code.rst to index.rst
sed -i $DOCS_DIR/source/index.rst -re 's/^(   :caption: Contents:)/\1\n\n   code/'

# adding license
touch LICENSE.txt
echo "Copyright $PACKAGE_NAME shmakovpn" >> LICENSE.txt
echo '
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
' >>  LICENSE.txt

# creating manifest
touch MANIFEST.in
echo 'include LICENSE.txt' >> MANIFEST.in
echo 'include setup.cfg' >> MANIFEST.in
echo 'include setup.py' >> MANIFEST.in
echo 'include makedoc.py' >> MANIFEST.in
echo 'include build_package.py' >> MANIFEST.in
echo '' >> MANIFEST.in
echo 'recursive-include test *' >> MANIFEST.in #* comment for vim highlight
echo 'recursive-include docs *' >> MANIFEST.in #* comment for vim highlight
echo '' >> MANIFEST.in
echo 'recursive-exclude docs/build *' >> MANIFEST.in  #* comment for vim highlight
echo 'recursive-exclude * __pycache__' >> MANIFEST.in  #* comment for vim highlight
echo 'recursive-exclude * *.py[co]' >> MANIFEST.in 
echo 'recursive-exclude .git *' >> MANIFEST.in  #* comment for vim highlight
echo 'recursive-exclude .idea *' >> MANIFEST.in  #* comment for vim highlight
echo 'recursive-exclude venv *' >> MANIFEST.in  #* comment for vim highlight

# creating setup.cfg
touch setup.cfg
echo '[build_sphinx]' >> setup.cfg
echo 'source-dir = docs/' >> setup.cfg
echo 'build-dir = docs/build' >> setup.cfg
echo 'all_files = 1' >> setup.cfg
echo '' >> setup.cfg
echo '[metadata]' >> setup.cfg
echo 'license_file = LICENSE.txt' >> setup.cfg

# creating setup.py
touch setup.py
echo "import os" >> setup.py
echo "from setuptools import setup, find_packages" >> setup.py
echo "from ${PACKAGE_NAME}.version import VERSION" >> setup.py
echo "" >> setup.py
echo "SCRIPT_DIR: str = os.path.dirname(os.path.abspath(__file__))" >> setup.py
echo "os.chdir(SCRIPT_DIR)" >> setup.py
echo "" >> setup.py
echo "with open('README.md') as f:" >> setup.py
echo "    long_description: str = f.read()" >> setup.py
echo "" >> setup.py
echo "setup(" >> setup.py
echo "    name='$PROJECT_NAME'," >> setup.py
echo "    version=VERSION," >> setup.py
echo "    packages=find_packages()," >> setup.py
echo "    author='shmakovpn'," >> setup.py
echo "    author_email='shmakovpn@yandex.ru'," >> setup.py
echo "    url='https://github.com/shmakovpn/$PROJECT_NAME'," >> setup.py
echo "    download_url='https://github.com/shmakovpn/$PROJECT_NAME/archive/%s.zip' % (VERSION, )," >> setup.py
echo "    long_description=long_description," >> setup.py
echo "    long_description_content_type='text/markdown'," >> setup.py
echo "    entry_points={" >> setup.py
#echo "        'console_scripts': ['$PACKAGE_NAME=$PACKAGE_NAME:main']," >> setup.py
echo "    }," >> setup.py
echo "    install_requires=[" >> setup.py
#echo "        'chardet'," >> setup.py
echo "    ]," >> setup.py
echo "    include_package_data=True," >> setup.py
echo "    test_suite='$PACKAGE_NAME.tests'," >> setup.py
echo "    python_requires='>=3.6'," >> setup.py
echo "    classifiers=[" >> setup.py
echo "        'Programming Language :: Python :: 3'," >> setup.py
#echo "        'Environment :: Console'," >> setup.py
echo "        'License :: OSI Approved :: Apache Software License'," >> setup.py
echo "        'Operating System :: OS Independent'," >> setup.py
echo "    ]," >> setup.py
echo ")" >> setup.py

# creating build_package.py, script that runs *python setup.py sdist bdist_wheel*
touch build_package.py
echo "import os" >> build_package.py
echo "SCRIPT_DIR: str = os.path.dirname(os.path.abspath(__file__))" >> build_package.py
echo "" >> build_package.py
echo "" >> build_package.py
echo "def run_build():" >> build_package.py
echo "    os.chdir(SCRIPT_DIR)" >> build_package.py
echo "    os.system('python setup.py test')" >> build_package.py
echo "    os.system('python setup.py sdist bdist_wheel')" >> build_package.py
echo "    print('__END__')" >> build_package.py
echo "" >> build_package.py
echo "" >> build_package.py
echo "if __name__ == '__main__':" >> build_package.py
echo "    run_build()" >> build_package.py

# creating makedoc.py, script that runs *sphinx-build*
touch makedoc.py
echo "import os" >> makedoc.py
echo "SCRIPT_DIR: str = os.path.dirname(os.path.abspath(__file__))" >> makedoc.py
echo "" >> makedoc.py
echo "" >> makedoc.py
echo "def run_sphinx():" >> makedoc.py
echo "    docs_dir: str = os.path.join(SCRIPT_DIR, 'docs')" >> makedoc.py
echo "    docs_source_dir: str = os.path.join(docs_dir, 'source')" >> makedoc.py
echo "    build_dir: str = os.path.join(docs_dir, 'build')" >> makedoc.py
echo "    html_dir: str = os.path.join(build_dir, 'html')" >> makedoc.py
echo "    os.system('sphinx-build -b html \"%s\" \"%s\"' % (docs_source_dir, html_dir))" >> makedoc.py
echo "    print('__END__')" >> makedoc.py
echo "" >> makedoc.py
echo "" >> makedoc.py
echo "if __name__ == '__main__':" >> makedoc.py
echo "    run_sphinx()" >> makedoc.py

# creating upload_pypi.py
touch upload_pypi.py
echo "import os" >> upload_pypi.py
echo "import subprocess" >> upload_pypi.py
echo "from typing import List" >> upload_pypi.py
echo "from ${PACKAGE_NAME}.version import VERSION" >> upload_pypi.py
echo "" >> upload_pypi.py
echo "SCRIPT_DIR: str = os.path.dirname(os.path.abspath(__file__))" >> upload_pypi.py
echo "" >> upload_pypi.py
echo "" >> upload_pypi.py
echo "def get_pip_config():" >> upload_pypi.py
echo "    process: subprocess.Popen = subprocess.Popen(" >> upload_pypi.py
echo "        ['pip', 'config', 'list', ], stdout=subprocess.PIPE, stderr=subprocess.PIPE" >> upload_pypi.py
echo "    )" >> upload_pypi.py
echo "    process.wait()" >> upload_pypi.py
echo "    if not process.returncode:" >> upload_pypi.py
echo "        if process.stdout.readable():" >> upload_pypi.py
echo "            return list(map(lambda x: x.decode().rstrip(), process.stdout.readlines()))" >> upload_pypi.py
echo "        else:" >> upload_pypi.py
echo "            return []  # pip configuration is empty" >> upload_pypi.py
echo "    else:" >> upload_pypi.py
echo "        if process.stdout.readable():" >> upload_pypi.py
echo "            print(process.stdout.read().decode())" >> upload_pypi.py
echo "        if process.stderr.readable():" >> upload_pypi.py
echo "            print(process.stderr.read().decode())" >> upload_pypi.py
echo "        exit(1)" >> upload_pypi.py
echo "" >> upload_pypi.py
echo "" >> upload_pypi.py
echo "def run_upload():" >> upload_pypi.py
echo "    pip_certs: List[str] = list(filter(lambda x: str(x).startswith('global.cert='), get_pip_config()))" >> upload_pypi.py
echo "    if pip_certs:" >> upload_pypi.py
echo "        pip_cert_arg: str = '--cert %s ' % (pip_certs[0].split('=')[1])" >> upload_pypi.py
echo "    else:" >> upload_pypi.py
echo "        pip_cert_arg: str = ''" >> upload_pypi.py
echo "    print(pip_cert_arg)" >> upload_pypi.py
echo "    dist_dir: str = os.path.join(SCRIPT_DIR, 'dist')" >> upload_pypi.py
echo "    dist_file: str = os.path.join(dist_dir, '${PROJECT_NAME}-%s.tar.gz' % (VERSION, ))" >> upload_pypi.py
echo "    dist_whls: str = os.path.join(dist_dir, '${PROJECT_NAME}-%s-*.whl' % (VERSION, ))" >> upload_pypi.py  #* comment for vim highlight
echo "    os.system('twine upload \"%s\" \"%s\" %s --verbose' % (dist_file, dist_whls, pip_cert_arg))" >> upload_pypi.py
echo "    print('__end__')" >> upload_pypi.py
echo "" >> upload_pypi.py
echo "" >> upload_pypi.py
echo "if __name__ == '__main__':" >> upload_pypi.py
echo "    run_upload()" >> upload_pypi.py

# creating tests.py
touch $PACKAGE_NAME/tests.py
echo "import unittest" >> $PACKAGE_NAME/tests.py
echo '' >> $PACKAGE_NAME/tests.py
echo '' >> $PACKAGE_NAME/tests.py
echo "class TestExample(unittest.TestCase):" >> $PACKAGE_NAME/tests.py
echo "    def test_example(self):" >> $PACKAGE_NAME/tests.py
echo "        self.assertTrue(True)" >> $PACKAGE_NAME/tests.py


