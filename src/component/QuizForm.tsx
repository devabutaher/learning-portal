import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddQuizMutation } from "../redux/features/quiz/quizApi";
import { useGetVideosQuery } from "../redux/features/videos/videosApi";

const QuizForm = ({
  initialData,
  isEditError,
  isEditLoading,
  editError,
  isEditSuccess,
  editQuiz,
}) => {
  const [addQuiz, { isLoading, isError, error, isSuccess }] =
    useAddQuizMutation();
  const { data: videos } = useGetVideosQuery();

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [selected_video, setSelected_Video] = useState({
    video_id: "",
    video_title: "",
  });

  const [correctOption, setCorrectOption] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  // set initial form data when edited data is loaded
  useEffect(() => {
    if (initialData && initialData.id) {
      setIsUpdate(true);
      setFormData({
        question: initialData.question,
        option1: initialData.options[0].option,
        option2: initialData.options[1].option,
        option3: initialData.options[2].option,
        option4: initialData.options[3].option,
      });
      setSelected_Video({
        video_id: initialData.video_id,
        video_title: initialData.video_title,
      });
      setCorrectOption(
        initialData.options.find((option) => option.isCorrect).id
      );
    }
  }, [initialData]);

  // if add or delete successfully navigate to quizzes page
  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      navigate("/quizzes");
    }
  }, [isSuccess, navigate, isEditSuccess]);

  // handle input form value change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // setLocalError if correct option and video is not selected
    if (!correctOption && !selected_video.video_id) {
      setLocalError("Please select video and correct option");
      return;
    } else if (!correctOption) {
      setLocalError("Please select an correct option");
      return;
    } else if (!selected_video.video_id) {
      setLocalError("Please select a video");
      return;
    }

    // data send to backend
    const { question, option1, option2, option3, option4 } = formData;
    const data = {
      question,
      options: [
        { id: 1, option: option1, isCorrect: correctOption === 1 },
        { id: 2, option: option2, isCorrect: correctOption === 2 },
        { id: 3, option: option3, isCorrect: correctOption === 3 },
        { id: 4, option: option4, isCorrect: correctOption === 4 },
      ],
      ...selected_video,
      createdAt: new Date(),
    };

    if (isUpdate) {
      editQuiz({ id: initialData.id, data });
    } else {
      addQuiz(data);
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
          >
            <option value="" hidden>
              Please select video for quiz
            </option>
            {videos?.map((video) => (
              <option
                key={video.id}
                value={JSON.stringify({
                  video_id: video.id,
                  video_title: video.title,
                })}
                selected={video.id === selected_video.video_id}
              >
                {video.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="question" className="sr-only">
            Question
          </label>
          <input
            value={formData.question}
            onChange={handleChange}
            id="question"
            name="question"
            type="text"
            required
            className="login-input h-10 rounded-t-md"
            placeholder="Question"
          />
        </div>
        <div>
          {[1, 2, 3, 4].map((optionNumber) => (
            <div key={optionNumber}>
              <label htmlFor={`option${optionNumber}`} className="sr-only">
                Option {optionNumber}
              </label>
              <input
                value={formData[`option${optionNumber}`]}
                onChange={handleChange}
                id={`option${optionNumber}`}
                name={`option${optionNumber}`}
                type="text"
                required
                className="login-input h-10"
                placeholder={`Option ${optionNumber}`}
              />
            </div>
          ))}
        </div>

        <h1 className="py-2 font-medium">Select Correct Option:</h1>

        {/* select correct option */}
        <fieldset className="flex flex-wrap gap-2 pb-4">
          <legend className="sr-only">Correct Option</legend>

          {["Option 1", "Option 2", "Option 3", "Option 4"].map(
            (option, index) => (
              <div key={index}>
                <label
                  htmlFor={`select_option${index + 1}`}
                  className={`flex cursor-pointer items-center justify-center rounded-md bg-slate-800 px-3 py-2 text-gray-100 ${
                    correctOption === index + 1
                      ? "border-violet-600 bg-violet-600 text-white"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="ColorOption"
                    value={`select_option${index + 1}`}
                    id={`select_option${index + 1}`}
                    className="sr-only"
                    checked={correctOption === index + 1}
                    onChange={() => setCorrectOption(index + 1)}
                  />
                  <p className="text-sm font-medium select-none">{option}</p>
                </label>
              </div>
            )
          )}
        </fieldset>
      </div>

      <div>
        <button
          disabled={isLoading || isEditLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium select-none rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          {isLoading || isEditLoading
            ? "Loading..."
            : isUpdate
            ? "Update Quiz"
            : "Add Quiz"}
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
