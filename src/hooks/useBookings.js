import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useBookings = () => {
  const [bookings, setBookings] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking/all-booking`, {
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
        isMounted.current && setBookings(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, [isMounted, realtime]);
  return {
    bookings,
    setRealtime,
  };
};

export default useBookings;
