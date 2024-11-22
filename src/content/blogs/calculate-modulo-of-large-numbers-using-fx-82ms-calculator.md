---
title: Calculate Modulo Of Large Numbers Using fx-82MS Calculator.
description: Learn how to calculate the modulo or large numbers to solve Diffie-Hellman and RSA algorithm questions in cloud computing.
createdAt: 2024-11-18T00:00:00+12:00
updatedAt: 2024-11-18T00:00:00+12:00
---

## Introduction

---

Long story short, I got absolutely cooked by some encryption questions in my [CS219: Cloud Computing Quiz 2](https://drive.google.com/file/d/143koLXj4qHt24CO3Dk_8gdumALmVcx90/view?usp=sharing) a while back. Now I'm not the biggest fan of maths to begin with, but deep down, this failure did not feel like a skill issue. Turns out it wasn't. The questions required us to calculate the modulo of very large numbers, which is something the fx-82MS calculator wasn't built for. This article will go over the work-around for this issue, and hopefully, you don't end up losing marks like I did.

## Calculating Mod

---

Before getting to large numbers, its good to understand how the modulo of smaller numbers are calculated. Take the following question as an example:

```math
r = 5 ^ 2 \mod {9} 
```

The first step is to divide `26` by `10`. After we get the quotient, we remove the whole part and multiply it by the divisor.

```math
\displaylines
{
    25 \div 9 = 2.78  \\ 
    2.78 - 2 = 0.78   \\ 
    0.78 \cdot 9 = 7  \\ 
    r = 7
}
```

## The Mod Problem

---

The issue with this approach is that when using a fx-82MC calculator, you may not always get the correct quotient. The reason this issue occurs is due to the calculator rounding off or removing the extra precision from large divisions. Let's try out another question:

```math
r = 17 ^ 9 \mod 23
```

The quotient that you get when using the calculator will be a whole number. But in reality, the quotient has a precision of `6` decimal places.

```math
\displaylines
{
    17 ^ 9 \div 23 = 5155994630 \\
    17 ^ 9 \div 23 = 5155994630.304348
}
```

## The Mod Solution

---

Luckily, here is a relatively simple solution to this problem. The first step is to break down the dividend into smaller combination of base-powers.

```math
17 ^ 9 = 17 ^ 3 + 17 ^ 3 + 17 ^ 3 
```

Now we have to calculate the modulo each part and multiply it to the next until we get to the last part.

```math
\displaylines
{
17 ^ 3 \mod 23 = 14 \\
14 \cdot 17 ^ 3 \mod 23 = 12 \\
12 \cdot 17 ^ 3 \mod 23 = 7 \\
r = 7
}
```

## Practice Questions

---

These are the questions I was unable to get the correct answers for. Have a go and see if you can solve them. You can find the solutions [here](https://drive.google.com/file/d/1WZDuQAQYXFOIyE4P8IqdrPgZ4izAUvxW/view?usp=drive_link).

### Diffie-Hellman

---

Find the shared secret keys given a prime number `p = 23` and integer `g = 5`, value for `A = 7`, and `B = 9`.

###  Rivest-Shamir-Adleman

---

Encrypt the message `m = 30` given the two prime numbers `p = 3` and `q = 11`. Value of `e = 7`, Find the value of `d` and decrypt the cipher text.

## Final Thoughts

---

This article went over how to calculate the modulo of large numbers using a not so capable calculator. We broke our dividend into smaller parts and then did separate modulo calculations, multiplying the last remainder to the next. If you are still having trouble, just attempt similar questions and you'll eventually get better at it. Best of luck with your cloud computing journey!