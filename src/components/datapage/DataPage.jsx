import React from "react";
import  app  from "../../firebase-config";
import { getDatabase, ref, set } from "firebase/database";
import { useFormik } from "formik";

function DataPage() {
  const storage = getDatabase(app);

  const dataSt=async(values)=>{
    try {
        const newRef = ref(storage, "user")
        await set(newRef, values);
        console.log("Data stored successfully!");
      } catch (error) {
        console.error("Error storing data:", error.message);
      }
  }

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async(values) => {
        console.log(values)
        dataSt(values)
        formik.resetForm()
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <div>
            <input
              type="text"
              id="name"
              style={{ width: "500px", height: "35px" }}
              placeholder="Enter the name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              type="text"
              id="email"
              style={{ width: "500px", height: "35px" }}
              placeholder="Enter the email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              id="password"
              style={{ width: "500px", height: "35px" }}
              placeholder="Enter the password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div>
            <input
              type="password"
              id="confirmpassword"
              style={{ width: "500px", height: "35px" }}
              placeholder="Enter the confirm password"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div>
          <button
            style={{
              width: "500px",
              height: "35px",
              backgroundColor: "black",
              color: "white",
            }}
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default DataPage;
