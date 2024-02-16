import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  useGetAssignmentByStudentQuery,
  useGetAssignmentByVideoQuery,
} from "../redux/features/assignment/assignmentApi";
import {
  useGetQuizByStudentQuery,
  useGetQuizByVideoQuery,
} from "../redux/features/quiz/quizApi";
import { useGetVideoQuery } from "../redux/features/videos/videosApi";
import { formatDate } from "../utils/formateDate";
import AssignmentModal from "./AssignmentModal";

const Video = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: video = {}, isLoading, isError } = useGetVideoQuery(params.id);
  const { data: assignment = [] } = useGetAssignmentByVideoQuery(video.id);
  const { data: quiz = [] } = useGetQuizByVideoQuery(video.id);
  const { data: submittedAssignment = [] } = useGetAssignmentByStudentQuery(
    user.id
  );
  const { data: submittedQuiz = [] } = useGetQuizByStudentQuery(user.id);

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
                  to="#"
                  className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  কুইজে অংশগ্রহণ করুন
                </Link>
              ) : (
                <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                  কুইজে দিয়েছেন
                </button>
              )
            ) : (
              <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                কুইজ নেই
              </button>
            )}
          </div>
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
        user={user}
        openModal={openModal}
        setOpenModal={setOpenModal}
        video={video}
        assignment={assignment}
      />
    </div>
  );
};

export default Video;
