import { collection, getDocs, query, where } from "firebase/firestore";
import firebaseServices from "../../../firebase";

export default async function AsyncResponderMultiSelect({ nameId }) {
  const respondersQuery = query(
    collection(firebaseServices.firestoreDB, "responders"),
    where("is_assigned", "==", false),
    where("is_onduty", "==", true)
  );

  const availableResponders = (await getDocs(respondersQuery)).docs;

  return (
    <div>
      <label
        htmlFor={nameId}
        className="font-extralight italic flex flex-col gap-1 w-fit"
      >
        note: [shift + left click] in order to select more than one option
        <select name={nameId} id={nameId} multiple className="text-black">
          {availableResponders.map((responder, index) => {
            const id = responder.id;
            const vehicle_id = responder.get("vehicle_id");
            const vehicle_type = responder.get("vehicle_type");

            return (
              <option
                key={id}
                value={JSON.stringify({
                  id,
                  vehicle_id,
                  vehicle_type,
                })}
              >
                {vehicle_id} ({String(vehicle_type).toUpperCase()})
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
