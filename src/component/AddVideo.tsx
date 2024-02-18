import VideoForm from "./VideoForm";

const AddVideo = () => {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto w-[30rem] px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="/assets/image/learningportal.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Add A New Video
          </h2>
        </div>
        <VideoForm />
      </div>
    </section>
  );
};

export default AddVideo;
