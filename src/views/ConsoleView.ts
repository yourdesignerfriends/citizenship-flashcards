/*
I handle terminal input and output in this view class. I print the menu,
flashcards, answers, and messages with console.log, and I read choices
asynchronously so the controller can respond to the user's input.
*/
import { createInterface, type Interface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import type { Question } from "../types/Question.js";

export class ConsoleView {
    private readonly readline: Interface;
    private inputClosed = false;

    constructor() {
        this.readline = createInterface({
            input: stdin,
            output: stdout,
        });
        this.readline.on("close", () => {
            this.inputClosed = true;
        });
    }

    showWelcome(): void {
        console.log();
        console.log("=================================");
        console.log(" Welcome to Citizenship Flashcards");
        console.log("=================================");
        console.log();
    }

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

    showInvalidChoice(): void {
        console.log("Invalid choice. Please try again.");
    }

    showNoQuestions(category: string): void {
        console.log(`No questions are available for ${category}.`);
    }

    showCompletion(): void {
        console.log();
        console.log("You have reached the end of this category.");
        console.log();
    }

    showGoodbye(): void {
        console.log("Thanks for studying. Goodbye!");
    }

    close(): void {
        this.readline.close();
    }
}