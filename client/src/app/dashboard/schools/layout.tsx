import GoBack from "@/components/layout/GoBack";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:container">
      {/* {Go Back Link with icon} */}
      {/* <GoBack />
      <br /> */}
      <br />
      <br />

      {children}
      <br />
      <br />
    </div>
  );
};

export default layout;
