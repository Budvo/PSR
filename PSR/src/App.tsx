import { useEffect, useMemo, useState } from "react";

export type AnswerOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  text: string;
  options: AnswerOption[];
};

const ALL_QUESTIONS: Question[] = [
  // ... ВАШИ ВОПРОСЫ ИЗ ПРИМЕРА (1–45) ...
];

function pickRandomQuestions(source: Question[], count: number): Question[] {
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        sendData: (data: string) => void;
      };
    };
  }
}

type Mode = "idle" | "credit" | "all";

export function App() {
  const CREDIT_QUESTION_COUNT = 20;
  const BASE_MAX_ERRORS_FRACTION = 0.2; // допускаем до 20% ошибок

  const [mode, setMode] = useState<Mode>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      try {
        tg.ready();
        tg.expand();
      } catch {
        // ignore
      }
    }
  }, []);

  const currentQuestion = questions[currentIndex];

  const correctCount = useMemo(
    () =>
      questions.reduce((sum, q) => {
        const chosen = answers[q.id];
        const correctOption = q.options.find((o) => o.isCorrect);
        if (!correctOption) return sum;
        return sum + (chosen === correctOption.id ? 1 : 0);
      }, 0),
    [answers, questions]
  );

  const totalQuestions = questions.length;
  const maxErrorsAllowed = Math.floor(totalQuestions * BASE_MAX_ERRORS_FRACTION);
  const errorsCount = Math.max(totalQuestions - correctCount, 0);
  const isPassed = errorsCount <= maxErrorsAllowed;

  const startTest = (newMode: Mode) => {
    let qs: Question[];
    if (newMode === "credit") {
      qs = pickRandomQuestions(ALL_QUESTIONS, Math.min(CREDIT_QUESTION_COUNT, ALL_QUESTIONS.length));
    } else if (newMode === "all") {
      qs = [...ALL_QUESTIONS];
    } else {
      qs = [];
    }

    setMode(newMode);
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  const handleAnswer = (optionId: string) => {
    if (!currentQuestion) return;

    const questionId = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    const isLast = currentIndex === questions.length - 1;

    if (isLast) {
      setIsFinished(true);

      try {
        const tg = window.Telegram?.WebApp;
        if (tg && typeof tg.sendData === "function") {
          const isCorrectNow = isAnswerCorrect(currentQuestion, optionId);
          const finalCorrect = correctCount + (isCorrectNow ? 1 : 0);
          const finalTotal = questions.length;
          const finalMaxErrorsAllowed = Math.floor(finalTotal * BASE_MAX_ERRORS_FRACTION);
          const finalErrors = Math.max(finalTotal - finalCorrect, 0);
          const finalPassed = finalErrors <= finalMaxErrorsAllowed;

          const payload = {
            type: "quizResult",
            mode,
            correct: finalCorrect,
            total: finalTotal,
            errors: finalErrors,
            maxErrorsAllowed: finalMaxErrorsAllowed,
            passed: finalPassed,
            answers: {
              ...answers,
              [questionId]: optionId,
            },
          };

          // На некоторых Android-клиентах Telegram WebApp закрывается сразу после sendData.
          // Поэтому отправляем только данные, не вызываем close() и не меняем состояние после этого вызова.
          tg.sendData(JSON.stringify(payload));
        }
      } catch (error) {
        console.log("Telegram sendData error:", error);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestartSameMode = () => {
    if (mode === "credit") {
      startTest("credit");
    } else if (mode === "all") {
      startTest("all");
    } else {
      setMode("idle");
      setQuestions([]);
      setCurrentIndex(0);
      setAnswers({});
      setIsFinished(false);
    }
  };

  if (mode === "idle") {
    return (
      <div className="flex min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-6 pt-8">
          <header className="mb-6 text-center">
            <h1 className="text-lg font-semibold">Тест для Telegram</h1>
            <p className="mt-1 text-xs text-slate-400">
              Выберите режим прохождения: зачёт (20 случайных вопросов) или вся база вопросов.
            </p>
          </header>

          <main className="flex flex-1 flex-col items-stretch justify-center gap-3">
            <button
              onClick={() => startTest("credit")}
              className="rounded-2xl bg-emerald-500 px-4 py-4 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 active:scale-[0.98] hover:bg-emerald-400"
            >
              Зачет (20 случайных вопросов)
            </button>
            <button
              onClick={() => startTest("all")}
              className="rounded-2xl bg-slate-800 px-4 py-4 text-sm font-semibold text-slate-50 shadow-lg shadow-slate-950/40 active:scale-[0.98] hover:bg-slate-700"
            >
              Все вопросы (вся база)
            </button>
          </main>

          <footer className="mt-4 text-center text-[10px] text-slate-500">
            Интерфейс адаптирован под Telegram WebApp.
          </footer>
        </div>
      </div>
    );
  }

  if (!currentQuestion && !isFinished) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
        <div className="text-center text-sm text-slate-300">
          Недостаточно вопросов в базе. Добавьте больше вопросов в ALL_QUESTIONS.
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-6 pt-8">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Тест для Telegram</h1>
            <p className="text-xs text-slate-400">
              {mode === "credit" ? "20 случайных вопросов (зачет)" : "Все вопросы из базы"}
            </p>
          </div>
          <button
            onClick={() => {
              setMode("idle");
              setQuestions([]);
              setCurrentIndex(0);
              setAnswers({});
              setIsFinished(false);
            }}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200 shadow-sm hover:bg-slate-700"
          >
            В меню
          </button>
        </header>

        {!isFinished ? (
          <main className="flex flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>
                Вопрос {currentIndex + 1} / {questions.length}
              </span>
              <span>Правильных: {correctCount}</span>
            </div>

            {currentQuestion && (
              <>
                <div className="mb-4 rounded-2xl bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40">
                  <p className="whitespace-pre-line text-sm leading-relaxed">{currentQuestion.text}</p>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-700 active:scale-[0.98]"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </>
            )}
          </main>
        ) : (
          <main className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-6 rounded-3xl bg-slate-900/70 px-6 py-8 shadow-lg shadow-slate-950/40">
              <h2 className="mb-2 text-xl font-semibold">Тест завершён</h2>
              <p className="mb-4 text-sm text-slate-300">
                Правильных ответов: {correctCount} из {questions.length}
              </p>
              <p
                className={
                  "text-lg font-bold " + (isPassed ? "text-emerald-400" : "text-rose-400")
                }
              >
                {isPassed ? "Зачёт" : "Незачёт"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleRestartSameMode}
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
              >
                Пройти ещё раз в этом режиме
              </button>
              <button
                onClick={() => setMode("idle")}
                className="rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-50 shadow-lg shadow-slate-950/40 hover:bg-slate-700"
              >
                В главное меню
              </button>
            </div>
          </main>
        )}

        <footer className="mt-4 text-center text-[10px] text-slate-500">
          Интерфейс адаптирован под Telegram WebApp: вопрос сверху, варианты ответов кнопками внизу.
        </footer>
      </div>
    </div>
  );
}

function isAnswerCorrect(question: Question, optionId: string): boolean {
  const option = question.options.find((o) => o.id === optionId);
  return Boolean(option && option.isCorrect);
}
