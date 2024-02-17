import { useEffect } from "react";
import { useAddAssignmentMarkMutation } from "../redux/features/assignment/assignmentApi";

const AssignmentModal = ({ openModal, setOpenModal, assignment, user }) => {
  const [addAssignment, { isError, isLoading, isSuccess, error }] =
    useAddAssignmentMarkMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
    }
  }, [isSuccess, setOpenModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const repo_link = e.target.repo.value;

    const data = {
      repo_link,
      student_name: user.name,
      title: assignment[0].title,
      status: "pending",
      mark: 0,
      totalMark: assignment[0].totalMark,
      student_id: user.id,
      assignment_id: assignment[0].id,
      createdAt: new Date(),
    };

    addAssignment(data);
  };

  return (
    <div
      onClick={() => setOpenModal(false)}
      className={`fixed flex justify-center items-center z-[100] ${
        openModal ? "visible opacity-1" : "invisible opacity-0"
      } inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute md:min-w-[25rem] p-4 text-center bg-slate-900 drop-shadow-2xl rounded-lg ${
          openModal
            ? "scale-1 opacity-1 duration-300"
            : "scale-0 opacity-0 duration-150"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-lg font-semibold">Submit Your Assignment</h1>
          {isError && <p className="text-red-500">{error.data}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="github-repo" className="sr-only">
                Github Link
              </label>
              <input
                id="github-repo"
                name="repo"
                type="text"
                required
                className="login-input rounded-t-md"
                placeholder="Github repo link"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentModal;
