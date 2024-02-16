import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0 ">
        <h1 className="text-4xl font-bold my-4 text-center">
          You can go to other pages from here
        </h1>

        <div className="grid grid-cols-2 gap-5 mt-8">
          <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
            <h1 className="text-slate-100 font-bold text-xl">Student Portal</h1>
            <div className="space-y-2 mt-4 flex flex-col">
              <Link className="link" to="/course-player">
                Course Player
              </Link>
              <Link to="/leaderboard" className="link">
                Leaderboard
              </Link>
              <Link to="/quiz" className="link">
                Quiz
              </Link>
              <Link to="/login" className="link">
                StudentLogin
              </Link>
              <Link to="/register" className="link">
                Student Register
              </Link>
            </div>
          </div>
          <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
            <h1 className="text-slate-100 font-bold text-xl">Admin Portal</h1>
            <div className="space-y-2 mt-4 flex flex-col">
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>
              <Link to="/login" className="link">
                AdminLogin
              </Link>
              <Link to="/assignment" className="link">
                Assignment
              </Link>
              <Link to="/assignment-mark" className="link">
                AssignmentMark
              </Link>
              <Link to="/quizzes" className="link">
                Quizzes
              </Link>
              <Link to="/videos" className="link">
                Videos
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
            <h1 className="text-slate-100 font-bold text-xl">Admin Email</h1>
            <div className="space-y-2 mt-4 flex flex-col">
              <p>Email : admin@learnwithsumit.com</p>
              <p>Password : lws@123456</p>
            </div>
          </div>

          <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
            <h1 className="text-slate-100 font-bold text-xl">Student Email</h1>
            <div className="space-y-2 mt-4 flex flex-col">
              <p>Email : akash.ahmed@learnwithsumit.com</p>
              <p>Email : md.salahuddin@learnwithsumit.com</p>
              <p>Email : ferdous.shohag@learnwithsumit.com</p>
              <p>Email : riyadh.vai@learnwithsumit.com</p>
              <p>Email : saad.hasan@learnwithsumit.com</p>
              <p>Password : lws@123456</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
