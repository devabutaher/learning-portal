import { Link, useParams } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useGetAssignmentByStudentQuery } from "../redux/features/assignment/assignmentApi";
import { useGetQuizMarkByStudentQuery } from "../redux/features/quiz/quizApi";

const AssignmentQuizButton = ({ setOpenModal, assignment, quiz }) => {
  const params = useParams();
  const user = useAuth();

  const { data: submittedAssignment = [] } = useGetAssignmentByStudentQuery({
    student_id: user.id,
    assignment_id: assignment[0]?.id,
  });

  const { data: submittedQuiz = [] } = useGetQuizMarkByStudentQuery({
    student_id: user.id,
    video_id: params.id,
  });

  return (
    <div className="flex gap-4">
      {assignment.length !== 0 ? (
        submittedAssignment.length === 0 ? (
          <button
            onClick={() => setOpenModal(true)}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            এসাইনমেন্ট
          </button>
        ) : (
          <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
            এসাইনমেন্ট দিয়েছেন
          </button>
        )
      ) : (
        <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
          এসাইনমেন্ট নেই
        </button>
      )}

      {quiz.length !== 0 ? (
        submittedQuiz.length === 0 ? (
          <Link
            to={`/quiz/${params.id}`}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            কুইজে অংশগ্রহণ করুন
          </Link>
        ) : (
          <Link
            to={`/quiz/${params.id}`}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            কুইজের উত্তর দেখুন
          </Link>
        )
      ) : (
        <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
          কুইজ নেই
        </button>
      )}
    </div>
  );
};

export default AssignmentQuizButton;
