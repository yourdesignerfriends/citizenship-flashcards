/*
I use this repository class as the data-access layer for the flashcards.
I asynchronously read questions.json, parse its contents, and validate
each item before returning a Question[] list. If reading, parsing, or
validation fails, I throw an error so the application can report the cause.
*/

import { readFile } from "node:fs/promises";

import type { Question } from "../types/Question.js";
import type { IQuestionRepository } from "./IQuestionRepository.js";

/*
I validate one unknown value from the JSON file before treating it as a
Question. Checking every required field protects the rest of the app from
malformed data and acts as a type guard for the validated value.
*/
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
    /*
    Here I read the JSON file asynchronously so file access does not block the
    application. I parse the data as unknown, verify that it is an array of
    valid questions, and return the typed list. My catch block wraps failures
    with a helpful message while preserving the original error as the cause.
    */
    async getQuestions(): Promise<Question[]> {
        try {
            const data = await readFile(
                new URL("../data/questions.json", import.meta.url),
                "utf-8",
            );
            const questions: unknown = JSON.parse(data);

            if (
                !Array.isArray(questions) ||
                !questions.every(
                    /*
                    I check each array entry with my type guard, every item
                    must pass for me to accept and return the whole list.
                    */
                    isQuestion,
                )
            )   {
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