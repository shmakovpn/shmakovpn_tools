"""
shmakovpn_tools
 /shmakovpn
  /django_examples
   /logging_example
    /tests
     /logger_iftelf
      /test_logger_itself.py

Author: shmakovpn <shmakovpn@yandex.ru>
Date: 2020-09-18
"""
import sys
import logging
from typing import List, Tuple
from itertools import product
from django.test import TestCase, override_settings
from unittest.mock import MagicMock, patch
from unittest_dataprovider import data_provider
from django.conf import settings

#: define type for levels of logging
LoggingLevel = int

#: define type for statuses of debug
DebugStatus = bool

#: List of all possible debug statuses
DEBUG_STATUSES: List[DebugStatus] = [True, False, ]

#: List of all standard levels of logging
LOGGING_LEVELS: List[LoggingLevel] = [
    logging.DEBUG,
    logging.INFO,
    logging.WARNING,
    logging.ERROR,
    logging.CRITICAL,
]


class TestLoggerItself(TestCase):
    @staticmethod
    def data() -> List[Tuple[DebugStatus, LoggingLevel]]:
        """ Dataprovider for testing logger itself """
        return list(
            product(
                DEBUG_STATUSES,
                LOGGING_LEVELS,
            )
        )

    @data_provider(data)
    @patch(
        target='sys.stderr',
        spec=sys.stderr
    )
    def test_logger_itself(
        self,
        mocked_stderr: MagicMock,
        debug_status: DebugStatus,
        log_level: LoggingLevel
    ) -> None:
        with override_settings(
            DEBUG=debug_status,
            LOG_L=log_level,
        ):
            print(f'DEBUG={settings.DEBUG}, log_level={settings.LOG_L}')
            print(mocked_stderr)
