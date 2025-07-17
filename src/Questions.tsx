import { useEffect, useState } from "react";
import { type Question } from "./App";
import { Button } from "./Button";

interface QuestionsProps {
  questions: Question[];
}

let intervalID: ReturnType<typeof setInterval>;
const SECONDS_TO_PLAY = 60;

export const Questions = ({ questions }: QuestionsProps) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_TO_PLAY);
  const _secondsLeft = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
  const currentQuestion = questions[activeQuestionIndex];

  function startTimer() {
    intervalID = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(intervalID);
        }
        return (prev -= 1);
      });
    }, 1000);
  }

  function showQuestion() {
    if (!isGameStarted) {
      setIsGameStarted(true);
      startTimer();
    }
  }

  function showAnswer() {
    setIsShowAnswer(true);
    clearInterval(intervalID);
  }

  function reset() {
    clearInterval(intervalID);
    setIsGameStarted(false);
    setIsShowAnswer(false);
    setSecondsLeft(SECONDS_TO_PLAY);
  }

  function onQuestionChange(type: "prev" | "next") {
    reset();
    setActiveQuestionIndex((prev) => prev + (type === "prev" ? -1 : 1));
  }

  useEffect(() => {
    return () => {
      if (intervalID) clearInterval(intervalID);
    };
  }, []);

  return (
    <div className="container">
      <div>
        Вопрос №{activeQuestionIndex + 1} из {questions.length}
      </div>
      <div className="wrapper min-height" onClick={showQuestion}>
        {!isGameStarted
          ? "Показать вопрос"
          : isShowAnswer
          ? currentQuestion.answer
          : currentQuestion.question}
      </div>
      <div className="wrapper">
        {secondsLeft === 60 ? "01:00" : `00:${_secondsLeft}`}
      </div>
      <Button
        title="Посмотреть ответ"
        onClick={showAnswer}
        disabled={!isGameStarted}
      />
      <div className="buttons">
        <Button
          title="Предыдущий вопрос"
          onClick={() => onQuestionChange("prev")}
          disabled={activeQuestionIndex === 0}
        />
        <Button
          title="Следующий вопрос"
          onClick={() => onQuestionChange("next")}
          disabled={activeQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  );
};
