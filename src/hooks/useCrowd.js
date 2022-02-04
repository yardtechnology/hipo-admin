import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useCrowd = () => {
  const [crowd, setCrowd] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchCrowd = async () => {
      try {
        const response = await fetch(`${BASE_URL}/crowd/all-crowd`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        const arr = await response.json();
        const sortArr = arr?.success.data?.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        isMounted.current && setCrowd(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCrowd();
  }, [isMounted, realtime]);
  return {
    crowd,
    setRealtime,
  };
};

export default useCrowd;
