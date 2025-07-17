import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Questions } from "./Questions";
import "./App.css";

export interface Question {
  question: string;
  answer: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(
          "https://64c8a749a1fe0128fbd6008e.mockapi.io/GromkyiVopros"
        );
        const _questions = (await response.json()) as Question[];
        setQuestions(_questions);
      } catch (error) {
        setIsError(true);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <main className="main">
      {!questions.length ? (
        <Button
          title={isError ? "Ошибка при загрузке" : "Идет загрузка вопросов"}
          style={{ width: "100%" }}
        />
      ) : (
        <Questions questions={questions} />
      )}
    </main>
  );
}

export default App;
