import { useState } from "react";
import {
  useEditAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
} from "../redux/features/assignment/assignmentApi";
import { formatDate } from "../utils/formateDate";

const AssignmentMark = () => {
  const {
    data: assignmentMarks = [],
    isError,
    isLoading,
  } = useGetAssignmentMarksQuery();
  const [editAssignmentMark] = useEditAssignmentMarkMutation();
  const [mark, setMark] = useState(0);

  const handleMark = ({ e, assignment }) => {
    e.preventDefault();

    if (mark > Number(assignment.totalMark) || mark < 0) {
      alert(`Total Mark: ${assignment.totalMark}`);
      return;
    }

    editAssignmentMark({
      id: assignment.id,
      data: { ...assignment, mark, status: "published" },
    });
  };

  // get assignment status length
  const assignmentStatusLength = (status) => {
    return assignmentMarks.reduce(
      (accumulator, assignment) =>
        assignment.status === `${status}` ? accumulator + 1 : accumulator,
      0
    );
  };

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <ul className="assignment-status">
            <li>
              Total <span>{assignmentMarks?.length}</span>
            </li>
            <li>
              Pending <span>{assignmentStatusLength("pending")}</span>
            </li>
            <li>
              Mark Sent <span>{assignmentStatusLength("published")}</span>
            </li>
          </ul>
          <div className="overflow-x-auto mt-4">
            {isLoading ? (
              <p className="text-center text-lg font-semibold my-8">
                Loading...
              </p>
            ) : isError ? (
              <p className="text-center text-lg font-semibold my-8">
                Cannot get assignments
              </p>
            ) : assignmentMarks.length === 0 ? (
              <p className="text-center text-lg font-semibold my-8">
                No assignment found
              </p>
            ) : (
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {assignmentMarks.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="table-td">{assignment.title}</td>
                      <td className="table-td">
                        {formatDate(assignment.createdAt)}
                      </td>
                      <td className="table-td">{assignment.student_name}</td>
                      <td className="table-td">{assignment.repo_link}</td>
                      {assignment.status === "pending" ? (
                        <td className="table-td input-mark">
                          <form
                            onSubmit={(e) => handleMark({ e, assignment })}
                            className="flex items-center gap-1"
                          >
                            <input
                              onChange={(e) => setMark(Number(e.target.value))}
                              defaultValue={0}
                              type="number"
                              className="[&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button type="submit">
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </button>
                          </form>
                        </td>
                      ) : (
                        <td className="table-td">{assignment.mark}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentMark;
