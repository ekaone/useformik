import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import * as yup from "yup";

const validationSchema = yup.object({
  project: yup.string().required()
});

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  }
}));

export default function FormikTextField() {
  const classes = useStyles();

  const [users, setUsers] = useState([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Tony" },
    { id: 4, name: "Donald Trump" }
  ]);

  // useEffect(() => {
  //   axios.get('/user')
  //   .then(function (response) {
  //     console.log(response.data);
  //     setUsers(response.data)
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })

  //   return () => {
  //     console.log('Component unmount')
  //   }
  // }, [])

  return (
    <>
      <br />
      <center>
        <Formik
          initialValues={{ name: [], project: "", reimburse: [] }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            // make aynsc call
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Select
                name="name"
                type="select"
                value={values.name}
                onChange={handleChange}
                displayEmpty
                variant="outlined"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {users.map(user => {
                  return (
                    <MenuItem key={user.id} value={user.name}>
                      {user.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <br />
              <br />
              <TextField
                id="standard-basic"
                label="Name"
                type="text"
                name="project"
                onChange={handleChange}
                value={values.project}
                variant="outlined"
                helperText={touched.project ? errors.project : ""}
                error={touched.project && Boolean(errors.project)}
              />
              <br />
              <Field name="reimburse" value="Checked True" as={Checkbox} />
              <br />
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              <pre>
                {JSON.stringify(
                  {
                    values: values
                  },
                  null,
                  2
                )}
              </pre>
            </Form>
          )}
        </Formik>
      </center>
    </>
  );
}
