import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useDashboardStatistics = () => {
  const [adminData, setAdminData] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/admin`, {
        method: "GET",
        // body: JSON.stringify({ ...values }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const arr = await response.json();

      isMounted.current && setAdminData(arr?.data);
    } catch (error) {
      console.log(error);
    }
  }, [isMounted]);
  useEffect(() => {
    fetchData();
    return () => {
      isMounted.current = false;
      setAdminData(null);
    };
  }, [isMounted, fetchData, realtime]);
  return {
    adminData,
    setRealtime,
  };
};

export default useDashboardStatistics;
