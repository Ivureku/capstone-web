import { Suspense } from "react";

export default function AssignResponderLayout({ children }) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </div>
  );
}
