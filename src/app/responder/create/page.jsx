"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import firebaseServices from "../../../../firebase";

import { Input, Select, Button, Modal } from "@rewind-ui/core";

export default function CreateResponderPage() {
  const router = useRouter();

  async function onFormSubmit(formData) {
    const responderData = {
      vehicle_id: formData.get("vehicle_id"),
      vehicle_type: formData.get("vehicle_type"),
      is_onduty: false,
      is_assigned: false,
    };

    if (formData.get("account_password") !== formData.get("confirm_password")) {
      alert("Confirm password is not the same!");
      return;
    }

    const user = await createResponderAccount(
      formData.get("account_email"),
      formData.get("account_password")
    );

    await storeResponderData(user.uid, responderData);

    return router.replace("/");
  }

  async function createResponderAccount(email, password) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        firebaseServices.auth,
        email,
        password
      );
      return userCredentials.user;
    } catch (error) {
      alert("Failed to create responder account");
      throw error;
    }
  }

  async function storeResponderData(userId, responderData) {
    try {
      const responderRef = doc(
        firebaseServices.firestoreDB,
        "responders",
        userId
      );

      // write data to firestore
      await setDoc(responderRef, responderData);
    } catch (error) {
      alert("Failed to upload responder data");
      throw error;
    }
  }

  // TODO: improve UI design
  return (
    <form
      id="create-responder-form"
      action={onFormSubmit}
      className="flex flex-col w-fit text-sky-700"
    >
      {/* <input
        type="text"
        name="vehicle_id"
        id="vehicle_id"
        required
        placeholder="Vehicle ID (ex: ABC 1234)"
      /> */}
      <Input
        name="vehicle_id"
        id="vehicle_id"
        shadow="sm"
        tone="solid"
        radius="sm"
        withRing={false}
        required
        placeholder="Vehicle ID (ex: ABC 1234)"
      />
      {/* <select
        name="vehicle_type"
        id="vehicle_type"
        form="create-responder-form"
        required
      >
        <option value="fire truck">Fire Truck</option>
        <option value="ambulance">Ambulance</option>
        <option value="usar vehicle">Search and Rescue Vehicle</option>
      </select> */}
      <Select
        shadow="sm"
        tone="solid"
        name="vehicle_type"
        id="vehicle_type"
        radius="sm"
        withRing={false}
      >
        <option value="fire truck">Fire Truck</option>
        <option value="ambulance">Ambulance</option>
        <option value="usar vehicle">Search and Rescue Vehicle</option>
      </Select>
      {/* <input
        type="text"
        name="vehicle_type"
        id="vehicle_type"
        required
        placeholder="Vehicle Type"
      /> */}
      {/* <input
        type="text"
        name="account_email"
        id="account_email"
        required
        placeholder="Account E-mail"
      /> */}
      <Input
        placeholder="Account E-mail"
        name="account_email"
        id="account_email"
        shadow="sm"
        tone="solid"
        radius="sm"
        withRing={false}
        required
      />
      {/* <input
        type="text"
        name="account_password"
        id="account_password"
        required
        placeholder="Account Password"
      /> */}
      <Input
        placeholder="Account Password"
        name="account_password"
        id="account_password"
        shadow="sm"
        tone="solid"
        radius="sm"
        withRing={false}
        required
      />
      {/* <input
        type="text"
        name="confirm_password"
        id="confirm_password"
        required
        placeholder="Confirm Password"
      /> */}
      <Input
        placeholder="Confirm Password"
        name="confirm_password"
        id="confirm_password"
        shadow="sm"
        tone="solid"
        radius="sm"
        withRing={false}
        required
      />
      <Button
        color="green"
        shadow="base"
        withRing={false}
        type="submit"
        radius="md"
      >
        Click me!
      </Button>
    </form>
  );
}
