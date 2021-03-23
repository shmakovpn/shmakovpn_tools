#!/bin/bash
# Author: shmakovpn <shmakovpn@yandex.ru>
# Date: 2021-03-11

search_arg="$1"

process_fname() {
    while read fname; do
        if grep -q "${search_arg}" "${fname}"; then
            echo "$fname"
            grep "${search_arg}" "${fname}" | sed -re 's/^/  /' | grep "${search_arg}"
        fi
    done
}

find . | grep -P '\.html$' | process_fname
