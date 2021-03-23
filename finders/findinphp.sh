#!/bin/bash
# Author: shmakovpn <shmakovpn@yandex.ru>
# Date: 2021-03-11

search_arg="$1"

process_file() {
    while read fname; do
        if grep -q "${search_arg}" "${fname}"; then
            echo "$fname"
            grep "${search_arg}" "${fname}" | sed -re 's/^/  /' | grep "${fname}"
        fi
    done
}

find . | grep -P '\.php$' | process_file
