import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAssignmentByVideoQuery } from "../redux/features/assignment/assignmentApi";
import { useGetQuizByVideoQuery } from "../redux/features/quiz/quizApi";
import { useGetVideoQuery } from "../redux/features/videos/videosApi";
import { formatDate } from "../utils/formateDate";
import AssignmentModal from "./AssignmentModal";
import AssignmentQuizButton from "./AssignmentQuizButton";

const Video = () => {
  const params = useParams();
  const { data: video = {}, isLoading, isError } = useGetVideoQuery(params.id);
  const { data: assignment = [] } = useGetAssignmentByVideoQuery(params.id);
  const { data: quiz = [] } = useGetQuizByVideoQuery(params.id);

  const [openModal, setOpenModal] = useState(false);

  const formattedDate = formatDate(video?.createdAt);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Cannot get video!</p>;
  } else if (!isLoading && !isError) {
    content = (
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={video?.url}
          title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {video?.title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {formattedDate}
          </h2>

          <AssignmentQuizButton
            setOpenModal={setOpenModal}
            assignment={assignment}
            quiz={quiz}
          />
          <p className="mt-4 text-sm text-slate-400 leading-6">
            {video?.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 col-span-4">
      {content}
      <AssignmentModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        assignment={assignment}
      />
    </div>
  );
};

export default Video;
