---
title: "Random Forests"
description: "My review of Leo Breiman's foundational paper introducing ensemble learning with randomized decision trees."
category: "AI Research"
date: "2026-06-21"
slug: "random-forest"
---

# Random Forests

**Author:** Leo Breiman

**Published:** 2001

**Date Read:** June 2026

## Overview

This paper introduced **Random Forests**, one of the most influential machine learning algorithms for classification and regression tasks. Leo Breiman proposed that instead of relying on a single decision tree, we should train a large collection of decision trees using randomness and let them vote together to make the final prediction.

The paper explains that a single decision tree often suffers from high variance and can easily overfit the training data. Random Forest solves this problem by combining many trees, each trained on a different random subset of the training data and a random subset of features. Because every tree learns something slightly different, their combined prediction becomes much more accurate and stable.

Breiman also develops the mathematical theory behind Random Forests, proving that as the number of trees increases, the model converges instead of overfitting. He shows that the performance of a Random Forest mainly depends on two factors:

* The strength of the individual trees.
* The correlation between the trees.

The ideal Random Forest has **strong trees with low correlation**, meaning each tree is accurate but makes different mistakes from the others.

The paper also introduces several practical ideas such as Out-of-Bag (OOB) error estimation, variable importance, feature randomness, robustness to noisy data, and the extension of Random Forests to regression problems.

Overall, this paper established Random Forests as one of the most reliable, accurate, and widely used ensemble learning algorithms in machine learning.

---

# Things I Learned

## 1. A Forest Is Better Than One Tree

Instead of trusting a single decision tree, Random Forest combines hundreds or thousands of trees. Every tree votes for the final prediction, making the model much more reliable.

---

## 2. Bagging Creates Diversity

Each tree is trained on a different bootstrap sample created by sampling the training data with replacement.

This allows every tree to learn slightly different patterns, reducing variance and improving generalization.

---

## 3. Random Feature Selection Reduces Correlation

At every split, the algorithm considers only a random subset of input features instead of all features.

This makes trees less similar to one another, lowering correlation while maintaining strong predictions.

---

## 4. Strong Trees + Low Correlation = Better Forest

The paper proves that Random Forest performance depends on two important properties:

* Strong individual trees.
* Low correlation between trees.

The lower the correlation and the stronger the trees, the lower the prediction error.

---

## 5. Random Forest Does Not Overfit Easily

One of the most important theoretical results in the paper is that adding more trees does not cause overfitting.

Instead, the generalization error converges to a stable value as more trees are added.

---

## 6. Out-of-Bag (OOB) Error Is a Built-in Validation Method

Since every bootstrap sample leaves out roughly one-third of the training data, those unused samples can be used to estimate the model's accuracy.

This removes the need for a separate validation dataset in many situations.

---

## 7. Variable Importance Can Be Measured

Random Forest can estimate how important each feature is by randomly shuffling one feature and measuring how much the prediction accuracy decreases.

A large decrease means that feature is important.

---

## 8. Random Forest Is Robust to Noise

Unlike AdaBoost, which focuses more and more on misclassified examples, Random Forest treats all training samples more equally.

Because of this, it performs much better when the training data contains incorrect labels or noisy examples.

---

## 9. Random Forest Works for Both Classification and Regression

Although most examples focus on classification, the same idea can also be used for regression by averaging predictions instead of voting.

---

## 10. Simplicity Can Beat Complexity

Instead of building one complicated decision tree, combining many simple randomized trees often produces better accuracy and more stable predictions.

---

# Important Concepts

* Decision Tree
* Ensemble Learning
* Bagging (Bootstrap Aggregating)
* Bootstrap Sampling
* Random Feature Selection
* Majority Voting
* Out-of-Bag (OOB) Error
* Variable Importance
* Strength of Trees
* Correlation Between Trees
* Classification
* Regression
* Generalization Error
* Overfitting
* Noise Robustness

---

# My Biggest Takeaway

The biggest lesson I learned from this paper is that machine learning models do not always become better by making them more complicated. Instead, combining many simple models with enough randomness can produce a system that is both highly accurate and highly reliable.

Random Forest demonstrates the power of ensemble learning. It reduces variance, avoids overfitting, handles noisy data well, estimates feature importance automatically, and performs strongly across many real-world machine learning problems. Even after more than two decades, it remains one of the most practical and widely used algorithms in data science.

---

# Questions for Further Study

* Why does Random Forest outperform a single Decision Tree?
* How does Random Forest compare with Gradient Boosting and XGBoost?
* What is the difference between Bagging and Boosting?
* How is feature importance calculated in modern Random Forest implementations?
* Why do Random Forests struggle with very high-dimensional sparse datasets compared to deep learning models?
