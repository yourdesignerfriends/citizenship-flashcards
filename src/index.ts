/*
I use this file to assemble the application by creating its repository,
service, view, and controller classes and connecting their dependencies.
I start the controller, handle unexpected errors at the application
boundary, and always close terminal input when execution finishes.
*/
import { QuizController } from "./controllers/QuizController.js";
import { JsonQuestionRepository } from "./repositories/JsonQuestionRepository.js";
import { QuizService } from "./services/QuizService.js";
import { ConsoleView } from "./views/ConsoleView.js";

const view = new ConsoleView();
const repository = new JsonQuestionRepository();
const quizService = new QuizService(repository);
const controller = new QuizController(quizService, view);

// I start the app in a try block so failures from its asynchronous flow can be handled below.
try {
    await controller.run();
} catch (error) {
    /*
    I report unexpected failures in the terminal and set a non-zero process
    exit code so the operating system can tell the run did not succeed.
    */
    console.error("The application stopped because of an unexpected error.");
    console.error(error);
    process.exitCode = 1;
} finally {
    // I release the readline resources whether the run succeeds or fails.
    view.close();
}