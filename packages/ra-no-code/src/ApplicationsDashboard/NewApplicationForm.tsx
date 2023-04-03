import * as React from 'react';
import { FormEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Application } from './types';

export const NewApplicationForm = ({
    applications,
    onApplicationCreated,
}: {
    applications: Application[];
    onApplicationCreated: (application: Application) => void;
}) => {
    const [error, setError] = useState<string>();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            name: { value: string };
        };

        const name = target.name.value;
        if (!name) {
            return;
        }

        if (applications.some(application => application.name === name)) {
            setError('An application with this name already exists');
            return;
        }

        onApplicationCreated({
            name,
            created_at: new Date(),
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h5">
                            Create a new application
                        </Typography>
                        <TextField label="The application name" name="name" />
                    </CardContent>
                    <CardActions>
                        <Button size="small" type="submit" color="primary">
                            Create
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <Snackbar
                open={!!error}
                onClose={() => setError(undefined)}
                autoHideDuration={6000}
                message={error}
            />
        </>
    );
};
