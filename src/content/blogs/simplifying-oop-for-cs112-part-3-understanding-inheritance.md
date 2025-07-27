---
title: "Simplifying OOP For CS112 Part 3: Understanding Inheritance."
description: "Learn how to use C++ inheritance and abstract classes with code examples, activity questions and free solutions"
createdAt: 2024-09-30T00:00:00+12:00
updatedAt: 2025-07-27T00:00:00+12:00
---

## Introduction

---

Object oriented programming in C++ is based on 3 core principles. These are: encapsulation, inheritance, and polymorphism. Inheritance is the ability for one class to borrow all attributes and methods from another class, and add its own. An example of this is a child inheriting features from its parents, while having its own characteristics. Inheritance helps us manage our code well by reducing code duplication and improving modularity. This article builds off what was covered in the [understanding encapsulation article](https://www.anav.dev/blogs/simplifying-oop-for-cs112-part-2-undersanding-encapsulation). Be sure to check that out before proceeding.

## Base And Derived Classes

---

In inheritance, the derived class (child) borrows attributes/methods from a base class (parent). An important thing to note is that while the child gets data from the parent, the parent is unaware of any children. This means base classes cannot access attributes/methods from derived classes. The following is the syntax for inheritance:

```cpp
class Derived: public Base {
    // attribute and methods
};
```

Let's implement a `Dog` class that inherits from an `Animal` class.

```cpp
class Animal {
    public:
        string name;

        // A default constructor is required
        Animal() {}

        void greet() {
            cout << "Hi, I'm " << name << endl;
        }
};

class Dog: public Animal {
    public:
        string breed;

        void bark() {
            cout << "Woof! Woof!" << endl;
        }
};
```

The `Dog` class can now be used in `main()` as follows:

```cpp
Dog *dogPtr = new Dog;

dogPtr->name = "Rufus";
dogPtr->breed = "Husky";

dogPtr->greet(); // Output: Hi, I'm Rufus
dogPtr->bark(); // Output: Woof! Woof!

delete dogPtr;
```

Activity question: create a program that has a `Person` class. This class will have a `name` and `age` attribute. Create a `Student` class that inherits from this class. The derived class should have a `printDetails()` method that prints the persons details. Using a `Student` pointer, set values for the attributes and print the students details in `main()`. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/inheritance/base-and-derived-class.cpp).

## Chaining Constructors

---

In inheritance, not all methods are passed down. Constructors and destructors are left out. But there are cases when you need to call the base constructor in the derived constructor. This can be done either by using the `scope resolution (::)` operator, or the constructor initializer list.

```cpp
class Animal {
    public:
        Animal() {
            cout << "Animal constructor" << endl;
        }

        ~Animal()  {
            cout << "Animal destructor" << endl;
        }
};

class Dog: public Animal {
    public:
        Dog()
            :Animal() // Either use constructor initializer list
        {
            Animal::Animal(); // Or use scope resolution (::) operator
            cout << "Dog constructor" << endl;
        }

        ~Dog() {
             cout << "Dog destructor" << endl;
        }
};
```

The output in `main()` would be as follows:

```cpp
Dog *dogPtr = new Dog;
// Output: Animal constructor
// Output: Dog constructor

delete dogPtr;
// Output:  Dog destructor
// Output: Animal destructor
```

Note how the `Animal` constructor is called first but the destructor is called last. And on the other hand, the `Dog` constructor is called later but the destructor is called earlier.

Activity question: modify the program made in the [base and derived classes](#base-and-derived-classes) section. Add a `studentId` attribute to the `Student` class. In addition to this, create default and parameterized constructors for both classes. Use the parameterized constructors to set values for the attributes, and make sure to call the base constructor in the derived constructor. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/inheritance/chaining-constructors.cpp).

## Access Specifiers

---

Until now, the examples used the `public:` access specifier. Class attributes and methods can also be marked as `protected:` and `private:`. These are used to specify which part of the program has access to a classes data.

**Public**: anyone can access the attribute/method.

**Protected**: the class itself and its children can access the attribute/method.

**Private**: only the class itself can access the attribute/method.

```cpp
class Animal {
    private:
        string breed;

    protected:
        int age;

    public:
        string name;

        void printDetails() {
            cout << "Breed: " << breed << endl; // Allowed
            cout << "Age: " << age << endl; // Allowed
            cout << "Name: " << name << endl; // Allowed
        }
};

class Dog: public Animal {
    public:
        void printDetails() {
            cout << "Breed: " << breed << endl; // Not allowed
            cout << "Age: " << age << endl; // Allowed
            cout << "Name: " << name << endl; // Allowed
        }
};
```

The only `Animal` attribute that can be accessed in `main()` is`name`.

```cpp
Animal *animalPtr = new Animal;

cout << animalPtr->breed; // Not allowed
cout << animalPtr->age; // Not allowed
cout << animalPtr->name; // Allowed

delete animalPtr;
```

Luckily, [getters and setters](http://www.anav.dev/blogs/simplifying-oop-for-cs112-part-2-undersanding-encapsulation#getters-and-setters) exist for this sole purpose. For each each attribute, it is recommended to create a getter and setter method.

```cpp
class Animal {
    private:
        string breed;

    protected:
        int age;

    public:
        string name;

        string getBreed() {
            return breed;
        }

        int getAge() {
            return age;
        }
};

class Dog: public Animal {
    public:
        void printDetails() {
            cout << "Breed: " << getBreed() << endl; // Allowed
            cout << "Age: " << age << endl; // Allowed
            cout << "Name: " << name << endl; // Allowed
        }
};
```

The updated usage in `main()` would be as follows:

```cpp
Animal *animalPtr = new Animal;

cout << animalPtr->getBreed(); // Allowed
cout << animalPtr->getAge(); // Allowed
cout << animalPtr->name; // Allowed

delete animalPtr;
```

Activity question: modify the program made in the [access specifiers](#access-specifiers) section. Add a `secret` attribute to the `Person` class. Use access specifiers to make the secret private, the age protected, and the name public. Create a `getSecret()` method in the `Person` class and modify the `printDetails()` method to make use of it. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/inheritance/access-specifiers.cpp).

## Conclusion

---

This guide went over what inheritance is and the various ways its internals can be implemented. Understanding inheritance will help in grasping the last OOP principle, as it is only achievable using classes with a inheritance relationship. I highly recommend attempting the activity questions before moving forward with the next parts. With that being said, I wish you best of luck for your object oriented programming journey!
