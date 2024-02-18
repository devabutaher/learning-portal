import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hook/useAuth";
import {
  useAddQuizMarkMutation,
  useGetQuizByVideoQuery,
  useGetQuizMarkByStudentQuery,
} from "../redux/features/quiz/quizApi";

const Quiz = () => {
  const params = useParams();
  const user = useAuth();
  const {
    data: quiz = [],
    isError,
    isLoading,
  } = useGetQuizByVideoQuery(params.id);
  const [addQuizMark, { isSuccess, isLoading: addQuizLoading }] =
    useAddQuizMarkMutation();
  const { data: submittedQuiz = [] } = useGetQuizMarkByStudentQuery({
    student_id: user.id,
    video_id: params.id,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (isSuccess) {
      navigate(`/course-video/${params.id}`);
    }
  }, [isSuccess, navigate, params.id]);

  const handleQuizOption = () => {
    let totalCorrect = 0;
    let totalWrong = 0;
    let mark = 0;

    quiz.forEach((question) => {
      // Find the selected option from the question options
      const selectedOption = question.options.find(
        (option) => option.id === answers[question.id]
      );

      // If an option is selected and it's correct, increment total correct and mark
      if (selectedOption && selectedOption.isCorrect) {
        totalCorrect++;
        mark += 5;
      } else if (selectedOption && !selectedOption.isCorrect) {
        // If an option is selected but it's incorrect, increment total wrong
        totalWrong++;
      }
    });

    // data to send to backend
    const data = {
      student_id: user.id,
      student_name: user.name,
      video_id: quiz[0]?.video_id,
      video_title: quiz[0]?.video_title,
      totalQuiz: quiz.length,
      totalMark: quiz.length * 5,
      totalCorrect,
      totalWrong,
      mark,
    };

    dispatch(addQuizMark(data));
  };

  const handleOptionChange = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  // decide what to render
  let content;
  if (isLoading) {
    content = <p className="text-center">Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p className="text-center">Cannot get quiz!</p>;
  } else if (!isLoading && !isError && quiz?.length === 0) {
    content = <p className="text-center">No quiz found</p>;
  } else if (!isLoading && !isError && quiz?.length > 0) {
    content = (
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for "{quiz[0].video_title}"
          </h1>
          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>
        <div className="space-y-8 ">
          {quiz.map((question) => (
            <div key={question.id} className="quiz">
              <h4 className="question">
                Quiz {question.id} - {question.question}
              </h4>
              {/* <!-- Option --> */}
              <form className="quizOptions">
                {question.options.map((option) => (
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={
                        answers[question.id] === option.id ||
                        (submittedQuiz.length > 0 && option.isCorrect)
                      }
                      onChange={() =>
                        handleOptionChange(question.id, option.id)
                      }
                    />
                    {option.option}
                  </label>
                ))}
              </form>
            </div>
          ))}
        </div>

        {submittedQuiz.length > 0 ? (
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-full bg-cyan-600 block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          >
            Get Back
          </button>
        ) : (
          <button
            onClick={handleQuizOption}
            disabled={addQuizLoading}
            className="px-4 py-2 rounded-full bg-cyan-600 block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          >
            {addQuizLoading ? "Loading" : "Submit"}
          </button>
        )}
      </div>
    );
  }

  return <section className="py-6 bg-primary">{content}</section>;
};

export default Quiz;
