/*
I verify that the service returns flashcards in order and filters the
Question[] list by category without changing that order.
*/
import assert from "node:assert/strict";
import test from "node:test";
import type { IQuestionRepository } from "../repositories/IQuestionRepository.js";
import { QuizService } from "./QuizService.js";

const questions = [
    {
        id: 1,
        category: "American Government",
        question: "First question",
        answer: "First answer",
    },
    {
        id: 2,
        category: "American History",
        question: "Second question",
        answer: "Second answer",
    },
    {
        id: 3,
        category: "American Government",
        question: "Third question",
        answer: "Third answer",
    },
];

class InMemoryQuestionRepository implements IQuestionRepository {
    async getQuestions() {
        return questions;
    }
}

test("getAllQuestions preserves the repository order", async () => {
    const service = new QuizService(new InMemoryQuestionRepository());

    assert.deepEqual(await service.getAllQuestions(), questions);
});

test("getQuestionsByCategory filters without changing question order", async () => {
    const service = new QuizService(new InMemoryQuestionRepository());

    const result = await service.getQuestionsByCategory("American Government");

    assert.deepEqual(
        result.map((question) => question.id),
        [1, 3],
    );
});
