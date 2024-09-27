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
import { useRouter } from "next/navigation";
import firebaseServices from "../../../firebase.js";

// FIXME: useRouter no workie
const DispatchSidebar = () => {
  // TODO: cleanup
  // const [expanded, setExpanded] = useState(true);
  // const [mobile, setMobile] = useState(false);
  // const sidebar = useSidebar();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEmergencies, setActiveEmergencies] = useState([]);

  const q = query(
    collection(firebaseServices.firestoreDB, "emergency_requests"),
    where("status", "==", 0),
    orderBy("created_on", "asc") // Order by creation time (descending)
  );

  // FIXME: Still causes crashes/freezes after a while
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const emergencies = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      emergencies.push({
        id: doc.id,
        callerName: data.caller.name,
        contact: data.caller.contact,
        details: data.details,
        reason: data.reason,
        address: data.location.address,
      });
    });
    setActiveEmergencies(emergencies);
  });

  useEffect(() => {
    // detaches listener on unmount
    return () => unsubscribe();
  }, []);

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
                withRing={false}
                className="border-0 text-left justify-start p-3 hover:bg-zinc-800"
                onClick={() => setOpen(true)}
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
              <span className="font-semibold">Rewind-UI</span>
              <span>version x.y.z</span>
            </div>
          </Sidebar.Footer>
        </Sidebar>
        <Drawer
          position="left"
          // className="relative"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Card className="w-full" bordered={false}>
            <Card.Header className="bg-slate-50">
              <h3 className="text-lg text-slate-800 font-medium">
                Emergencies
              </h3>
            </Card.Header>

            <Card.Body>
              <div className="flex flex-col space-y-4 md:w-[30rem] mx-auto">
                {activeEmergencies.map((emergency) => (
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setModalOpen(true);
                    }}
                    className="h-full text-black p-2 active:bg-orange-300"
                    color="white"
                    key={emergency.callerName}
                  >
                    Name: {emergency.callerName}, Number: {emergency.contact},
                    <Badge radius="base" className="bg-red-700">
                      {emergency.reason}
                    </Badge>
                  </Button>
                ))}
              </div>
            </Card.Body>

            <Card.Footer></Card.Footer>
          </Card>
        </Drawer>
      </div>
      {activeEmergencies.map((emergency) => (
        <Modal
          size="lg"
          position="bottom"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          key={emergency.callerName}
        >
          <Card className="text-black w-full">
            <Card.Header className="flex">
              <h3>Name: {emergency.callerName}</h3>
              <Badge radius="base" className="bg-red-700">
                {emergency.reason}
              </Badge>
            </Card.Header>
            <Card.Body>
              <p>Location: {emergency.address}</p>
              <p>No. {emergency.contact}</p>
              <p>Details: {emergency.details}</p>
            </Card.Body>
            <Card.Footer className="flex justify-items-end">
              <a href={`/assign?request=${emergency.id}`}>
                <Button
                  color="green"
                  shadow="base"
                  // onClick={() => router.push(`/assign?request=${emergency.id}`)}
                >
                  Assign
                </Button>
              </a>
            </Card.Footer>
          </Card>
        </Modal>
      ))}
    </>
  );
};

export default DispatchSidebar;
