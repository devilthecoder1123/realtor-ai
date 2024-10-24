import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DynamicForm from "./DynamicForm";  // Adjust the path according to your file structure

// Define the structure of form data
interface FormData {
    [key: string]: string | undefined;
}

const horizontalSteps = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Step 6',
];

const verticalSteps = [
    "Add Requirements",
    "Property Location",
    "Property Features",
];

// Define the structure for each field configuration
interface FieldConfig {
    type: "text" | "select" | "range";
    label: string;
    placeHolder: string;
    name: string;
    options?: string[]; // Only for select fields
    multiline?: boolean; // For text areas
}

// Example of stepFields definition for each form step
const stepFields: FieldConfig[][] = [
    // Step 1: Add Requirements
    [
        { type: "select", label: "Customer Name", placeHolder: "Abbas", name: "customerName", options: ["Customer 1", "Customer 2"] },
        { type: "select", label: "Property Type", placeHolder: "Eg:Answer", name: "propertyType", options: ["Type 1", "Type 2"] },
        { type: "text", label: "Requirement", placeHolder: "Eg:Requirement", name: "requirement" },
        { type: "text", label: "Detailed Requirement", placeHolder: "Eg:Detailed Requirement", name: "detailedRequirement", multiline: true },
        { type: "range", label: "Price Range", placeHolder: "Eg:500000", name: "price" },
        { type: "select", label: "Timeline", placeHolder: "Eg:20 days", name: "timeline", options: ["1 Week", "2 Weeks"] },
    ],
    // Step 2: Property Location
    [
        { type: "select", label: "City", placeHolder: "Eg:City", name: "city", options: ["City 1", "City 2"] },
        { type: "text", label: "Area", placeHolder: "Eg:Area", name: "area" },
    ],
    // Step 3: Property Features
    [
        { type: "text", label: "Property Features", placeHolder: "Eg:features", name: "features" },
    ],
];

export default function VerticalHorizontalSteppers() {
    const [activeVerticalStep, setActiveVerticalStep] = React.useState(0);
    const [activeHorizontalStep, setActiveHorizontalStep] = React.useState(-1);
    const [formData, setFormData] = React.useState<FormData>({});

    // Handle form changes
    const handleFormChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleVerticalNext = () => {
        setActiveVerticalStep((prev) => Math.min(prev + 1, verticalSteps.length - 1));
    };

    const handleVerticalBack = () => {
        setActiveVerticalStep((prev) => Math.max(prev - 1, 0));
    };

    return (
        <Box sx={{ maxWidth: 1000, mt: 3, ml: 4 }}>
            <Grid container spacing={2}>
                <Grid container item xs={12}>
                    <Grid item xs={3} mt={5}>
                        {/* Vertical Stepper */}
                        <Stepper activeStep={activeVerticalStep} orientation="vertical">
                            {verticalSteps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid item xs={9}>
                        {/* Paper with elevation, containing Horizontal Stepper and the form */}
                        <Paper elevation={3} sx={{ padding: 4 }}>
                            {/* Horizontal Stepper */}
                            <Box ml={4} display="flex" flexDirection="column">
                                <Box>
                                    <Stepper activeStep={activeHorizontalStep} alternativeLabel>
                                        {horizontalSteps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>


                                {/* Form rendering below the horizontal stepper */}
                                <Box p={2} sx={{ mt: 4, border: "2px solid blue", borderRadius: '8px' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {verticalSteps[activeVerticalStep]}
                                    </Typography>
                                    <Box display='flex' flexDirection="column" alignItems='center'>
                                        <DynamicForm
                                            fields={stepFields[activeVerticalStep]}
                                            formData={formData}
                                            onChange={handleFormChange}
                                        />
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleVerticalNext}
                                                sx={{ mr: 1 }}
                                                disabled={activeVerticalStep === verticalSteps.length - 1}
                                            >
                                                {activeVerticalStep === verticalSteps.length - 1 ? "Finish" : "Next"}
                                            </Button>
                                            {
                                                activeVerticalStep > 0 && (
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleVerticalBack}
                                                    >
                                                        Back
                                                    </Button>
                                                )
                                            }

                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
