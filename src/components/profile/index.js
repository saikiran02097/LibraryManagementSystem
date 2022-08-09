import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Typography, Snackbar } from "@material-ui/core";
import { Alert } from "../helpers";
import { postAPICall } from "../apihandlers";
import urls from "../apihandlers/urls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(5),
      width: "30ch",
      // background: "white ",
    },
    "& fieldset": {
      borderColor: "#263238",
    },
    "& label": {
      color: "black",
    },
  },
  container: {
    background: "white",
  },
  separator: {
    paddingLeft: "2.5rem",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "2rem",
    elevation: 500,
  },
}));

const fields = [
  {
    label: "User Id",
    paramName: "id",
    disabled: true,
  },
  {
    label: "First Name",
    paramName: "firstName",
    isSeparator: true,
    heading: "Details",
  },
  {
    label: "Middle Name",
    paramName: "middleName",
    isRequired: false,
  },
  {
    label: "Last Name",
    paramName: "lastName",
  },
  {
    label: "Phone Number",
    paramName: "phoneNumber",
    isSeparator: true,
    heading: "Contact Details",
  },
  {
    label: "Email Id",
    paramName: "email",
  },
];

const Profile = () => {
  const classes = useStyles();
  const [messageData, setMessageData] = useState({ message: "", type: "" });

  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const {
      id = "",
      firstName = "",
      middleName = "",
      lastName = "",
      email = "",
      phoneNumber = "",
    } = JSON.parse(sessionStorage.getItem("userData")) || {};
    setUserData({ id, firstName, middleName, lastName, email, phoneNumber });
  }, []);

  const handleChange = (e, paramName) =>
    setUserData((prevUserData) => ({
      ...prevUserData,
      [paramName]: e.target.value,
    }));

  const validateData = () => {
    let isValid = true;
    const { id, firstName, middleName, lastName, email, phoneNumber } =
      userData;
    if (
      firstName == "" ||
      middleName == "" ||
      lastName == "" ||
      email == "" ||
      phoneNumber == ""
    )
      isValid = false;
    return isValid;

    // if (userData.firstName=="" ||userData.middleName==""||userData.lastName==""||userData.email==""||userData.phoneNumber=="")
  };

  const handleButtonClick = () => {
    if (validateData()) {
      postAPICall(urls.profileUpdate, userData)
        .then((res) => {
          setMessageData({
            message: "Profile updated successfully",
            type: "success",
          });
        })
        .catch((err) => {
          setMessageData({
            message: " Unable to  update profile",
            type: "error",
          });
        });
    } else {
      setMessageData({
        message: "Please enter data in all mandatory Fields",
        type: "warning",
      });
    }
  };

  return (
    <div style={{ padding: 30 }} className={classes.root}>
      {messageData.message && (
        <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
          open={true}
          autoHideDuration={6000}
          onClose={() => setMessageData({ message: "" })}
        >
          <Alert
            onClose={() => setMessageData({ message: "" })}
            severity={messageData.type}
          >
            {messageData.message}
          </Alert>
        </Snackbar>
      )}
      <Grid container className={classes.container}>
        {fields.map(
          ({
            label,
            paramName,
            disabled = false,
            isSeparator = false,
            isRequired = true,
            heading = "",
          }) => (
            <>
              {isSeparator && (
                <Grid xs={12}>
                  <Typography className={classes.separator}>
                    {heading}
                  </Typography>
                </Grid>
              )}
              <Grid xs={4}>
                <TextField
                  required={isRequired}
                  label={label}
                  disabled={disabled}
                  variant="outlined"
                  value={userData[paramName] || ""}
                  onChange={(e) => handleChange(e, paramName)}
                />
              </Grid>
            </>
          )
        )}
      </Grid>
      <Grid xs={12} className={classes.button}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Update
        </Button>
      </Grid>
    </div>
  );
};

export default Profile;
