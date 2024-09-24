"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AsyncResponderMultiSelect from "../components/AsyncResponderMultiSelect";
import RequestDetailsCard from "../components/RequestDetailsCard";

export default function AssignResponderPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const requestId = searchParams.get("request");

  async function onFormSubmit(formData) {
    // TODO: implement form logic
    const responders = formData.get("selected_responders");
    console.log(JSON.parse(responders));

    if (responders === null) {
      // do nothing
    }

    return router.replace("/");

    // console.log(formData.get("selected_responders"));
  }

  // TODO: fix page breaking if pressing the submit button too early after page load
  return (
    <div className="flex flex-col gap-7">
      <RequestDetailsCard requestId={requestId} />

      <form action={onFormSubmit}>
        <AsyncResponderMultiSelect nameId="selected_responders" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
