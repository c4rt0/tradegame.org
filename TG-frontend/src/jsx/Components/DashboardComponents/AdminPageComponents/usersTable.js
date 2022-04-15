import React, { useEffect, useState } from "react";
import TableHeader from "../../SubComponents/Table/TableHeader";
import { usersColumns } from "./usersColumns";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersList } from "../../../../Store/Actions/Auth/authAction";
import ModalComp from "./../../SubComponents/ModalComp";
import { UpdateUserModal } from "./UpdateUserModal";
export const UsersTable = () => {
  const [usersList, setUsersList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});
  let dispatch = useDispatch();
  const users = useSelector((state) => state.auth.usersList);
  useEffect(() => {
    dispatch(getAllUsersList());
  }, [dispatch]);
  useEffect(() => {
    if (users) {
      setUsersList(users);
    }
  }, [users]);
  const handleTotalPortfolio = (user) => {
    var a = 0;
    if (user && user.portfolio) {
      Object.keys(user.portfolio).forEach((data) => {
        let b = user.portfolio[data].price * user.portfolio[data].shares;
        a = a + b;
      });
    }

    let t = a + user.cash;
    return t.toFixed(2);
  };
  const onRowClick = (data) => {
    setRowData(data);
    setOpenModal(true);
  };
  return (
    <div>
      <ModalComp
        open={openModal}
        close={() => {
          setOpenModal(false);
        }}
        width={500}
        height={530}
      >
        <UpdateUserModal
          data={rowData && rowData}
          setOpenModal={setOpenModal}
        ></UpdateUserModal>
      </ModalComp>
      <div className="shadow-sm w-full rounded-md border-1 border-gray_100 overflow-hidden p-0">
        <div className="p-4 w-full bg-white">
          <h1 className="font-semibold text-xl">All Users</h1>
        </div>
        <table className="overflow-auto w-full">
          <thead className="bg-gray_50 shadow-sm text-black font-normal">
            <TableHeader
              colNames={usersColumns}
              border={"border-0"}
              borderColor={""}
              font={"font-semibold"}
            />
          </thead>
          <tbody className="bg-white text-gray_500 text-sm text-center">
            {usersList &&
              usersList.map((user, index) => (
                <tr
                  key={index + 1}
                  onClick={() => {
                    onRowClick(user);
                  }}
                  className="cursor-pointer hover:bg-gray_50"
                >
                  <td className="px-4 py-5 font-bold">{index + 1}</td>
                  <td className="px-4 py-5 gap-x-4">{user.username}</td>
                  <td className="px-4 py-5">{user.email}</td>
                  <td className="px-4 py-5">$ {handleTotalPortfolio(user)}</td>
                  <td className="px-4 py-5">$ {user.cash.toFixed(2)}</td>
                  <td className="px-4 py-5">
                    {user.isLogIn ? "True" : "False"}
                  </td>
                  <td className="px-4 py-5">
                    <button
                      onClick={() => {
                        onRowClick(user);
                      }}
                      className="text-yellow_500 font-semibold duration-300 hover:text-xl"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
