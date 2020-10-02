How to extend a builtin type
============================

Please look at the example below.

.. literalinclude:: ../../../shmakovpn/tests/add_method_to_class/test_add_method_to_class.py
 :language: python

Let's write our own context manager that will replace the builtin type to an extended one.

 .. automodule:: extend_builtins
  :members:

**extend_builtin** context manager usage example.

.. code-block:: python

 if __name__ == '__main__':
     print(f'before dict={dict}')  # <class 'dict'>
     with extend_builtin(ExtendedDict):
         print(f'with dict={dict}')  # <class '__main__.ExtendedDict'>
         d = dict()
         print(d.return_updated({'foo': 'bar'}))  # {'foo': 'bar'}
     print(f'after dict={dict}')  # <class 'dict'>

Using **ExtendedDict** with **lambda** functions

.. literalinclude:: ../../../shmakovpn/tests/group_by/test_group_by_extended_dict.py
 :language: python
