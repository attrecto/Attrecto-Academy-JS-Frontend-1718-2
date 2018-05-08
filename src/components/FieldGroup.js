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

export const SelectGroup = ({id, label, help, validationState, value, ...props}) =>
    <FormGroup controlId={id} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl componentClass="select" {...props} >{props.children}</FormControl>
        <FormControl.Feedback/>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>;
