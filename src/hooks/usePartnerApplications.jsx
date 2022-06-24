import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const usePartnerApplications = () => {
  const [partnerApplications, setPartnerApplications] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchPartnerApplications = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/partner-application-forms/all`,
          {
            method: "GET",
            // body: JSON.stringify({ ...values }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();

        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setPartnerApplications(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPartnerApplications();
  }, [isMounted, realtime]);
  return {
    partnerApplications,
    setRealtime,
  };
};

export default usePartnerApplications;
