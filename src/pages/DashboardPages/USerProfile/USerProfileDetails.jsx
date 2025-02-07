import React from "react";
import { Box, Card, Typography } from "@mui/material";
import SelectComponent from "../../../components/Select/Select";

const USerProfileDetails = () => {
  const countries = [
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+1", label: "🇺🇸 +1" },
  ];

  const specialties = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "dermatology", label: "Dermatology" },
    { value: "gastroenterology", label: "Gastroenterology" },
    { value: "radiology", label: "Radiology" },
    { value: "psychiatry", label: "Psychiatry" },
    { value: "generalPractice", label: "General Practice" },
    { value: "surgery", label: "Surgery" },
  ];

  const practiceTypes = [
    { value: "private", label: "Private Practice" },
    { value: "hospital", label: "Hospital" },
    { value: "clinic", label: "Clinic" },
    { value: "research", label: "Research" },
    { value: "academic", label: "Academic/Teaching" },
    { value: "government", label: "Government Facility" },
    { value: "telemedicine", label: "Telemedicine" },
    { value: "nonprofit", label: "Nonprofit Organization" },
  ];
  
  const patientVolume = [
    { value: "1_5", label: "1 - 5 patients" },
    { value: "6_10", label: "6 - 10 patients" },
    { value: "11_20", label: "11 - 20 patients" },
    { value: "21_30", label: "21 - 30 patients" },
    { value: "31_50", label: "31 - 50 patients" },
    { value: "51_100", label: "51 - 100 patients" },
    { value: "100_plus", label: "More than 100 patients" },
  ];

  const hospitalNames = [
    { value: "hospital_a", label: "Hospital A" },
    { value: "hospital_b", label: "Hospital B" },
    { value: "clinic_x", label: "Clinic X" },
    { value: "clinic_y", label: "Clinic Y" },
    { value: "city_hospital", label: "City Hospital" },
    { value: "community_clinic", label: "Community Clinic" },
    { value: "healthcare_center", label: "Healthcare Center" },
    { value: "specialized_hospital", label: "Specialized Hospital" },
  ];
  
  
  

  return (
    <Card
      sx={{
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        margin: "auto",
        mb: 2,
        backgroundColor: "#fff",
        maxWidth: "93%",
      }}
    >
      <Box>
        <Typography sx={{ mb: 1.5 }}>
          What is your area of Specialisation?
        </Typography>
        <SelectComponent options={specialties} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ mb: 1.5 }}>What is your type of practice?</Typography>
        <SelectComponent options={practiceTypes} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ mb: 1.5 }}>
          How many patient do you see on average every day?
        </Typography>
        <SelectComponent options={patientVolume} />
      </Box>
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography sx={{ mb: 1.5 }}>
          Name of the hospital/Clinic that you are working?
        </Typography>
        <SelectComponent options={hospitalNames} />
      </Box>
    </Card>
  );
};

export default USerProfileDetails;
