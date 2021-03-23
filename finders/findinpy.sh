#!/bin/bash
# Author: shmakovpn <shmakovpn@yandex.ru>
# Date: 2021-03-11

search_arg="$1"

process_pyfile() {
    while read pyfilename; do
        if grep -q "${search_arg}" "${pyfilename}"; then
            echo "$pyfilename"
            grep "${search_arg}" "${pyfilename}" | sed -re 's/^/  /' | grep "${search_arg}"
        fi
    done
}

find . | grep -P '\.py$' | process_pyfile
