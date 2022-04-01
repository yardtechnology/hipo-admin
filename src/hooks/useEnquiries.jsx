import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/enquiry-forms/all`, {
          method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setEnquiries(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEnquiries();
  }, [isMounted, realtime]);
  return {
    enquiries,
    setRealtime,
  };
};

export default useEnquiries;
