import MaterialTable from "@material-table/core";

const Users = () => {
  return (
    <section className="py-2">
      <MaterialTable
        title="Users"
        columns={[
          { title: "Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Phone", field: "phone" },
          { title: "Status", field: "status" },
          { title: "Created At", field: "created_at" },
          { title: "Updated At", field: "updated_at" },
        ]}
      />
    </section>
  );
};

export default Users;
