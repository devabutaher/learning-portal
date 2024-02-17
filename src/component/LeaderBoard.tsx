import { useEffect, useMemo, useState } from "react";
import useAuth from "../hook/useAuth";
import { useGetAssignmentMarksQuery } from "../redux/features/assignment/assignmentApi";
import { useGetQuizMarksQuery } from "../redux/features/quiz/quizApi";

const Leaderboard = () => {
  const user = useAuth();

  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useGetAssignmentMarksQuery();

  const {
    data: quizzes = [],
    isLoading: isQuizLoading,
    isError: isQuizError,
  } = useGetQuizMarksQuery();

  const [topStudents, setTopStudents] = useState([]);

  const combinedData = useMemo(() => {
    if (assignments.length === 0 || quizzes.length === 0) {
      return [];
    }

    const combinedData = {};
    assignments.forEach(({ student_id, student_name, mark }) => {
      combinedData[student_id] = {
        ...combinedData[student_id],
        id: student_id,
        name: student_name,
        assignment_mark: mark,
      };
    });

    quizzes.forEach(({ student_id, student_name, mark }) => {
      combinedData[student_id] = {
        ...combinedData[student_id],
        id: student_id,
        name: student_name,
        quiz_mark: mark,
      };
    });

    return Object.values(combinedData)
      .map((student) => ({
        ...student,
        totalMark: (student.assignment_mark || 0) + (student.quiz_mark || 0),
      }))
      .sort((a, b) => b.totalMark - a.totalMark)
      .slice(0, 20);
  }, [assignments, quizzes]);

  useEffect(() => {
    if (combinedData.length > 0) {
      setTopStudents(combinedData);
    }
  }, [combinedData]);

  const myRank = combinedData.findIndex((data) => data.id === user.id) || {};

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-2 border-cyan">
                <td className="table-td text-center font-bold">{myRank + 1}</td>
                <td className="table-td text-center font-bold">
                  {combinedData[myRank]?.name}
                </td>
                <td className="table-td text-center font-bold">
                  {combinedData[myRank]?.quiz_mark || "-"}
                </td>
                <td className="table-td text-center font-bold">
                  {combinedData[myRank]?.assignment_mark || "-"}
                </td>
                <td className="table-td text-center font-bold">
                  {combinedData[myRank]?.totalMark}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>

          {isLoading || isQuizLoading ? (
            <p className="text-center text-lg font-semibold my-8">Loading...</p>
          ) : isError || isQuizError ? (
            <p className="text-center text-lg font-semibold my-8">
              Cannot get data
            </p>
          ) : topStudents.length === 0 ? (
            <p className="text-center text-lg font-semibold my-8">
              No data found
            </p>
          ) : (
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {topStudents.map((student, index) => (
                  <tr key={student.id} className="border-b border-slate-600/50">
                    <td className="table-td text-center">{index + 1}</td>
                    <td className="table-td text-center">{student.name}</td>
                    <td className="table-td text-center">
                      {student.quiz_mark || "-"}
                    </td>
                    <td className="table-td text-center">
                      {student.assignment_mark || "-"}
                    </td>
                    <td className="table-td text-center">
                      {student.totalMark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
