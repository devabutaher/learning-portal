import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddQuizMutation } from "../redux/features/quiz/quizApi";

const QuizForm = ({
  initialData,
  isEditError,
  isEditLoading,
  editError,
  isEditSuccess,
  editQuiz,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    views: "",
    duration: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const [addQuiz, { isLoading, isError, error, isSuccess }] =
    useAddQuizMutation();

  useEffect(() => {
    if (initialData && initialData.id) {
      setIsUpdate(true);
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      navigate("/videos");
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

    const data = {
      ...formData,
      createdAt: new Date(),
    };

    if (isUpdate) {
      editQuiz({ id: initialData.id, data });
    } else {
      addQuiz(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
      {isError ||
        (isEditError && (
          <p className="text-red-500">{error?.data || editError?.data}</p>
        ))}
      <div className="rounded-md shadow-sm -space-y-px">
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
            placeholder="Video Title"
          />
        </div>
        <div>
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <input
            value={formData.description}
            onChange={handleChange}
            id="description"
            name="description"
            type="text"
            required
            className="login-input h-10 "
            placeholder="Description"
          />
        </div>
        <div>
          <label htmlFor="url" className="sr-only">
            URL
          </label>
          <input
            value={formData.url}
            onChange={handleChange}
            id="url"
            name="url"
            type="text"
            required
            className="login-input h-10"
            placeholder="Video iframe URL"
          />
        </div>
        <div>
          <label htmlFor="views" className="sr-only">
            Views
          </label>
          <input
            value={formData.views}
            onChange={handleChange}
            id="views"
            name="views"
            type="text"
            required
            className="login-input h-10"
            placeholder="Views"
          />
        </div>
        <div>
          <label htmlFor="duration" className="sr-only">
            Duration
          </label>
          <input
            value={formData.duration}
            onChange={handleChange}
            id="duration"
            name="duration"
            type="text"
            required
            className="login-input h-10"
            placeholder="Duration"
          />
        </div>
      </div>

      <div>
        <button
          disabled={isLoading || isEditLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {isLoading || isEditLoading
            ? "Loading..."
            : isUpdate
            ? "Update Video"
            : "Add Video"}
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
