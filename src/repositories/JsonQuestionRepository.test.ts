import assert from "node:assert/strict";
import test from "node:test";
import { JsonQuestionRepository } from "./JsonQuestionRepository.js";

/*
Here I load the real data through the repository and check its contents and
order, verifying the file access and validation behavior together.
*/
const testLoadsQuestions = async () => {
    const repository = new JsonQuestionRepository();
    const questions = await repository.getQuestions();

    assert.ok(questions.length > 0);
    assert.deepEqual(
        questions.map(
            // I collect the IDs in their loaded order for comparison.
            (question) => question.id,
        ),
        [...questions]
            .map(
                // I collect IDs from a copy so sorting does not alter the source list.
                (question) => question.id,
            )
            .sort(
                // I sort the copied IDs numerically to compare expected order.
                (first, second) => first - second,
            ),
    );
    assert.ok(
        questions.every(
            // I verify every card has the text fields the application expects.
            (question) =>
                typeof question.category === "string" &&
                typeof question.question === "string" &&
                typeof question.answer === "string",
        ),
    );
};

test("loads valid questions in their original order", testLoadsQuestions);
