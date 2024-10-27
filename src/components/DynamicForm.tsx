import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

// Define the structure for each field configuration
interface FieldConfig {
    type: "text" | "select" | "range"; // Include "range" as a new type
    label: string;
    placeHolder: string;
    name: string;
    options?: string[]; // Only for select fields
    multiline?: boolean; // For text areas
}

// Props for the DynamicForm component
interface DynamicFormProps {
    activeVerticalStep: number;
    verticalSteps: string[];
    fields: FieldConfig[];
    formData: { [key: string]: string | undefined };
    onChange: (name: string, value: string) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ activeVerticalStep, verticalSteps, fields, formData, onChange }) => {
    return (
        <Box>
            {fields.map((field, index) => {
                if (field.type === "select") {
                    return (
                        <Box display="flex" flexDirection="column" alignItems="flex-start" key={index} width="100%">
                            <Typography variant="h6" gutterBottom>
                                {verticalSteps[activeVerticalStep]}
                            </Typography>
                            <Typography variant="caption">{field.label}</Typography>
                            <FormControl sx={{ mb: 2, minWidth: 420 }} size="small">
                                <Select
                                    value={formData[field.name] || ""}
                                    onChange={(e) => onChange(field.name, e.target.value)}
                                    displayEmpty
                                    renderValue={(selected) =>
                                        selected === "" ? <Typography sx={{ color: 'gray' }}>{field.placeHolder}</Typography> : selected
                                    }
                                    sx={{ '& .MuiSelect-select': { textAlign: 'left' } }}
                                >
                                    {field.options?.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    );
                } else if (field.type === "range") {
                    return (
                        <>
                            <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
                                <Typography variant="caption" sx={{ mr: 1 }}>{field.label}</Typography>
                                <Box display="flex" alignItems="center" key={index} sx={{ mb: 2 }}>
                                    <TextField
                                        size="small"
                                        label="Min"
                                        placeholder={field.placeHolder}
                                        variant="outlined"
                                        value={formData[`${field.name}_min`] || ""}
                                        onChange={(e) => onChange(`${field.name}_min`, e.target.value)}
                                        sx={{ width: 203, mr: 2 }}
                                    />
                                    <TextField
                                        size="small"
                                        label="Max"
                                        placeholder={field.placeHolder}
                                        variant="outlined"
                                        value={formData[`${field.name}_max`] || ""}
                                        onChange={(e) => onChange(`${field.name}_max`, e.target.value)}
                                        sx={{ width: 203 }}
                                    />
                                </Box>
                            </Box>
                        </>
                    );
                } else {
                    return (
                        <Box display='flex' flexDirection='column' alignItems="flex-start" key={index} width='100%'>
                            <Typography variant="caption">{field.label}</Typography>
                            <TextField
                                size="small"
                                placeholder={field.placeHolder}
                                variant="outlined"
                                value={formData[field.name] || ""}
                                onChange={(e) => onChange(field.name, e.target.value)}
                                multiline={field.multiline}
                                rows={field.multiline ? 4 : 1}
                                sx={{ mb: 2, minWidth: 420 }}
                            />
                        </Box>
                    );
                }
            })}
        </Box>
    );
};

export default DynamicForm;
