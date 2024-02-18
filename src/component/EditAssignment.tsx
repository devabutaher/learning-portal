import { useParams } from "react-router-dom";
import {
  useEditAssignmentMutation,
  useGetAssignmentQuery,
} from "../redux/features/assignment/assignmentApi";
import AssignmentForm from "./AssignmentForm";

const EditAssignment = () => {
  const params = useParams();
  const { data: initialData, isLoading } = useGetAssignmentQuery(params.id);
  const [
    editAssignment,
    {
      isLoading: isEditLoading,
      isError: isEditError,
      error: editError,
      isSuccess: isEditSuccess,
    },
  ] = useEditAssignmentMutation(params.id);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto w-[30rem] px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="/assets/image/learningportal.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Assignment
          </h2>
        </div>

        {isLoading ? (
          "Loading..."
        ) : (
          <AssignmentForm
            initialData={initialData}
            editAssignment={editAssignment}
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

export default EditAssignment;
