import React from "react";
import { UsersTable } from "../../Components/DashboardComponents/AdminPageComponents/usersTable";
import Layout from "../../Components/DashboardComponents/Layout/Layout";

export const AdminPage = () => {
  return (
    <Layout>
      <UsersTable></UsersTable>
    </Layout>
  );
};
