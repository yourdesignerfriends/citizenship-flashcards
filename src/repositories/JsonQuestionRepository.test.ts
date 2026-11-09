/*
I verify that the repository asynchronously loads a valid Question[] list
and preserves the order of the flashcards from the JSON data file.
*/
import assert from "node:assert/strict";
import test from "node:test";
import { JsonQuestionRepository } from "./JsonQuestionRepository.js";

test("loads valid questions in their original order", async () => {
    const repository = new JsonQuestionRepository();
    const questions = await repository.getQuestions();

    assert.ok(questions.length > 0);
    assert.deepEqual(
        questions.map((question) => question.id),
        [...questions]
            .map((question) => question.id)
            .sort((first, second) => first - second),
    );
    assert.ok(
        questions.every(
            (question) =>
                typeof question.category === "string" &&
                typeof question.question === "string" &&
                typeof question.answer === "string",
        ),
    );
});
