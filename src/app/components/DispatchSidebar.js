import { SvgIcon } from "@mui/material";
import { Badge, Button, Card, Drawer, Modal, Sidebar } from "@rewind-ui/core";
import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import firebaseServices from "../../../firebase.js";

// FIXME: useRouter no workie
const DispatchSidebar = () => {
  // TODO: cleanup
  // const [expanded, setExpanded] = useState(true);
  // const [mobile, setMobile] = useState(false);
  // const sidebar = useSidebar();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingEmergencies, setPendingEmergencies] = useState([]);
  const [activeEmergencies, setActiveEmergencies] = useState([]);
  const [selectedEmergencyType, setSelectedEmergencyType] = useState("pending"); // new state
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  // Firestore query for pending emergencies

  const pendingQ = query(
    collection(firebaseServices.firestoreDB, "emergency_requests"),
    where("status", "==", 0),
    orderBy("created_on", "asc")
  ); // Firestore query for active emergencies

  const activeQ = query(
    collection(firebaseServices.firestoreDB, "emergency_requests"),
    where("status", "==", 1), // Assuming status '1' indicates active emergencies
    orderBy("created_on", "asc")
  ); // Snapshot listener for pending emergencies

  // TODO: monitor firestore/RTDB reads
  useEffect(() => {
    const unsubPending = onSnapshot(pendingQ, (querySnapshot) => {
      const pendingEntries = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        pendingEntries.push({
          id: doc.id,
          callerName: data.caller.name,
          contact: data.caller.contact,
          details: data.details,
          reason: data.reason,
          address: data.location.address,
        });
      });
      setPendingEmergencies(pendingEntries);
    });

    return () => unsubPending();
  }, []);

  // TODO: monitor firestore/RTDB reads
  useEffect(() => {
    const unsubActive = onSnapshot(activeQ, (querySnapshot) => {
      const activeEntries = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        activeEntries.push({
          id: doc.id,
          callerName: data.caller.name,
          contact: data.caller.contact,
          details: data.details,
          reason: data.reason,
          address: data.location.address,
        });
      });
      setActiveEmergencies(activeEntries);
    });

    return () => unsubActive();
  }, []);

  const handleOpenDrawer = (type) => {
    setSelectedEmergencyType(type);
    setOpen(true);
  };

  const handleOpenModal = (emergency) => {
    setSelectedEmergency(emergency); // Set the clicked emergency
    setModalOpen(true);
  };

  const emergenciesToDisplay =
    selectedEmergencyType === "pending"
      ? pendingEmergencies
      : activeEmergencies;

  return (
    <>
      <div className="absolute z-40 h-full">
        <Sidebar color="zinc" className="absolute">
          <Sidebar.Head>
            <Sidebar.Head.Title>Welcome!</Sidebar.Head.Title>
            {/* <Sidebar.Head.Toggle /> */}
          </Sidebar.Head>

          <Sidebar.Nav>
            <Sidebar.Nav.Section>
              <Button
                color="#19191B"
                radius="none"
                className="border-0 text-left justify-start p-3 hover:bg-zinc-800"
                onClick={() => handleOpenDrawer("pending")} // Set to pending
              >
                <SvgIcon className="m-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 256 256"
                    fill="none"
                    id="my-svg"
                  >
                    <defs>
                      <linearGradient id="gradient1">
                        <stop class="stop1" offset="0%" stop-color="#8f66ff" />
                        <stop
                          class="stop2"
                          offset="100%"
                          stop-color="#3d12ff"
                        />
                      </linearGradient>
                    </defs>

                    <g id="group" transform="translate(0,0) scale(1)">
                      <path
                        d="M32 80S32 53.333 42.667 42.667s21.333 -10.667 21.333 -10.667m160 48S224 53.333 213.333 42.667s-21.333 -10.667 -21.333 -10.667M85.333 192c4.885 18.4 22.133 32 42.667 32 20.533 0 37.771 -13.6 42.667 -32"
                        stroke="#f32b0d"
                        stroke-width="14"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        id="secondary"
                      />
                      <path
                        d="M53.333 106.667a74.667 74.667 0 0 1 74.667 -74.667v0a74.667 74.667 0 0 1 74.667 74.667v37.632a21.333 21.333 0 0 0 2.251 9.536l11.36 22.72A10.667 10.667 0 0 1 206.741 192H49.259a10.667 10.667 0 0 1 -9.536 -15.435l11.36 -22.72A21.333 21.333 0 0 0 53.333 144.288V106.667Z"
                        stroke="#fcfcfc"
                        stroke-width="14"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        id="primary"
                      />
                    </g>
                  </svg>
                </SvgIcon>
                Pending Requests
              </Button>
              <Button
                color="#19191B"
                radius="none"
                className="border-0 text-left justify-start p-3 hover:bg-zinc-800"
                onClick={() => handleOpenDrawer("active")} // Set to active
              >
                <SvgIcon className="m-2 mr-3">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      // opacity="0.5"
                      d="M20 22V16C20 13.1997 20 11.7996 19.455 10.73C18.9757 9.78924 18.2108 9.02433 17.27 8.54497C16.2004 8 14.8003 8 12 8C9.19974 8 7.79961 8 6.73005 8.54497C5.78924 9.02433 5.02433 9.78924 4.54497 10.73C4 11.7996 4 13.1997 4 16V22"
                      stroke="#FFFFFF"
                      stroke-width="1.5"
                    />
                    <path
                      d="M15 10.8149C16.23 10.8149 17.23 11.77 17.1851 13"
                      stroke="#F32B0D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M2 22H22"
                      stroke="#F32B0D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M12 2V5"
                      stroke="#F32B0D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M21 5L19.5 6.5"
                      stroke="#F32B0D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M3 5L4.5 6.5"
                      stroke="#F32B0D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M13.5 17.5C13.5 18.3284 12.8284 19 12 19C11.1716 19 10.5 18.3284 10.5 17.5C10.5 16.6716 11.1716 16 12 16C12.8284 16 13.5 16.6716 13.5 17.5Z"
                      stroke="#FFFFFF"
                      stroke-width="1.5"
                    />
                    <path
                      // opacity="0.5"
                      d="M12 19V22"
                      stroke="#FFFFFF"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </SvgIcon>
                Active Emergencies
              </Button>
            </Sidebar.Nav.Section>

            <Sidebar.Nav.Section>
              <Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
              <Sidebar.Nav.Section.Item
                label="Create Responder Account"
                href="/responder/create"
              />
            </Sidebar.Nav.Section>

            <Sidebar.Nav.Section>
              <Sidebar.Separator />
              <Sidebar.Nav.Section.Item label="Settings" href="#" />
            </Sidebar.Nav.Section>
          </Sidebar.Nav>

          <Sidebar.Footer>
            <div className="flex flex-col justify-center items-center text-sm">
              <span className="font-semibold">Ateneo de Davao University</span>
              <span>version x.y.z</span>
            </div>
          </Sidebar.Footer>
        </Sidebar>
        <Drawer position="left" open={open} onClose={() => setOpen(false)}>
          <Card className="w-full" bordered={false}>
            <Card.Header className="bg-slate-50">
              <h3 className="text-lg text-slate-800 font-medium">
                {selectedEmergencyType === "pending"
                  ? "Pending Emergencies"
                  : "Active Emergencies"}
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="flex flex-col space-y-4 md:w-[30rem] mx-auto">
                {emergenciesToDisplay.map((emergency) => (
                  <Button
                    onClick={() => {
                      handleOpenModal(emergency);
                      setOpen(false);
                    }}
                    className="h-full text-black p-2 active:bg-orange-300"
                    color="white"
                    key={emergency.id}
                  >
                    Name: {emergency.callerName}, Number: {emergency.contact},
                    <Badge radius="base" className="bg-red-700">
                      {emergency.reason}
                    </Badge>
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Drawer>
      </div>
      {selectedEmergency && (
        <Modal
          size="lg"
          position="bottom"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Card className="text-black w-full">
            <Card.Header className="flex">
              <h3>Name: {selectedEmergency.callerName}</h3>
              <Badge radius="base" className="bg-red-700">
                {selectedEmergency.reason}
              </Badge>
            </Card.Header>
            <Card.Body>
              <p>Location: {selectedEmergency.address}</p>
              <p>No. {selectedEmergency.contact}</p>
              <p>Details: {selectedEmergency.details}</p>
            </Card.Body>
            <Card.Footer className="flex justify-items-end">
              <a href={`/assign?request=${selectedEmergency.id}`}>
                <Button color="green" shadow="base">
                  Assign
                </Button>
              </a>
            </Card.Footer>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default DispatchSidebar;
