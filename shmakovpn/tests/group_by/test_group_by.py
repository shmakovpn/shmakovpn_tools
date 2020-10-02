"""
*shmakovpn_tools/shmakovpn/tests/group_by/test_group_by.py*

Python groupby examnples.

Author: shmakovpn <shmakovpn@yandex.ru>

Date: 2020-09-30

"""
import unittest
from operator import add
from itertools import groupby
from functools import reduce
# type hints
from typing import List, Dict, Any


class TestGroupBy(unittest.TestCase):
    """
    This class contains tests of different variants of **groupby**
    """

    data2: List[Dict[str, Any]] = [
        {'name': 'alex', 'score': 2, },
        {'name': 'john', 'score': 4, },
        {'name': 'dan', 'score': 1, },
        {'name': 'alex', 'score': 6, },
        {'name': 'dan', 'score': 3, },
    ]
    """ the dataset for tests"""

    def test_sorted(self) -> None:
        """
        Tests builtin function **sorted**
        """
        self.assertEqual(
            sorted(self.data2, key=lambda row: row['name']),  # sorted data2 by name
            [
                {'name': 'alex', 'score': 2},
                {'name': 'alex', 'score': 6},
                {'name': 'dan', 'score': 1},
                {'name': 'dan', 'score': 3},
                {'name': 'john', 'score': 4},
            ]
        )

    def test_group_by_itertools_sorted(self) -> None:
        """
        Tests **itertools.groupby** on sorted dataset.

        This test figures out that **itertools.groupby** really works on the sorted dataset
        """
        keys = []
        groups = []
        for key, group in groupby(
                sorted(self.data2, key=lambda row: row['name']),
                key=lambda row: row['name'],
        ):
            keys.append(key)
            groups.append(list(group))
        self.assertEqual(
            keys,
            ['alex', 'dan', 'john']
        )
        self.assertEqual(
            groups,
            [
                [
                    {'name': 'alex', 'score': 2},
                    {'name': 'alex', 'score': 6},
                ],
                [
                    {'name': 'dan', 'score': 1},
                    {'name': 'dan', 'score': 3},
                ],
                [
                    {'name': 'john', 'score': 4},
                ]
            ]
        )

    def test_group_by_itertools_unsorted(self) -> None:
        """
        Tests **itertools.groupby** on unsorted dataset.

        This test figures out that **itertools.groupby** doesn't work on the sorted dataset
        """
        keys = []
        groups = []
        for key, group in groupby(
                self.data2,
                key=lambda row: row['name'],
        ):
            keys.append(key)
            groups.append(list(group))
        self.assertEqual(
            keys,
            ['alex', 'john', 'dan', 'alex', 'dan']
        )
        self.assertEqual(
            groups,
            [
                [{'name': 'alex', 'score': 2, }, ],
                [{'name': 'john', 'score': 4, }, ],
                [{'name': 'dan', 'score': 1, }, ],
                [{'name': 'alex', 'score': 6, }, ],
                [{'name': 'dan', 'score': 3, }, ],
            ]
        )

    def test_group_by_declarative(self) -> None:
        """
        The simple **groupby** realization using a declarative approach
        """
        result = {}
        for row in self.data2:
            key = row['name']
            group = result.pop(key, [])
            group.append(row['score'])
            result[key] = group
        self.assertEqual(
            result, {
                'john': [4],
                'alex': [2, 6],
                'dan': [1, 3],
            }
        )
        self.assertEqual(
            list(
                map(
                    lambda key: {'name': key, 'sum': reduce(add, result[key])},
                    result,
                )
            ),
            [
                {'name': 'john', 'sum': 4},
                {'name': 'alex', 'sum': 8},
                {'name': 'dan', 'sum': 4},
            ]
        )

    def test_group_by_declarative2(self) -> None:
        """
        The simple **groupby** realization using a declarative approach
        """
        result = {}
        for row in self.data2:
            key = row['name']
            group = result.pop(key, [])
            group.append(row['score'])
            reduced = reduce(
                add,  # It is very easy to change the function
                group
            )
            result[key] = [reduced]
        print(result)

    def test_group_by_declarative3(self) -> None:
        """
        The simple **groupby** realization using a declarative approach
        """
        result = {}
        for row in self.data2:
            key = row['name']
            result[key] = result.get(key, 0) + row['score']  # 0 is the default value in the case of sum
        print(result)

    def test_group_by_functional1(self) -> None:
        """
        The simple **groupby** realization using a functional approach
        """
        groups = reduce(
            lambda a, b: dict(
                **{b['name']: a.pop(b['name'], []) + [b['score']]},
                **a,
            ),
            self.data2,
            {}
        )
        result = list(
            map(
                lambda key: {'name': key, 'sum': reduce(add, groups[key])},
                groups
            )
        )
        print(result)

    def test_group_by_functional2(self) -> None:
        """
        The simple **groupby** realization using a functional approach
        """
        print(
            reduce(
                lambda a, b: dict(
                    **{b['name']: [reduce(add, a.pop(b['name'], []) + [b['score']])]},
                    **a,
                ),
                self.data2,
                {}
            )
        )

