import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Popper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import InputField from "../../../components/InputField/InputField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import professions from "../../../dev-data/Profession.json";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../../../utils/emailValidation";
import { passwordValidation } from "../../../utils/passwordValidation";
import { mobileValidation } from "../../../utils/mobileValidation";
import SelectComponent from "../../../components/Select/Select";
import { dobValidation } from "../../../utils/dateOfBirthValidation";
import CheckboxComponent from "../../../components/Checkbox/CheckboxComp";
import { useSignUp } from "@clerk/clerk-react";
import { handleRegister } from "../../../utils/RegisterFn";

const StyledPopper = styled(Popper)({
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  marginTop: "8px",
  zIndex: 1000,
  fontSize: "16px",
});

const StyledPaper = styled(Paper)({
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  fontSize: "16px",
});

const PersonalDetails = ({ setActiveStep }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();

  const countries = [
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+1", label: "🇺🇸 +1" },
  ];

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleClickVisibility = () => {
    setVisibility(!visibility);
  };

  const onSubmit = async (data) => {
    const phoneNumber = Number(`${countryCode}${data.mobile}`);

    const formData = {
      email: data.email,
      msDn: data.mobile,
      password: data.password,
    };

    try {
      setLoading(true);
      await handleRegister(
        formData,
        setLoading,
        setActiveStep,
        isLoaded,
        navigate,
        signUp,
        countryCode
      );
    } catch (error) {
      console.error(
        "Error during registration process:",
        error.message || error
      );
    } finally {
      setLoading(false);
      localStorage.setItem("phonenumber", phoneNumber);
      localStorage.setItem("Data", JSON.stringify(data));
      localStorage.setItem("countryCode", countryCode);
      localStorage.setItem("password", data.password);
    }
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      sx={{
        padding: {
          xs: "20px 10px",
          sm: "25px 15px",
          md: "30px 20px",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box
          sx={{
            maxWidth: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <InputField
            placeholder="Email"
            register={{
              ...register("email", emailValidation(watch)),
            }}
            errors={errors.email}
            sx={{ mb: 0 }}
          />

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2, md: 3 },
              width: "100%",
            }}
          >
            <SelectComponent
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              options={countries}
              placeholder="Select"
              sx={{ width: "80px" }}
              errors={errors.mobile}
              errorWidth="300px"
            />
            <InputField
              placeholder="Enter your mobile number"
              register={{ ...register("mobile", mobileValidation(watch)) }}
              type="number"
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputField
              placeholder="Password"
              type={visibility ? "text" : "password"}
              register={{ ...register("password", passwordValidation(watch)) }}
              errors={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickVisibility}
                    sx={{ cursor: "pointer" }}
                  >
                    {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
            }}
          >
            <InputField
              placeholder="First Name"
              register={{
                ...register("firstName", {
                  required: "First Name is required",
                }),
              }}
              errors={errors.firstName}
            />
            <InputField
              placeholder="Last Name"
              register={{
                ...register("lastName", {
                  required: "Last Name is required",
                }),
              }}
              errors={errors.lastName}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              width: "100%",
            }}
          >
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{
                required: "Please select a gender",
              }}
              render={({ field }) => (
                <SelectComponent
                  value={field.value}
                  onChange={field.onChange}
                  options={genders}
                  placeholder="Select Gender"
                  errors={errors.gender}
                />
              )}
            />
            <InputField
              placeholder="Zipcode"
              register={{
                ...register("zipcode", {
                  required: "Zipcode is required",
                }),
              }}
              errors={errors.zipcode}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue=""
              rules={{
                // Either call your dobValidation function without needing watch,
                // or simply use required validation:
                required: "Date of birth is required",
                // ...you can add more rules if needed
              }}
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  inputRef={ref}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: "1900-01-01",
                    max: new Date().toISOString().split("T")[0],
                  }}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={
                    errors.dateOfBirth ? errors.dateOfBirth.message : ""
                  }
                />
              )}
            />
          </Box>
          <Box>
            <Autocomplete
              fullWidth
              size="small"
              disablePortal={true}
              options={professions}
              getOptionLabel={(option) => option.profession}
              onChange={(event, value) => {
                if (value) {
                  localStorage.setItem("profession", value.profession);
                }
              }}
              PopperComponent={(props) => (
                <StyledPopper {...props} key="popper" />
              )}
              PaperComponent={(props) => <StyledPaper {...props} key="paper" />}
              renderOption={(props, option) => (
                <li {...props} key={option.profession}>
                  {option.profession}
                </li>
              )}
              renderInput={(params) => (
                <InputField
                  {...params}
                  placeholder="Profession"
                  register={{
                    ...register("professions", {
                      required: "Profession is required",
                    }),
                  }}
                  errors={errors.professions}
                />
              )}
            />
          </Box>
          <CheckboxComponent
            name="termsAgreement"
            control={control}
            label={
              <>
                By checking this box, you confirm you have read and agree to our{" "}
                <a href="/terms-of-use" target="_blank" className="terms-text">
                  Terms of Use
                </a>
                ,{" "}
                <a href="/privacy" target="_blank" className="terms-text">
                  Privacy Policy
                </a>
              </>
            }
            rules={{
              validate: (value) => value || false,
            }}
            sx={{ mt: 2 }}
            checkboxSx={{ "&.Mui-checked": { color: "blue" } }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 3, sm: 4, md: 4 },
              mb: { xs: 2, sm: 2, md: 2 },
            }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                width: { xs: "90%", sm: "80%", md: "70%" },
                backgroundColor: "rgba(46, 104, 174, 1)",
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Register"
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default PersonalDetails;
