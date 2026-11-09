# Overview

Citizenship Flashcards is a TypeScript console application for studying questions from the United States Citizenship Test. Users can study all available questions or choose a category, reveal answers, skip to the next flashcard, return to the main menu, or exit. The questions are loaded asynchronously from a JSON file, and the application is organized into separate layers for the console view, controller, quiz service, and data repository.

I created Citizenship Flashcards to help people study for the United States Citizenship Test in a simple and organized way. The application presents questions and answers as sequential flashcards, allowing users to reveal answers, skip questions, and choose a category to study. I also built this project to practice TypeScript and learn how to organize an application using classes and a layered architecture.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

I developed this application using Visual Studio Code, and used Git and GitHub to manage and store the project.

I wrote this application in TypeScript, a programming language built on JavaScript that adds static types. It runs on Node.js and uses Node’s built-in libraries for file access and terminal input. I also used JSON to store the flashcard questions. No additional programming languages or runtime libraries were needed.

# Useful Websites

- [Typescript Lang](https://www.typescriptlang.org/)
- [Next js](https://nextjs.org/docs/app/api-reference/config/typescript)

# Future Work

- Expand the questions.json file with more USCIS citizenship test questions.
- Add a feature to track and save user study score between sessions.
- Build a website version of the flashcard application so users can study in a web browser