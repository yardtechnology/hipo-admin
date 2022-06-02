import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useSupports = () => {
  const [supports, setSupports] = useState([]);
  console.log(supports);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  const fetchSupports = useCallback(
    async (pageSize, page) => {
      try {
        console.log(pageSize, page);
        const response = await fetch(`${BASE_URL}/support-forms/all`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setSupports(sortArr);
        return sortArr;
      } catch (error) {
        console.log(error);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    fetchSupports();
  }, [fetchSupports, isMounted, realtime]);
  return {
    supports,
    setRealtime,
    fetchSupports,
  };
};

export default useSupports;
