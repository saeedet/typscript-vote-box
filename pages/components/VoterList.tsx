import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/firebase";

interface Props {
  id: string;
  vote: boolean;
}

const VoterList = ({ id, vote }: Props) => {
  const db = firebase.firestore();
  const [user, loading, error] = useDocument(db.doc(`user/${id}`));

  if (loading) <p className="font-bold text-md">Loading...</p>;
  if (error) null;

  return (
    <div className="flex space-x-2 items-center hover:bg-gray-100 cursor-pointer px-4 py-1 rounded-md">
      <img
        className="h-10 w-10 rounded-full ring-2 ring-white"
        src={user?.data()?.photoURL}
        alt="user"
      />
      <div className="flex flex-col justify-center ">
        <div className="font-bold">{user?.data()?.displayName}</div>
        <div className="text-sm font-semibold">
          Voted: {vote === true ? "✔️" : "❌"}
        </div>
      </div>
    </div>
  );
};

export default VoterList;
