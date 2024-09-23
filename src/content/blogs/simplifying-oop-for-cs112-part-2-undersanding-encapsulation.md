---
title: "Simplifying OOP For CS112 Part 2: Understanding Encapsulation."
description: "Learn how to use C++ classes and  objects (encapsulation) with code examples, activity questions and free solutions"
updatedAt: 2024-09-23T00:00:00+12:00
createdAt: 2024-09-24T00:00:00+12:00
---

## Introduction

---

Object oriented programming in C++ is based on 3 core principles. These are: encapsulation, inheritance, and polymorphism. Encapsulation is the grouping of related variables and functions into a single entity, while being separated from the outside world. An example of ths is an ATM machine. You can withdraw money and check your balance, but the important internal parts are hidden away. Encapsulation helps promote safe programming. This article builds off what was covered in the [pointers and dynamic memory article](https://anav.dev/blogs/simplifying-oop-for-cs112-part-1-pointers-and-dynamic-memory). Be sure to check that out before proceeding.

## Classes And Objects

---

Just like integers and strings, classes are a data type. The only difference is that classes are user-defined (you decide what it has). They act as templates for creating objects. Objects are variables that are created when you initialize classes. Take for example an `Integer` and a `Person` class.

```cpp
// int is the data type and x is the variable
int x;

// Person is the data type (class) and anav is the variable (object)
Person anav;
```

Classes can hold variables (attributes) and functions (methods).

```cpp
class Person {
    public:
        string name;

        void greet() {
            cout << "Hey, I'm " << name << endl;
        }
};
```

We can then create a `Person` object and access/modify its attributes or call its methods inside of `main()`. In order to get better at OOP, it is recommended that you use classes with pointers and dynamic memory.

```cpp
// Recall: int *numberPtr = new int;
Person *personPtr = new Person;

// Set value for name
personPtr->name = "Anav";
personPtr->greet(); // Output: Hi, I'm Anav

delete  personPtr;
```

Note that we use the `Member Access (->)` operator to access attributes and methods in the class. This operator only works with pointers.

Activity question: write a program that has a `Course` class. This class should have two attributes, `courseCode` and `courseName`. It should also have a `printDetails()` method to print the attributes. Create a `Course` object in `main()`, assign values, and print the course details. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/encapsulation/classes-and-objects.cpp).

## Constructors And Destructors

---

Constructors are special functions that run when an object is created. They are used to initialize variables and allocate memory. Destructors are also special functions, but that automatically run when an object is destroyed. They are used to perform clean up tasks like de-allocating memory. Rules for when creating constructors and destructors:

-   Must be of same name as class.
-   Does not have a return type.

```cpp
class Person {
    public:
        string name;

        Person(){
            cout << "Default constructor called " << endl;
        }

        Person(string name) {
            this->name = name;
            cout << "Parameterized constructor called" << endl;
        }

        ~Person(){
            cout << "Destructor called" << endl;
        }
};
```

In the parameterized constructor above, we use the `this` keyword to set the value for `name`. `this` is a pointer to the object it is inside, which is why we use the `Member Access (->)` operator with it. We can use the constructor in `main()` like this:

```cpp
Person *personPtr = new Person("Anav");
// Output: Parameterized constructor called

delete  personPtr;
// Output: Destructor called
```

Activity question: modify the program made in the [classes and objects](#classes-and-objects) section. Add a default constructor and destructor that prints a generic message. Add a parameterized constructor that sets the course code and name. Use the parameterized constructor in `main()`. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/encapsulation/constructors-and-destructors.cpp).

## Getters And Setters

---

In the code above, we are directly accessing the `name` variable. This is like breaking the ATM machine and grabbing the money. But in reality, the ATM machine itself gives you an option to withdraw money. This is what getters and setters do. They are functions that set and get the values of variables.

```cpp
class Person {
    public:
        string name;

        void setName(string name) {
            this-> name = name;
        }

        string getName() {
            return name;
        }

        void greet() {
            // Use getter to get name
            cout << "Hey, I'm " << getName() << endl;
        }
};
```

This can then be used in `main()` like this:

```cpp
Person *personPtr = new Person;

// Use setter to set name
personPtr->setName("Anav");
cout << personPtr->getName(); // Output: Anav
personPtr->greet(); // Output: Hi, I'm Anav

delete  personPtr;
```

Activity question: modify the program made in the [constructors and destructors](#getters-and-setters) section. Add getters and setters for each of the attributes. Use the getters in the `printDetails()` and the setters in `main()`. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/encapsulation/getters-and-setters.cpp).

## Scope Resolution

---

Scope resolution is a fancy way of telling the C++ compiler which function belongs to which class. Until now, the the class methods were written inside the class. As a project grows in size, the methods are usually put outside the class, even in another file. This is when we have to use the `Scope Resolution (::)` operator. The syntax is as follows:

```cpp
className::methodName
```

This means `methodName` is a method that belongs to the `className` class.

```cpp
class Person {
    public:
        string name;

        // Method prototypes
        Person();
        Person(string name);
        ~Person();
        void setName(string name);
        string getName();
        void greet();
};

// Actual implementation using scope resolution operator
Person::Person(){
    cout << "Default constructor called " << endl;
}

Person::Person(string name) {
    this->name = name;
    cout << "Parameterized constructor called" << endl;
}

Person::~Person(){
    cout << "Destructor called" << endl;
}

void Person::setName(string name) {
    this-> name = name;
}

string Person::getName() {
    return name;
}


void Person::greet() {
    cout << "Hey, I'm " << getName() << endl;
}
```

Activity question: refactor the program made in the [setters and getters](#getters-and-setters) section. Move all the implementation outside the class. The only thing remaining in the class should be the attributes and prototypes. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/encapsulation/scope-resolution.cpp).

## Conclusion

---

This guide went over what encapsulation is and the various things that can be done to achieve it. Understanding encapsulation will help in grasping the other two OOP principles as they extend everything mentioned above. I highly recommend attempting the activity questions before moving forward with the next parts. With that being said, I wish you best of luck for your object oriented programming journey!
