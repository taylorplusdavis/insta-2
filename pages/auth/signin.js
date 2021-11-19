import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

//Browser....
function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 bg-gray-50">
        <img
          className="w-80"
          src="https://links.papareact.com/ocw"
          alt="logo"
        />
        <p className="italic font-bold">
          Not a real app, it is for educational purposes only.
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="p-3 mt-32 bg-blue-500 rounded-lg text-white shadow-lg"
              onClick={() =>
                SignIntoProvider(provider.id, { callbackUrl: "/" })
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

//Server....
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
