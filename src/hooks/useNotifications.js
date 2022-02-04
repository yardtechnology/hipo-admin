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
        const response = await fetch(
          `${BASE_URL}/notification/all-notification/61ee88a7f8d72eecd9f6c6f5`,
          {
            // method: "GET",
            // body: JSON.stringify({ ...values }),
            // headers: {
            //   "Content-Type": "application/json",
            // },
          }
        );
        const arr = await response.json();
        const sortArr = arr?.success?.data?.sort(
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
