import { doc, getDoc, Timestamp } from "firebase/firestore";
import firebaseServices from "../../../firebase";

export default async function RequestDetailsCard({ requestId }) {
  const requestRef = doc(
    firebaseServices.firestoreDB,
    "emergency_requests",
    requestId
  );

  const request = await getDoc(requestRef);
  const timestamp = request.get("created_on");
  const createdOn = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  ).toDate();
  const requestDetails = {
    callerName: request.get("caller.name"),
    contact: request.get("caller.contact"),
    requestDetails: request.get("details"),
    address: request.get("location.address"),
    emergencyType: request.get("reason"),
    createdOn: createdOn.toLocaleString(),
  };

  return (
    <div>
      <p>
        <span className="font-bold">Name:</span> {requestDetails.callerName}
      </p>
      <p>
        <span className="font-bold">Contact:</span> {requestDetails.contact}
      </p>
      <p>
        <span className="font-bold">Details:</span>{" "}
        {requestDetails.requestDetails}
      </p>
      <p>
        <span className="font-bold">Address:</span> {requestDetails.address}
      </p>
      <p>
        <span className="font-bold">Emergency Type:</span>{" "}
        {requestDetails.emergencyType}
      </p>
      <p>
        <span className="font-bold">Request created on:</span>{" "}
        {requestDetails.createdOn}
      </p>
    </div>
  );
}
