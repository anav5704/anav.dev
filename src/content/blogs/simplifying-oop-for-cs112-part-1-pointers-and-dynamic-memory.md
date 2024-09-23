---
title: "Simplifying OOP For CS112 Part 1: Pointers And Dynamic Memory."
description: "Learn how to use C++ pointers and dynamic memory allocation with code examples, activity questions and free solutions"
updatedAt: 2024-09-22T00:00:00+12:00
createdAt: 2024-09-24T00:00:00+12:00
---

## Introduction

---

CS112: Data Structures and Algorithms can appear to be a very difficult course. To some extent it is, but knowing the basics of object oriented programming will help you understand the harder concepts easily. This article will cover pointers and dynamic memory, which are key concepts that enable OOP. Each section will have an activity question for you to try. Attempting these will help you apply what you learn from this article. Free solutions for all of these will be provided.

## Pointers

---

Pointers, just like integers and stings, are a `Data Type`. The only difference is that instead of holding a value like `5` or `"my name"`, they hold memory addresses like `e29a07`. Pointer syntax looks like this:

```cpp
data_type *ptr_name = memory_address;
```

Once a pointer to a variable is created, you can also access and modify the value stored in the memory address the pointer points to. This is done by using the `Deference (*)`Operator. This process is called dereferencing.

```cpp
// Modify value
*ptr_name = new_value;

// Access value
cout << *ptr_name;
```

### Pointer To Primitives

---

The first way to get memory addresses is by using the `Reference (&)` Operator. It returns the memory address of a variable.

```cpp
// Integers
int integer = 5;
int integerPtr = &integer;
*integerPtr = 10;

// Booleans
bool boolean = true;
bool *booleanPtr = &boolean;
*booleanPtr = false;

// Characters
char character = 'A';
char characterPtr = &character;
*characterPtr  = 'B';
```

Activity question: write a program that asks the user to input 2 numbers. Store those numbers and create pointers that point to the numbers. Add the numbers using the pointers and display the sum to the user. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/pointer-to-primitives.cpp).

### Pointer To Arrays

---

Similarly, we can create pointers that point to arrays. Note that the pointer will point to the memory address of the first element of the array.

```cpp
int array = {12, 34, 56, 78, 90};
int *arrayPtr = array; // This is the same as: int *array = &array[0];
```

Dereferencing array elements works a bit differently. You will have to first move to the index you want to access the value of before dereferencing.

```cpp
cout << *(arrayPtr + 0); // Output: 12
cout << *(arrayPtr + 1); // Output: 34
cout << *(arrayPtr + 2); // Output: 56
```

As seen above, `arrayPtr + 1` moves the pointer to the first index (second position) and then `*( )` dereferences it. Alternatively, you can use the array pointer as if it were are normal array:

```cpp
cout << arrayPtr[0]; // Output: 12
cout << arrayPtr[1]; // Output: 34
cout << arrayPtr[2]; // Output: 56
```

Activity question: create an array of 5 integers. Create a pointer that points to that array. Use a for-loop and the pointer to print all elements. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/pointer-to-arrays.cpp).

### Pointer To Pointers

---

Since a pointer is just a variable, we can make another pointer that points to it. All we have to do is create a pointer with two asterisks instead of one.

```cpp
int number = 10;
int *numberPtr = &number;
int **numberPtrPtr = &numberPtr;
```

To dereference a pointer to another pointer, we simply use two asterisks.

```cpp
cout << *numberPtr; // Output: 10
cout << *numberPtrPtr // Output: memory address of numberPtr
cout << **numberPtrPtr // Output: 10
```

