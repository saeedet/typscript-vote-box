import Head from "next/head";
import firebase from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Auth from "./components/Auth";
import VoterList from "./components/VoterList";

export default function Home() {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [votes, votesLoading, votesError] = useCollection(
    db.collection("votes")
  );

  const addVote = async (vote: boolean) => {
    await db.collection("votes").doc(user.uid).set({
      vote,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-2 min-h-screen w-screen bg-gray-200 ">
      <Head>
        <title>Vote Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? (
        <>
          <div className="space-x-2 flex">
            <div className="bg-green-400 px-2 rounded-full">
              {votes?.docs?.filter((doc) => doc.data().vote === true).length}
            </div>
            <div className="bg-red-400 px-2 rounded-full">
              {votes?.docs?.filter((doc) => doc.data().vote === false).length}
            </div>
          </div>
          <div className=" p-10 bg-white flex items-center justify-center  rounded-md">
            <p className="text-lg font-bold">
              Do you agree with legalizing Weed in Australia??
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => addVote(true)}
              className="font-semibold bg-green-400 px-2 active:bg-green-800 rounded-md hover:shadow-md active:shadow-none"
            >
              YES
            </button>
            <button
              onClick={() => addVote(false)}
              className="font-semibold bg-red-400 px-2 active:bg-red-800 rounded-md  hover:shadow-md active:shadow-none"
            >
              NO
            </button>
          </div>
          <div className="font-bold text-xl pt-10 pb-5">Voters:</div>
          <div className="space-y-2">
            {votes?.docs?.map((doc) => (
              <VoterList key={doc.id} id={doc.id} vote={doc.data().vote} />
            ))}
          </div>
        </>
      ) : (
        <Auth loading={loading} />
      )}
    </div>
  );
}
