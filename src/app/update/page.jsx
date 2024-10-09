"use client";

import { Button } from "@rewind-ui/core";
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

    if (responders === null || responders.length < 1) {
      alert("Please select at least one (1) responders");
      return;
    }

    assignResponders(responders, requestId);

    return router.replace("/");

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
  }
  return (
    <div className="flex flex-col gap-7 items-center justify-center h-[50vh] mt-10">
      <Suspense fallback={<p>Loading...</p>}>
        <RequestDetailsCard requestId={requestId} />
      </Suspense>

      <Suspense fallback={<p>Searching for available responders...</p>}>
        <form action={onFormSubmit}>
          <AsyncResponderMultiSelect nameId="selected_responders" />
          <Button className="mt-2 bg-orange-400" type="submit">
            Update
          </Button>
        </form>
      </Suspense>
    </div>
  );
}
