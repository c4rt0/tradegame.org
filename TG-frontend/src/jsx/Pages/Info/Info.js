import React from "react";
import { Navbar } from "../../Components/SubComponents/Navbar/navbar";
import { isAuthenticated } from "./../../../Store/selectors/authSelector";
import Layout from "./../../Components/DashboardComponents/Layout/Layout";
export const Info = () => {
  return (
    <div>
      {isAuthenticated() ? (
        <Layout>
          <div>
            <h1 className="text-xl text-black font-semibold italic">
              What is Lorem Ipsum?
            </h1>
            <p className="font-semibold italic">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </Layout>
      ) : (
        <div>
          <Navbar />
          <div className="px-10 py-20 bg-white">
            <div>
              <h1 className="text-xl text-black font-semibold italic">
                What is Lorem Ipsum?
              </h1>
              <p className="font-semibold italic">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
