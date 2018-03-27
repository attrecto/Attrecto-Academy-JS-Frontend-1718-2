import React from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
} from 'react-bootstrap';

export const FieldGroup = ({id, label, help, validationState, ...props}) =>
    <FormGroup controlId={id} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        <FormControl.Feedback/>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>;
