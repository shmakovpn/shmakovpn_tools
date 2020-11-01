"""
shmakovpn_tools/typed_program.py

Author: shmakovpn <shmakovpn@yandex.ru>
Date: 2020-10-11
"""
from __future__ import annotations
from typing import Type, Optional, Any


class PropertyTypeError(TypeError):
    pass


class TypedProperty:
    def __init__(self, property_type: Type, default: Optional[Any] = None):
        self.type: Type = property_type
        self.value: property_type = default if default else property_type()

    def __get__(self, instance, owner):
        return self.value

    def __set__(self, instance, value):
        if not isinstance(value, self.type):
            raise PropertyTypeError(f'the type of the value is "{type(value)}", but a "{self.type}" is expected')
        self.value = value

    def __delete__(self, instance):
        raise AttributeError(f'the attribute cannot be removed')


def tp(property_type: Type, default: Optional[Any] = None):
    def decorator(func):
        # print(func.__annotations__)
        return TypedProperty(property_type, default)

    return decorator


class ReadonlyNotInitedError(ValueError):
    pass


class ReadonlyChangeError(AttributeError):
    pass


class ReadonlyRemoveError(AttributeError):
    pass


class ReadonlyProperty:
    def __init__(self):
        self.inited: bool = False
        self.value: Any = None

    def __get__(self, instance, owner):
        if not self.inited:
            raise ReadonlyNotInitedError('A value not inited')
        return self.value

    def __set__(self, instance, value):
        if self.inited:
            raise ReadonlyChangeError('Could not change a readonly property')
        self.value = value
        self.inited = True

    def __delete__(self, instance):
        raise ReadonlyRemoveError('A readonly property cannot be removed')


def ro():
    def decorator(func):
        # print(func.__annotations__)
        return ReadonlyProperty()

    return decorator


class Moo:
    @tp(str, 'something of x')
    def x(self) -> str: pass

    @ro()
    def y(self) -> str: pass


if __name__ == '__main__':
    moo = Moo()
    # play with typed
    print(f'moo.x={moo.x}')
    try:
        moo.x = 45
    except PropertyTypeError as e:
        print(e)
    try:
        del moo.x
    except AttributeError as e:
        print(e)
    moo.x = 'something x changed'
    print()
    # play with readonly
    try:
        print(moo.y)
    except ReadonlyNotInitedError as e:
        print(e)
    moo.y = 'Make America great'
    print(f'moo.y={moo.y}')
    try:
        moo.y = 'Make America great again'
    except ReadonlyChangeError as e:
        print(e)
    try:
        del moo.y
    except ReadonlyRemoveError as e:
        print(e)
