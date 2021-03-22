import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

interface ISubmitButtonProps {
    isSubmitting: boolean;
    dirty: boolean;
    allowSubmitPristine?: boolean;
    isValid: boolean;
}

const SubmitButton: React.FC<ISubmitButtonProps> = props => {
    const { isSubmitting: submitting, dirty, allowSubmitPristine, isValid } = props;
    return (
        <Button type='submit' variant='contained' disabled={!isValid || (!dirty && !allowSubmitPristine) || submitting}>
            OK
            {submitting && <CircularProgress size={20} style={{ marginLeft: '1em' }} />}
        </Button>
    );
};

export default SubmitButton;
