import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchSupports = async () => {
      try {
        const response = await fetch(`${BASE_URL}/notifications/all`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        isMounted.current && setNotifications(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSupports();
  }, [isMounted, realtime]);
  return {
    notifications,
    setRealtime,
  };
};

export default useNotifications;
