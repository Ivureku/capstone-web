import React from "react";
import { Sidebar, useSidebar } from "@rewind-ui/core";
import { Emergencies } from "../icons/Emergencies.js";

const DispatchSidebar = () => {
  // const [expanded, setExpanded] = useState(true);
  // const [mobile, setMobile] = useState(false);
  // const sidebar = useSidebar();

  return (
    <div className="absolute z-40 h-full">
      <Sidebar color="zinc" className="absolute">
        <Sidebar.Head>
          <Sidebar.Head.Title>Welcome!</Sidebar.Head.Title>
          <Sidebar.Head.Toggle />
        </Sidebar.Head>

        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item
              icon={<Emergencies />}
              label="Emergencies"
              href="#"
              active
            />
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item
              // icon={<Briefcase />}
              label="Stations"
              href="#"
            />
            {/* <Sidebar.Nav.Section.Item
              // icon={<Users />}
              label="Users"
              as="button"
            >
              <Sidebar.Nav.Section isChild>
                <Sidebar.Nav.Section.Item
                  // icon={<span className="w-1 h-1 rounded bg-transparent" />}
                  label="List all"
                  href="#"
                />
                <Sidebar.Nav.Section.Item
                  // icon={<span className="w-1 h-1 rounded bg-transparent" />}
                  label="Add new"
                  href="#"
                />
                <Sidebar.Nav.Section.Item
                  // icon={<span className="w-1 h-1 rounded bg-transparent" />}
                  label="Archived"
                  href="#"
                />
              </Sidebar.Nav.Section>
            </Sidebar.Nav.Section.Item> */}
            {/* <Sidebar.Nav.Section.Item
              // icon={<Shield />}
              label="Roles"
              href="#"
            />
            <Sidebar.Nav.Section.Item
              // icon={<Key />}
              label="Permissions"
              href="#"
            />
            <Sidebar.Nav.Section.Item
              // icon={<Sliders />}
              label="Settings"
              href="#"
            /> */}
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            {/* <Sidebar.Nav.Section.Title>Support</Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item
              // icon={<LifeRing />}
              label="Contact"
              href="#"
            /> */}
            {/* <Sidebar.Nav.Section.Item
              // icon={<EnvelopeOpen />}
              label="Tickets"
              href="#"
            /> */}
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
      {/* <p>dagan na pls whahaha</p>
      <Emergencies></Emergencies> */}
    </div>
  );
};

export default DispatchSidebar;
