---
title: "Simplifying OOP For CS112 Part 4: Understanding Polymorphism."
description: "Learn how to use C++ compile time and runtime polymorphism with code examples, activity questions and free solutions"
createdAt: 2024-10-1T00:00:00+12:00
updatedAt: 2024-10-1T00:00:00+12:00
---

## Introduction

---

Object oriented programming in C++ is based on 3 core principles. These are: encapsulation, inheritance, and polymorphism. The principle covered in this article is polymorphism. The main idea is that one function definition can have various underlying implementations. Polymorphism helps programmers manage their code well by promoting reusability. This article builds off what was covered in the [understanding inheritance article](https://www.anav.dev/blogs/simplifying-oop-for-cs112-part-2-undersanding-inheritance). Be sure to check that out before proceeding.

## Compile Time Polymorphism

---

Also known as static polymorphism, compile time polymorphism is a type of polymorphism determined when the code is being compiled. This type of polymorphism is achieved by using by using function overloading and operator overloading. It tends to be much faster but less flexible than runtime polymorphism.

### Function Overloading

---

Function overloading is the process of defining multiple functions with the same name but different parameters. This allows different functions of the same name to be called based on the number of arguments passed.

```cpp
void helloWorld() {
    cout << "Hello world!" << endl;
}

void helloWorld(string name) {
    cout << "Hello world, I'm " << name << endl;
}
```

Both of these functions can be called in `main()` with no conflict.

```cpp
helloWorld(); // Output: Hello world!
helloWorld("Anav");  // Output: Hello world, I'm Anav
```

Activity question: create a program with a `Math` class. This class should have 3 `sum()` methods, each with one more parameter than the previous (2, 3 and 4). Create a `Math` object in `main()` and use all 3 methods. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/polymorphism/function-overloading.cpp).

### Operator Overloading

---

Operator overloading allows us to specify how an operator will behave when dealing with classes. The statement `1 + 1` is easily understood by the compiler as integers are a built in data type. On the other hand, something like `Bottle + Bottle` may cause some errors as `Bottle` is a user defined data type. Operator overloading help describe this behavior. The following is th syntax of a operator overloaded function:

```cpp
returnType operator <operator> (parameters) {}
```

This is what the implementation for `Bottle + Bottle` would look like:

```cpp
class Bottle {
    int water; // amount of water in ml

    Bottle operator+ (Bottle bottle) {
        Bottle temp;
        temp.water = this->water + bottle.water;
        return temp;
    }
}
```

The water in the bottles can then be added in `main()`.

```cpp
Bottle bottle1, bottle2, bottle3;

bottle1.water = 100;
bottle2.water = 200;

// This is like calling: bottle3 = bottle1.operator+(bottle2)
bottle3 = bottle1 + bottle2;

cout << bottlePtr3.water << endl; // Output: 300
```

Activity question: create a program with a `Phone` class. It should have an integer attribute `battery`, and 2 operator overloaded methods. The first method will overload the `+` operator and allow phone batteries to be added. The second method will overload the `++` operator and increment the phone battery by `10`. Use these methods in `main()`. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/polymorphism/operator-overloading.cpp).

## Runtime Polymorphism

---

Also known as dynamic polymorphism, compile time polymorphism is a type of polymorphism determined when the user is using the program. This type of polymorphism is achieved by using by using function overriding and virtual functions. It tends to be slower but much more flexible than compile time polymorphism.

### Function Overriding

---

Function overriding is the process of defining another function in the derived class with the same signature but different implementation. It allows derived classes to have their own version of the base class method.

```cpp
class Person {
    public:
        void greet() {
            cout << "Hey, I am a person" << endl;
        }
}

class Student: public Person {
    public:
        void greet() {
            cout << "Hey, I am a student" << endl;
        }
}
```

Just as with function overloading, both of these functions can be called in `main()` with no conflict.

```cpp
Person *personPtr = new Person();
Student *studentPtr = new Student();

personPtr->greet(); // Output: Hey, I am a person
studentPtr->greet(); // Output: Hey, I am a student

delete personPtr;
delete studentPtr;
```

Activity question: create a program with a `Animal` class, and a `Dog` class that inherits from it Both of these classes should have a `makeSound()` method that print different things. Create objects of each class in `main()` and call the methods. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/polymorphism/function-overriding.cpp).

### Virtual Functions

---

Virtual functions are the continuation of function overriding. It allows objects of a base class to call their overridden functions, while being stored in a variable of the base class data type. This is achieved by adding the `virtual` keyword to the function in the base class, which will be overridden in the derived class.

```cpp
class Person {
    public:
        virtual void greet() {
            cout << "Hey, I am a person" << endl;
        }
}

class Student: public Person {
    public:
        void greet() {
            cout << "Hey, I am a student" << endl;
        }
}
```

Both of these can now be called in `main()`.

```cpp
Person *personPtr = new Person();
// Storing Student pointer in Person variable
Person *studentPtr = new Student();

personPtr->greet(); // Output: Hey, I am a person
studentPtr->greet(); // Output: Hey, I am a student

delete personPtr;
delete studentPtr;
```

Activity question: modify the program made in the [function overriding](#function-overriding) section. The `makeSound()` method should now be a virtual function. Change the code in `main()` to only have objects of the `Animal` data type. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/polymorphism/virtual-functions.cpp).

### Pure Virtual Functions

---

These are a special type of function that have no implementations and are equated to `0`. A class that has at least one virtual functions becomes an abstract class. Objects of abstract classes cannot be created, they are only meant to be used as templates. They help ensure that derived classes have their own implementations of the pure virtual function.

```cpp
class Person {
    public:
        virtual void greet() = 0;
}

class Student: public Person {
    public:
        void greet() {
            cout << "Hey, I am a student" << endl;
        }
}
```

Since the `greet()` method in the `Person` class is a pure virtual function, the `Student` class also needs a `greet()` method. If this method does not exist, there will be a compile error when trying to create a `Student` object.

```cpp
// Person *personPtr = new Person(); Not allowed
Person *studentPtr = new Student();

// personPtr->greet(); // Not allowed
studentPtr->greet(); // Output: Hey, I am a student

delete studentPtr;
```

Activity question: modify the program made in the [virtual functions](#virtual-functions) section. The `makeSound()` method should now be a pure virtual function. Edit the code in `main()` to accommodate for this change. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/polymorphism/pure-virtual-functions.cpp).

## Conclusion

---

This guide went over what inheritance is and the various ways its internals can be implemented. Understanding inheritance will help in grasping the last OOP principle, as it is only achievable using classes with a inheritance relationship. I highly recommend attempting the activity questions before moving forward with the next parts. With that being said, I wish you best of luck for your object oriented programming journey!
