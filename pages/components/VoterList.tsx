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
    <div className="flex">
      <img src={user?.data()?.photoURL} alt="user" />
      <div>{user?.data()?.displayName}</div>
      <div>Voted: {vote === true ? "✔️" : "❌"}</div>
    </div>
  );
};

export default VoterList;
