import Head from "next/head";
import firebase from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());

  console.log(user);

  return (
    <div className="">
      <Head>
        <title>Vote Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
