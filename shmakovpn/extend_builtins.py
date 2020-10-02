"""
Extending builtins

Author: shmakovpn <shmakovpn@yandex.ru>

Date: 2020-10-01
"""
import builtins
from contextlib import contextmanager
from typing import Type, ContextManager


class ExtendedDict(dict):
    """
    This class extends builtin **dict**.

    It adds:

     - **return_updated** method
    """
    def return_updated(self, *args, **kwargs):
        """
        Updates this dict, then return a reference to this.

        One can say that this approach violates some principles of clean architecture
        because the method changes the instance and return something not void.

        However, this method allows you to use dictionary updates sequentially in one line of code,
        as well as in lambda functions.

         .. code-block:: python

          the_extended_dict\\
              .return_updated({'key': 'value'})\\
              .return_updated({'foo', 'bar'})\\
              .do_something_else(...)

          reduce(
              lambda a, b: a.return_updated(b),
              my_data,
              ExtendedDict()
          )

        :param args: look at the documentation of **update**
        :param kwargs: look at the documentation of **update**
        :return: a reference to updated dict
        """
        self.update(*args, **kwargs)
        return self


@contextmanager
def extend_builtin(cls: Type) -> ContextManager[Type]:
    """
    The context manager that replaces the corresponding builtin type to a custom one

    :param cls: the custom type (it have to be a subclass of the corresponding built-in type)
    """
    original_type: Type = cls.__base__
    setattr(builtins, cls.__base__.__name__, cls)
    yield cls
    setattr(builtins, cls.__base__.__name__, original_type)


if __name__ == '__main__':
    print(f'before dict={dict}')  # <class 'dict'>
    with extend_builtin(ExtendedDict):
        print(f'with dict={dict}')  # <class '__main__.ExtendedDict'>
        d = dict()
        print(d.return_updated({'foo': 'bar'}))  # {'foo': 'bar'}
    print(f'after dict={dict}')  # <class 'dict'>


