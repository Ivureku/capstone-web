"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AsyncResponderMultiSelect from "../components/AsyncResponderMultiSelect";
import RequestDetailsCard from "../components/RequestDetailsCard";

export default function AssignResponderPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const requestId = searchParams.get("request");

  async function onFormSubmit(formData) {
    // TODO: implement form logic
    const data = formData.get("selected_responders");
    const responders = [JSON.parse(data)];

    if (responders === null || responders.length < 2) {
      alert("Please select at least two (2) responders");
      return;
    }

    return router.replace("/");
  }

  // TODO: fix page breaking if pressing the submit button too early after page load
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
