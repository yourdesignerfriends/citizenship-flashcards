/*
I use this view class as the application's terminal interface. I keep
presentation and input handling here instead of mixing them into the
controller. My methods print menus, flashcards, and messages, and askChoice
reads user input asynchronously for the controller to interpret.
*/
import { createInterface, type Interface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import type { Question } from "../types/Question.js";

export class ConsoleView {
    private readonly readline: Interface;
    private inputClosed = false;

    /*
    I create the readline interface using the process's standard input and
    output streams. I also listen for its close event so askChoice can handle
    closed input as an exit instead of trying to read from a closed terminal.
    */
    constructor() {
        this.readline = createInterface({
            input: stdin,
            output: stdout,
        });
        this.readline.on(
            "close",
            // I remember that future attempts to read terminal input must stop.
            () => {
                this.inputClosed = true;
            },
        );
    }

    /*
    I print the welcome banner to the terminal when the controller starts
    the application, giving the user a clear introduction.
    */
    showWelcome(): void {
        console.log();
        console.log("=================================");
        console.log(" Welcome to Citizenship Flashcards");
        console.log("=================================");
        console.log();
    }

    /*
    I print the menu choices that the controller understands: study all
    questions, choose one of the categories, or exit.
    */
    showMenu(): void {
        console.log("Select a category:");
        console.log();
        console.log("1. Study All Questions");
        console.log("2. American Government");
        console.log("3. American History");
        console.log("4. Symbols and Holidays");
        console.log("5. Exit");
        console.log();
    }

    /*
    I asynchronously wait for one line of terminal input and return it to
    the controller. If input is already closed, or closes while I am waiting,
    I return "e" so the controller follows its normal exit path; other errors
    are rethrown instead of being hidden.
    */
    async askChoice(): Promise<string> {
        if (this.inputClosed) {
            return "e";
        }

        try {
            return await this.readline.question("Choice: ");
        } catch (error) {
            if (this.inputClosed) {
                return "e";
            }
            throw error;
        }
    }

    /*
    I print the category, position, and question for the current flashcard.
    The Question object supplies its text and answer, while answerRevealed
    controls whether I display the answer. I also show the available keyboard
    actions so the user knows how to continue, return to the menu, or exit.
    */
    showFlashcard(
        category: string,
        question: Question,
        current: number,
        total: number,
        answerRevealed: boolean,
    ): void {
        console.log();
        console.log("=================================");
        console.log(` ${category}`);
        console.log("=================================");
        console.log();
        console.log(`Question ${current} of ${total}`);
        console.log();
        console.log(`Question: ${question.question}`);
        console.log();
        if (answerRevealed) {
            console.log("Answer:");
            console.log();
            console.log(question.answer);
            console.log();
            console.log("[N] Next flashcard");
        } else {
            console.log("[ENTER] Reveal answer");
            console.log("[N] Next flashcard");
        }
        console.log("[M] Main menu");
        console.log("[E] Exit");
        console.log();
    }

    /*
    I print feedback when the controller receives a choice that is not valid
    for the current menu or flashcard.
    */
    showInvalidChoice(): void {
        console.log("Invalid choice. Please try again.");
    }

    /*
    I explain which selected category has no questions, avoiding an empty
    flashcard session that would otherwise give the user no feedback.
    */
    showNoQuestions(category: string): void {
        console.log(`No questions are available for ${category}.`);
    }

    /*
    I notify the user that the current Question[] list has been completed.
    The controller calls this when its recursive sequence reaches the end.
    */
    showCompletion(): void {
        console.log();
        console.log("You have reached the end of this category.");
        console.log();
    }

    /*
    I print a final message when the user chooses to exit the application.
    */
    showGoodbye(): void {
        console.log("Thanks for studying. Goodbye!");
    }

    /*
    I close readline to release the terminal input resources after the
    controller finishes, including when the application handles an error.
    */
    close(): void {
        this.readline.close();
    }
}