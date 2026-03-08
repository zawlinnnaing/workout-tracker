# Product Spec: Workout Routine Tracker (Mobile App)

- [Product Spec: Workout Routine Tracker (Mobile App)](#product-spec-workout-routine-tracker-mobile-app)
- [1. Product Summary](#1-product-summary)
- [2. Core Concepts](#2-core-concepts)
  - [Workout](#workout)
  - [Exercise](#exercise)
  - [Set](#set)
- [3. Core Features](#3-core-features)
  - [3.1 Workout Management](#31-workout-management)
  - [3.2 Exercise Management](#32-exercise-management)
  - [3.3 Set Management](#33-set-management)
- [3.4 Local Storage](#34-local-storage)
- [4. Screens](#4-screens)
  - [Home Screen](#home-screen)
  - [Workout Detail Screen](#workout-detail-screen)
- [5. Completion Logic](#5-completion-logic)
  - [Set Completion](#set-completion)
  - [Exercise Completion](#exercise-completion)
  - [Workout Completion](#workout-completion)
- [6. Restart Routine](#6-restart-routine)
- [7. UX Principles](#7-ux-principles)
- [8. Future Features](#8-future-features)

## 1. Product Summary

A simple mobile app that helps users track their workout routines. Users create workouts composed of exercises and sets. During a workout session, users check off sets as they complete them.

The product focuses on **speed and simplicity during workouts**, minimizing friction while exercising.

---

## 2. Core Concepts

### Workout

A workout is a routine the user performs in a session.

Examples

- Upper Body
- Leg Day
- Push Day

A workout contains a list of exercises.

Attributes

- name
- order
- completion state

---

### Exercise

An exercise is a movement within a workout.

Examples

- Bench Press
- Squat
- Pull Up

An exercise contains a list of sets.

Attributes

- name
- order
- completion state

---

### Set

A set represents one attempt of an exercise.

Examples

- 10 reps at 40 kg
- 12 reps bodyweight

Attributes

- reps (optional)
- weight (optional)
- completion state

Rules

- reps and weight are optional
- a set can still be completed even if both fields are empty

---

## 3. Core Features

### 3.1 Workout Management

Users can manage their workout routines.

Capabilities

- create workout
- edit workout name
- delete workout
- reorder workouts using drag and drop

---

### 3.2 Exercise Management

Users can manage exercises inside a workout.

Capabilities

- add exercise
- edit exercise name
- delete exercise
- reorder exercises

---

### 3.3 Set Management

Users define sets for each exercise.

Capabilities

- add set
- edit reps
- edit weight
- delete set

---

### 3.4 Local Storage

All user-created data is persisted to device local storage so it survives app restarts.

Scope

- workouts (name, order)
- exercises (name, order, parent workout)
- sets (reps, weight, parent exercise)
- completion state for workouts, exercises, and sets

Behavior

- data is loaded from storage on app launch
- any create, edit, delete, or reorder action is immediately written to storage
- completion state changes (set checked, restart routine) are immediately written to storage

Storage technology

- `AsyncStorage` via `@react-native-async-storage/async-storage`

---

## 4. Screens

### Home Screen

Displays a list of workouts only.

Example

Upper Body ☐
Leg Day ☐
Push Day ☐

User interactions

- tap workout to open it
- mark workout as complete
- reorder workouts
- restart routine button

---

### Workout Detail Screen

Displays exercises inside a selected workout.

Example

Bench Press ☐
 ☐ 10 reps 40kg
 ☐ 10 reps 40kg
 ☐ 8 reps 45kg

Pull Up ☐
 ☐ 10 reps
 ☐ 8 reps
 ☐ 6 reps

User interactions

- mark sets as completed
- mark exercise as completed
- view progress of the workout

---

## 5. Completion Logic

#### Set Completion

Users mark sets as completed as they finish them.

When all sets of an exercise are completed, the exercise is automatically completed.

---

#### Exercise Completion

Users may manually mark an exercise as completed.

When an exercise is completed manually, all of its sets are marked completed.

---

#### Workout Completion

When all exercises in a workout are completed, the workout is automatically completed.

Users may also manually mark the workout as completed.

---

## 6. Restart Routine

The app provides a **Restart Routine** button.

Purpose
Reset the routine so the user can perform it again.

Behavior

- all workouts become incomplete
- all exercises become incomplete
- all sets become incomplete

---

## 7. UX Principles

Design goals

- extremely fast to use during workouts
- minimal typing required
- large touch targets
- simple checklist interaction

Key design rule
The home screen must remain simple and only display workouts.

---

## 8. Future Features

Possible future improvements

Workout history
Allow users to review previous workout sessions.

Rest timer
Automatically start a rest timer after completing a set.

Progress tracking
Track strength progression over time.

Templates
Allow users to reuse routines or create variations.

Cloud sync
Sync routines across devices.
