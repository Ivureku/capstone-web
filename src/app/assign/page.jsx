"use client";

import { ref, update } from "firebase/database";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import firebaseServices from "../../../firebase";
import AsyncResponderMultiSelect from "../components/AsyncResponderMultiSelect";
import RequestDetailsCard from "../components/RequestDetailsCard";

export default function AssignResponderPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const requestId = searchParams.get("request");

  async function onFormSubmit(formData) {
    const responders = formData.getAll("selected_responders");

    console.log(responders);

    if (responders === null || responders.length < 2) {
      alert("Please select at least two (2) responders");
      return;
    }

    assignResponders(responders, requestId);

    return router.replace("/");
  }

  // TODO: possibly make it so that if function is interrupted (e.g. internet loss) it will be rolled back to before updates are made
  async function assignResponders(responders, assignment) {
    const requestRef = doc(
      firebaseServices.firestoreDB,
      "emergency_requests",
      assignment
    );

    try {
      for (const responder of responders) {
        const responderData = JSON.parse(responder);
        const responderId = responderData.id;
        const responderRef = doc(
          firebaseServices.firestoreDB,
          "responders",
          responderId
        );

        // Updates assigned emergency request in firestore to include responders' information
        await updateDoc(requestRef, {
          responder_ids: arrayUnion(responderId),
          responders: arrayUnion(responderData),
        });

        // Updates responders's entries in real-time database to reference the emergency request's ID
        const responderRTDBRef = ref(
          firebaseServices.db,
          `location/${responderId}`
        );
        await update(responderRTDBRef, {
          emergency_request: assignment,
        });

        // Updates responders' entries in the requests collection in firestore to reflect the status of the responder
        await updateDoc(responderRef, {
          is_assigned: true,
        });

        // Updates status of the emergency request to 1 (in-progress/approved)
        await updateDoc(requestRef, {
          status: 1,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to complete updates!");
    }
  }

  // FIXME: fix page stopping if pressing the submit button too early after page load
  return (
    <div className="flex flex-col gap-7">
      <Suspense fallback={<p>Loading...</p>}>
        <RequestDetailsCard requestId={requestId} />
      </Suspense>

      <Suspense fallback={<p>Searching for available responders...</p>}>
        <form action={onFormSubmit}>
          <AsyncResponderMultiSelect nameId="selected_responders" />
          <button type="submit">Submit</button>
        </form>
      </Suspense>
    </div>
  );
}
