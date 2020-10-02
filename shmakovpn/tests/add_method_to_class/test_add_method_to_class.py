"""
The simple example that explains the impossibility of adding a method to builtin type.

Author: shmakovpn <shmakovpn@yandex.ru>

Date: 2020-10-01
"""
import unittest


class TestAddMethodToClass(unittest.TestCase):
    """
    It is possible to add a method to a class outside of the class
    """
    def test_add_method_to_class(self):
        class A:
            x = 'hello'

        a = A()
        A.get_x = lambda self: self.x

        self.assertEqual(a.get_x(), 'hello')

    def test_add_method_to_list(self):
        """
        It is impossible to add a method to a built-in type
        :return:
        """
        try:
            list.hello = lambda self: f'hello from list'
            some_list = []
            self.assertEqual(some_list.hello(), 'hello from list')
        except TypeError as e:
            pass
        except Exception as e:
            self.assertTrue(False, msg='An unknown exception was raised instead of the expected TypeError')
        else:
            self.assertTrue(False, msg='The expected TypeError exception was not raised')
