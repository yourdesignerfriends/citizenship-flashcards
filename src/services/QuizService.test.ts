/*
I test the service layer independently from the JSON file by supplying
an in memory repository. These tests check that it returns a Question[]
list in order and filters that list by category without reordering it.
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
    /*
    I implement the repository contract with sample data so each test can
    exercise the service without reading from the real JSON file.
    */
    async getQuestions() {
        return questions;
    }
}

/*
I verify that requesting all questions returns the same sample list in the
same order, showing the service does not unnecessarily reorder its data.
*/
const testGetAllQuestions = async () => {
    const service = new QuizService(new InMemoryQuestionRepository());

    assert.deepEqual(await service.getAllQuestions(), questions);
};

/*
I verify that selecting a category returns only matching cards and preserves
their relative order in the original Question[] list.
*/
const testGetQuestionsByCategory = async () => {
    const service = new QuizService(new InMemoryQuestionRepository());

    const result = await service.getQuestionsByCategory("American Government");

    assert.deepEqual(
        result.map(
            /*
            I map the filtered Question[] list to IDs so the assertion can
            clearly verify which cards were returned and in what order.
            */
            (question) => question.id,
        ),
        [1, 3],
    );
};

test("getAllQuestions preserves the repository order", testGetAllQuestions);
test(
    "getQuestionsByCategory filters without changing question order",
    testGetQuestionsByCategory,
);
