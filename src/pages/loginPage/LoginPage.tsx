import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-semibold">Friends Tracker Admin</h1>
      <div className="w-10/12 sm:w-8/12 md:w-5/12 xl:w-3/12">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
