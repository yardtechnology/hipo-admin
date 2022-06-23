import { formatCurrency } from "@ashirbad/js-core";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { BASE_URL } from "configs";
import { useIsMounted } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const OperatorDriverPayment = ({ operatorDrivers }) => {
  console.log(operatorDrivers);
  const { isMounted } = useIsMounted();
  // const { setRealtime } = useDrivers();
  const [state, setState] = useState(false);
  const [driverPayments, setDriverPayments] = useState(null);
  console.log(driverPayments);
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted) return;
      try {
        const response = await fetch(
          `${BASE_URL}/payments/drivers/${operatorDrivers?.rowData?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
            // body: JSON.stringify({
            //   operatorId: operatorId,
            // }),
          }
        );
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setDriverPayments(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, operatorDrivers, state]);
  return (
    <div>
      {" "}
      <MaterialTable
        title={`${
          operatorDrivers?.rowData?.displayName
            ? operatorDrivers?.rowData?.displayName
            : "Driver"
        }'s Payments`}
        // onSelectionChange={(data) => {
        //   setSelectedUserFCMToken({
        //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
        //     fcmToken: data?.[0]?.fcmToken || null,
        //   });
        // }}
        options={{
          detailPanelColumnAlignment: "right",
          // pageSize: "3",
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Operator Driver Payments"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Operator Driver Payments"),
            },
          ],
          actionsColumnIndex: -1,
          search: true,
          exportAllData: true,
          sorting: true,
        }}
        data={
          driverPayments === null
            ? []
            : driverPayments?.map((item, i) => ({
                ...item,
                sl: i + 1,
                dateOn: moment(item?.createdAt).format("ll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
            width: "2%",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Ride Id",
            tooltip: "Ride Id",
            field: "_id",
            editable: "never",
            // hidden: true,
            export: true,
            // field: "displayName",
            // render: ({ photoURL, displayName, email }) => (
            //   <>
            //     <ListItem>
            //       <ListItemAvatar>
            //         {" "}
            //         <Avatar src={photoURL} alt={displayName} />
            //       </ListItemAvatar>
            //       <ListItemText
            //         primary={
            //           <Typography component="span" variant="body2">
            //             {displayName || "Not Provided"}
            //           </Typography>
            //         }
            //         secondary={email}
            //       ></ListItemText>
            //     </ListItem>
            //   </>
            // ),
          },

          // {
          //   title: "Picked Up",
          //   field: "pickedUp",
          // },
          // {
          //   title: "Dropped",
          //   field: "dropped",
          // },
          {
            title: "Date On",
            field: "dateOn",
            editable: "never",
            render: (rowData) => moment(rowData.createdAt).format("LL"),
          },
          {
            title: "Payment Mode",
            field: "method",
            emptyValue: "Not Provided",
            searchable: true,
            editable: "never",
          },

          // {
          //   title: "Collected",
          //   field: "collected",
          //   render: (rowData) => formatCurrency(rowData?.collected),
          // },
          {
            title: "Earned",
            field: "earned",
            render: (rowData) => formatCurrency(rowData?.amount),
            editable: "never",
          },
          {
            title: "Commission",
            field: "margin",
            type: "numeric",
            render: (rowData) => formatCurrency(rowData?.margin),
            emptyValue: "--",
          },
          {
            title: "Settled",
            field: "settled",
            lookup: {
              true: "Yes",
              false: "No",
            },
            emptyValue: "--",
          },
        ]}
        // actions={[
        //   {
        //     icon: () => <Visibility style={{ color: "#1991eb" }} />,
        //     tooltip: "View All Rides ",
        //     position: "toolbar",
        //     // onClick: () => {
        //     //   history.push("/users");
        //     // },
        //   },
        // ]}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            console.log(newData);
            console.log(oldData);
            try {
              const response = await fetch(
                `${BASE_URL}/payment/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: JSON.stringify({
                    ...newData,
                    _id: oldData._id,
                  }),
                }
              );
              const Response = await response.json();
              Response.status === 200
                ? Swal.fire({
                    title: "Success",
                    text: "Payment Updated Successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                  })
                : Swal.fire({
                    title: "Error",
                    text: "Payment Not Updated",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
              setState((prev) => !prev);
            } catch (error) {
              console.log(error);
            }
          },
          // onRowDelete: async (oldData) => {
        }}
      />
    </div>
  );
};

export default OperatorDriverPayment;
