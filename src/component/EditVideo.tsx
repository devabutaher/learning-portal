import { useParams } from "react-router-dom";
import {
  useEditVideoMutation,
  useGetVideoQuery,
} from "../redux/features/videos/videosApi";
import VideoForm from "./VideoForm";

const EditVideo = () => {
  const params = useParams();
  const { data: initialData, isLoading } = useGetVideoQuery(params.id);
  const [
    editVideo,
    {
      isLoading: isEditLoading,
      isError: isEditError,
      error: editError,
      isSuccess: isEditSuccess,
    },
  ] = useEditVideoMutation(params.id);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto w-[30rem] px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="/assets/image/learningportal.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Video
          </h2>
        </div>

        {isLoading ? (
          "Loading..."
        ) : (
          <VideoForm
            initialData={initialData}
            editVideo={editVideo}
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

export default EditVideo;
