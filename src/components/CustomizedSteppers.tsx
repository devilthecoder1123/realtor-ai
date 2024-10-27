import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderLeftWidth: 3,
        minHeight: 40,
        marginLeft: -4, // Align line with dot precisely
        borderRadius: 2,
        ...(theme.palette.mode === 'dark' && {
            borderColor: theme.palette.grey[800],
        }),
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
        borderColor: '#A9A9A9',
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
        borderColor: '#A9A9A9',
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: '#A9A9A9',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginLeft: -14,
        '& .QontoStepIcon-circle': {
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: '1px solid grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& .QontoStepIcon-innerCircle': {
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: 'blue'
        },
        ...(theme.palette.mode === 'dark' && {
            color: theme.palette.grey[700],
        }),
    })
);

function QontoStepIcon(props: StepIconProps) {
    const { active } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }}>
            <div className="QontoStepIcon-circle">
                {active && <div className="QontoStepIcon-innerCircle" />}
            </div>
        </QontoStepIconRoot>
    );
}

interface VerticalStepperProps {
    activeVerticalStep: number;
    verticalSteps: string[];
}

export default function VerticalCustomizedSteppers({ activeVerticalStep, verticalSteps }: VerticalStepperProps) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Stepper orientation="vertical" activeStep={activeVerticalStep} connector={<QontoConnector />}>
                {verticalSteps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={QontoStepIcon}
                            sx={{ ml: 2, p: 0 }} // Adds space to the right for text
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
