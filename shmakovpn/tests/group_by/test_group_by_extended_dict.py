import unittest
from shmakovpn.extend_builtins import ExtendedDict
from functools import reduce
from typing import List, Dict, Any


class TestGroupByExtendedDict(unittest.TestCase):
    """
    This class contains tests of **groupby** using **ExtendedDict**
    """
    data: List[Dict[str, Any]] = [
        {'name': 'alex', 'score': 2, },
        {'name': 'john', 'score': 4, },
        {'name': 'dan', 'score': 1, },
        {'name': 'alex', 'score': 6, },
        {'name': 'dan', 'score': 3, },
    ]
    """the dataset for tests"""

    def test_group_by_extended_dict(self):
        """
        Test for **groupby** that uses **ExtendedDict**
        """
        self.assertEqual(
            reduce(
                lambda a, b: a.return_updated(
                    **{b['name']: a.pop(b['name'], []) + [b['score']]}
                ),
                self.data,
                ExtendedDict(),  # use **ExtendedDict** as an accumulator
            ), {
                'john': [4],
                'alex': [2, 6],
                'dan': [1, 3],
            }
        )
