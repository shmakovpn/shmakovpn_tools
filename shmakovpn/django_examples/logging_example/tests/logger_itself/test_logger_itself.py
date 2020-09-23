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
from itertools import product
from django.test import TestCase, override_settings
from unittest.mock import MagicMock, patch, call
from unittest_dataprovider import data_provider
from django.conf import settings

# I put this string in order to make **override_settings(LOGGING=...)*** works.
# Because it is not enough to use only **override_settings(LOGGING=...)**,
# if you want to change the logging settings in your test cases.
from django.utils.log import configure_logging

# type hints
from typing import List, Tuple, Dict

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

    @staticmethod
    def get_logging_configuration(
            debug_status: DebugStatus,
            log_level: LoggingLevel,
    ):
        """
        Creates a logging configuration for a Django project
        """
        return {
            'version': 1,
            'disable_existing_loggers': False,
            'formatters': {
                'formatter1': {
                    'format': ' -> {levelname} {asctime} {module} {process:d} {thread:d} {message}',
                    'style': '{',
                },
                'formatter2': {
                    'format': f'debug={debug_status} log_level={logging.getLevelName(log_level)} ' + '{message}',
                    'style': '{',
                }
            },
            'handlers': {
                'stream': {
                    'level': logging.getLevelName(log_level),
                    'class': 'logging.StreamHandler',
                    'formatter': 'formatter1',
                },
                'stream_header': {
                    'level': 'DEBUG',
                    'class': 'logging.StreamHandler',
                    'formatter': 'formatter2',
                }
            },
            'loggers': {
                __name__: {
                    'handlers': ['stream'],
                    'level': logging.getLevelName(log_level),
                    'propogate': True,
                },
                f'header_{__name__}': {
                    'handlers': ['stream_header'],
                    'level': 'DEBUG',
                    'propogare': True,
                }
            },
        }

    @data_provider(data)
    @patch(
        target='sys.stderr',
        wraps=sys.stderr,  # wraps all of sys.stderr
    )
    def test_logger_itself(
            self,
            debug_status: DebugStatus,
            log_level: LoggingLevel,
            mocked_stderr: MagicMock,
    ) -> None:
        with override_settings(
                DEBUG=debug_status,
                LOGGING=TestLoggerItself.get_logging_configuration(
                    debug_status,
                    log_level,
                ),
        ):
            configure_logging(settings.LOGGING_CONFIG, settings.LOGGING)  # really change logging settings
            logger_header: logging.Logger = logging.getLogger(f'header_{__name__}')
            logger_header.debug(f'')  # write *header* to stderr
            mocked_stderr.reset_mock()  # the test doesn't start yet, resetting the mock object
            logger: logging.Logger = logging.getLogger(__name__)
            level: LoggingLevel  # type hints
            for level in LOGGING_LEVELS:
                logger.log(level, f'hello "{logging.getLevelName(log_level)}"')
                if level >= log_level:
                    self.assertTrue(mocked_stderr.method_calls)
                else:
                    self.assertFalse(mocked_stderr.method_calls)
                mocked_stderr.reset_mock()
        configure_logging(settings.LOGGING_CONFIG, settings.LOGGING)  # return to the native settings back
