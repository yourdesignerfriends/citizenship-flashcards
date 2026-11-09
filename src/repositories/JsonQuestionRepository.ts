/*
I load the flashcard list from questions.json and validate each record
before returning it. This class demonstrates classes and asynchronous
file access. I throw an error when loading or validating fails so the
application can report the problem instead of silently continuing.
*/

import { readFile } from "node:fs/promises";

import type { Question } from "../types/Question.js";
import type { IQuestionRepository } from "./IQuestionRepository.js";

function isQuestion(value: unknown): value is Question {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const question = value as Record<string, unknown>;
    return (
        typeof question.id === "number" &&
        typeof question.category === "string" &&
        typeof question.question === "string" &&
        typeof question.answer === "string"
    );
}

export class JsonQuestionRepository implements IQuestionRepository {
    async getQuestions(): Promise<Question[]> {
        try {
            const data = await readFile(
                new URL("../data/questions.json", import.meta.url),
                "utf-8",
            );
            const questions: unknown = JSON.parse(data);

            if (
                !Array.isArray(questions) ||
                !questions.every(isQuestion)
            ) {
                throw new Error("The questions file has an invalid format.");
            }

            return questions;
        } catch (error) {
            throw new Error("Unable to load questions from questions.json.", {
                cause: error,
            });
        }
    }
}