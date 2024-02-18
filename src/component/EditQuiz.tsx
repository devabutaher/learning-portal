import { useParams } from "react-router-dom";
import {
  useEditQuizMutation,
  useGetQuizQuery,
} from "../redux/features/quiz/quizApi";
import QuizForm from "./QuizForm";

const EditQuiz = () => {
  const params = useParams();
  const { data: initialData, isLoading } = useGetQuizQuery(params.id);
  const [
    editQuiz,
    {
      isLoading: isEditLoading,
      isError: isEditError,
      error: editError,
      isSuccess: isEditSuccess,
    },
  ] = useEditQuizMutation(params.id);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto w-[30rem] px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="/assets/image/learningportal.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Quiz
          </h2>
        </div>

        {isLoading ? (
          "Loading..."
        ) : (
          <QuizForm
            initialData={initialData}
            editQuiz={editQuiz}
            isEditLoading={isEditLoading}
            isisEditError={isEditError}
            isEditSuccess={isEditSuccess}
            editError={editError}
          />
        )}
      </div>
    </section>
  );
};

export default EditQuiz;
