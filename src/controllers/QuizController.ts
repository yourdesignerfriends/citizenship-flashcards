/*
I coordinate user choices and the quiz service in this controller class.
I study questions sequentially using a Question[] list. The recursive
studyQuestions method advances to the next card, demonstrating recursion;
async/await lets me wait for console input and question data.
*/
import type { QuizService } from "../services/QuizService.js";
import type { Question } from "../types/Question.js";
import type { ConsoleView } from "../views/ConsoleView.js";

const CATEGORIES = [
    "American Government",
    "American History",
    "Symbols and Holidays",
] as const;

export class QuizController {
    constructor(
        private readonly quizService: QuizService,
        private readonly view: ConsoleView,
    ) {}

    async run(): Promise<void> {
        this.view.showWelcome();

        while (true) {
            this.view.showMenu();
            const choice = (await this.view.askChoice()).trim();

            if (choice === "5" || choice.toLowerCase() === "e") {
                this.view.showGoodbye();
                return;
            }

            if (choice === "1") {
                const questions = await this.quizService.getAllQuestions();
                if (questions.length === 0) {
                    this.view.showNoQuestions("All Questions");
                    continue;
                }
                const shouldExit = await this.studyQuestions(
                    questions,
                    "All Questions",
                    0,
                );
                if (shouldExit) {
                    this.view.showGoodbye();
                    return;
                }
                continue;
            }

            const categoryIndex = Number(choice) - 2;
            const category = CATEGORIES[categoryIndex];
            if (category === undefined) {
                this.view.showInvalidChoice();
                continue;
            }

            const questions =
                await this.quizService.getQuestionsByCategory(category);
            if (questions.length === 0) {
                this.view.showNoQuestions(category);
                continue;
            }

            const shouldExit = await this.studyQuestions(questions, category, 0);
            if (shouldExit) {
                this.view.showGoodbye();
                return;
            }
        }
    }

    private async studyQuestions(
        questions: Question[],
        category: string,
        index: number,
    ): Promise<boolean> {
        if (index >= questions.length) {
            this.view.showCompletion();
            return false;
        }

        const question = questions[index];
        if (question === undefined) {
            throw new Error(`Question at position ${index + 1} was not found.`);
        }

        let answerRevealed = false;
        while (true) {
            this.view.showFlashcard(
                category,
                question,
                index + 1,
                questions.length,
                answerRevealed,
            );
            const choice = (await this.view.askChoice()).trim().toLowerCase();

            if (choice === "" && !answerRevealed) {
                answerRevealed = true;
                continue;
            }

            if (choice === "n") {
                return this.studyQuestions(questions, category, index + 1);
            }

            if (choice === "m") {
                return false;
            }

            if (choice === "e") {
                return true;
            }

            this.view.showInvalidChoice();
        }
    }
}
