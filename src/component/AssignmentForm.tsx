import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
} from "../redux/features/assignment/assignmentApi";
import { useGetVideosQuery } from "../redux/features/videos/videosApi";

const AssignmentForm = ({
  initialData,
  isEditError,
  isEditLoading,
  editError,
  isEditSuccess,
  editAssignment,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    totalMark: "",
  });
  const [selected_video, setSelected_Video] = useState({
    video_id: "",
    video_title: "",
  });

  const [localError, setLocalError] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const [addAssignment, { isLoading, isError, error, isSuccess }] =
    useAddAssignmentMutation();
  const { data: assignments = [] } = useGetAssignmentsQuery();
  const { data: videos = [] } = useGetVideosQuery();
  const [filteredVideos, setFilteredVideos] = useState([]);

  // filter out existing video assignments
  useEffect(() => {
    if (assignments.length > 0 && videos.length > 0) {
      const assignmentVideoIds = assignments.map(
        (assignment) => assignment.video_id
      );

      setFilteredVideos(
        videos.filter((video) => !assignmentVideoIds.includes(video.id))
      );
    }
  }, [assignments, videos]);

  useEffect(() => {
    if (initialData && initialData.id) {
      setIsUpdate(true);
      setFormData(initialData);
      setSelected_Video({
        video_id: initialData.video_id,
        video_title: initialData.video_title,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      navigate("/assignment");
    }
  }, [isSuccess, navigate, isEditSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selected_video.video_id) {
      setLocalError("Please select a video");
      return;
    }

    const data = {
      ...formData,
      ...selected_video,
    };

    if (isUpdate) {
      editAssignment({
        id: initialData.id,
        data,
      });
    } else {
      addAssignment(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8" method="POST">
      {(isError || isEditError || localError) && (
        <p className="text-red-500">
          {error?.data || editError?.data || localError}
        </p>
      )}
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="py-2">
          <label
            htmlFor="select_video"
            className="block font-medium text-gray-100"
          >
            Select Video:
          </label>

          <select
            name="select_video"
            id="select_video"
            className="mt-1.5 w-full rounded-sm border-gray-300 text-gray-100 py-1 bg-slate-800"
            onChange={(e) => setSelected_Video(JSON.parse(e.target.value))}
            value={JSON.stringify(selected_video)}
          >
            <option value="" hidden>
              Please select video for assignment
            </option>
            {filteredVideos?.map((video) => (
              <option
                key={video.id}
                value={JSON.stringify({
                  video_id: video.id,
                  video_title: video.title,
                })}
              >
                {video.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            value={formData.title}
            onChange={handleChange}
            id="title"
            name="title"
            type="text"
            required
            className="login-input h-10 rounded-t-md"
            placeholder="Assignment Title"
          />
        </div>
        <div>
          <label htmlFor="TotalMark" className="sr-only">
            Total Mark
          </label>
          <input
            value={formData.totalMark}
            onChange={handleChange}
            id="TotalMark"
            name="totalMark"
            type="text"
            required
            className="login-input h-10 "
            placeholder="Mark"
          />
        </div>
      </div>

      <div className="py-2">
        <button
          disabled={isLoading || isEditLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {isLoading || isEditLoading
            ? "Loading..."
            : isUpdate
            ? "Update Assignment"
            : "Add Assignment"}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
