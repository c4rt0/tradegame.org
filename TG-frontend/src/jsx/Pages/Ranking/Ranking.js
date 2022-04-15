import React from "react";
import { RankingTable } from "../../Components/DashboardComponents/RankingComponents/rankingTable";
import { Navbar } from "../../Components/SubComponents/Navbar/navbar";
import { isAuthenticated } from "./../../../Store/selectors/authSelector";
import Layout from "./../../Components/DashboardComponents/Layout/Layout";
export const Ranking = () => {
  return (
    <div>
      {isAuthenticated() ? (
        <Layout>
          <RankingTable />
        </Layout>
      ) : (
        <div>
          <Navbar />
          <div className="px-10 py-20 bg-white">
            <RankingTable />
          </div>
        </div>
      )}
    </div>
  );
};
