/*
I create and connect the repository, service, view, and controller here.
I also catch errors from the application and print them to the terminal,
demonstrating exception handling, then close the console input in all cases.
*/
import { QuizController } from "./controllers/QuizController.js";
import { JsonQuestionRepository } from "./repositories/JsonQuestionRepository.js";
import { QuizService } from "./services/QuizService.js";
import { ConsoleView } from "./views/ConsoleView.js";

const view = new ConsoleView();
const repository = new JsonQuestionRepository();
const quizService = new QuizService(repository);
const controller = new QuizController(quizService, view);

try {
    await controller.run();
} catch (error) {
    console.error("The application stopped because of an unexpected error.");
    console.error(error);
    process.exitCode = 1;
} finally {
    view.close();
}