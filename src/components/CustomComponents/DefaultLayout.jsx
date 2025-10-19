import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
