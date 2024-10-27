import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

// Custom connector styling
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.grey[400],
        borderTopWidth: 3,
        borderRadius: 1,
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
        bgcolor: '#ffebee', // Connector line color for active state
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
        bgcolor: '#ffebee', // Connector line color for completed state
    },
}));

// Custom icon styling for each step
const CustomStepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: ownerState.active ? '#fff' : theme.palette.grey[400],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: ownerState.active ? 'red' : 'transparent',
        border: `2px solid ${ownerState.active ? 'red' : theme.palette.grey[400]}`,
        ...(ownerState.completed && {
            bgcolor: '#ffebee',
            color: '#fff',
            border: 'none',
        }),
    })
);

// Step icon component using Check icon
function CustomStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <CustomStepIconRoot ownerState={{ active, completed }} className={className}>
            {completed ? <Check fontSize="small" /> : <Check fontSize="small" />} {/* Check icon in both states */}
        </CustomStepIconRoot>
    );
}

interface HorizontalStepperProps {
    activeStep: number;
    steps: string[];
}

export default function HorizontalStepper({ activeStep, steps }: HorizontalStepperProps) {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper activeStep={activeStep} connector={<CustomConnector />} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