Activity question: modify the sum program from the [pointer to primitives](#pointer-to-primitives) section. Create 2 new pointers that point to the existing pointers. Use these new pointers to calculate the sum. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/pointer-to-pointers.cpp).

### Pointers And Functions

---

Functions can accept pointers as parameters, just like normal variables.

```cpp
int calculateSum(int *num1, int *num2) {
    int sum = 0;

    // Add num1 and num2 after dereferencing them
    sum = *num1 + *num2;

    return sum;
}
```

When calling this function inside of `main()`, you can either pass pointers to integer variables, or the variables with the `Reference (&)` operator.

```cpp
int num1 = 3, num2 = 2, sum = 0;

int *num1Ptr = &num1;
int *num2ptr = &num2;

// Using pointers
sum = calculateSum(num1Ptr, num2Ptr);

// Using variables with reference (&) operator
sum = calculateSum(&num1, &num2);
```

You can also create [pointers to functions](https://www.geeksforgeeks.org/function-pointer-in-cpp/), and [functions that return pointers](https://www.geeksforgeeks.org/how-to-return-a-pointer-from-a-function-in-cpp/). Although, CS112 does not cover these so they wont be explained here.

Activity question: make a calculator program using pointers. Ask the user to enter 2 numbers. Store them in variables and create pointers that point to them. Calculate and print the sum, difference, product and quotient using functions that take the 2 integer pointers as parameters. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/pointers-and-functions.cpp).

## Dynamic Memory

---

Dynamic memory allocation and de-allocation allows us to manipulate memory during runtime (when the program is being used by a user). The 2 words that enable dynamic memory are `new` and `delete`. The `new` keyword is used to allocate memory, while the `delete` keyword is used to de-allocate memory. Dynamic memory only works with pointers.

### Dynamic Primitives

---

Primitive data types are kind of like functions. The first way to create them is to call them with no parameter and assign a value later.

```cpp
// No initial value
int *numberPtr = new int;
char *characterPtr = new char;

// Dereference to set value
*numberPtr = 5;
*characterPtr = 'B';

delete  numberPtr;
delete characterPtr;
```

The second way is to call them with a parameter to set the initial value.

```cpp
//  Provide initial value
int *numberPtr = new int(5);
int *characterPtr = new char('A');

delete  numberPtr;
delete characterPtr;
```

Activity question: modify the program made in the [pointers to primitives](#pointer-to-primitives) section. Instead of having pointers point to static integers, point them to dynamic integers. Do not forget to de-allocate memory. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/dynamic-primitives.cpp).

### Dynamic Arrays

---

The creation of dynamic arrays works the same as for primitives, except you cannot initialize values when declaring it. Values must be set afterwards.

```cpp
// Create pointer to an array with a size of 2
int *arrayPtr = new int[2];

// Set values
arrayPtr[0] = 5;
arrayPtr[1] = 10;
```

The syntax for array de-allocation is a bit different. Square brackets `[]` will be added after the `delete` keyword.

```cpp
delete[] arrayPtr;
```

Activity question: modify the program made in the [pointer to arrays](#pointer-to-arrays) section. The pointer that was pointing to the static array should now point to a dynamic array. Use this pointer to set and print the initial values. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/dynamic-arrays.cpp).

### Array Resizing

---

Static arrays have a fixed size throughout the programs life (determined at compile time). This is also case the for dynamic arrays. But, since the allocation and de-allocation of dynamic variables happen during runtime, we can do a fake array resize on demand. This fake resize is done by:

-   Allocating memory for a new array.
-   Moving elements from old array to a new array.
-   De-allocating memory for the old array.

```cpp
int oldArraySize = 5;
int newArraySize = 10;

int *oldArrayPtr = new int[oldArraySize];

// Fill oldArrayPtr with random numbers...

// Allocate memory for a new array
int *newArrayPtr = new int[newArraySize];

// Transfer elements from the old array to the new array
for(int i = 0;i < oldArraySize; i++l) {
    newArrayPtr[i] = newArrayPtr[i];
}

// De-allocate memory for the old array
delete[] oldArrayPtr;
```

Activity question: write a program that resizes an array based on user input. Create a dynamic array of size 5 and fill it random numbers. Ask the user to input a value more than 5. Resize the array to the size of what the user entered and fill the new elements with random numbers. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/array-resizing.cpp).

### Dangling Pointers

---

Dangling pointers occur when you try to access a memory block that has already been de-allocated. The memory block that is being access could be take up by another part of the program. This can lead to memory leaks and unexpected behavior such as program crashes.

```cpp
int *numberPtr = new int(5);

// De-allocate memory
delete numberPtr;

// Trying to modify value at de-allocated memory block
*numberPtr = 10;
```

We can solve the dangling pointer issue by simply setting the value of the pointer to `NULL`. This ensures the pointer is not pointing to anything.

```cpp
int *numberPtr = new int(5);

// De-allocate memory
delete numberPtr;

// Set value to null
numberPtr = NULL;

// This works too
numberPtr = nullptr;
```

Activity question: go back to all of the previous dynamic memory activity questions and take care of all dangling pointers. [Solution](https://github.com/anav5704/simplifying-oop-for-CS112/blob/main/pointers-and-dynamic-memory/dangling-pointers.cpp).

## Conclusion

---

This guide went over the foundation of OOP, which is using pointers with dynamic memory. Understanding these will help you understand the OOP principles (encapsulation, inheritance and polymorphism) much better. I highly recommend attempting the activity questions before moving forward with the next parts. With that being said, I wish you best of luck for your object oriented programming journey!
