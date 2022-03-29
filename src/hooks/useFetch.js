// import { useRef, useState, useEffect } from "react";
// import axios from "./axios";
// import { useCookies } from "react-cookie";

// export function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const isCurrent = useRef(true);
//   const [cookie] = useCookies();
//   // const DefaultUrl = useRef("https://quiz.firefox.uz/api");
//   useEffect(() => {
//     return () => {
//       isCurrent.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(url, {
//         headers: {
//           Authorization: `Bearer ${cookie.userId}`,
//         },
//       })
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);
//   // console.log(data);
//   return { data, loading };
// }
