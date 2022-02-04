import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const { isMounted } = useIsMounted();
  const [realtime, setRealtime] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/accounts`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        const arr = await response.json();
        const sortArr = arr?.success?.data?.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        isMounted.current && setUsers(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [isMounted, realtime]);
  return {
    users,
    setRealtime,
  };
};

export default useUsers;
