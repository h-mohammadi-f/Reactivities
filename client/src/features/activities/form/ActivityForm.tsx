import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router";

export default function ActivityForm() {
    const { id } = useParams()

    const navigate = useNavigate()

    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity)
            navigate(`/activities/${activity.id}`)
        }
        else {
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`)
                }
            })
        }
    }

    if (isLoadingActivity) return <Typography>Loading...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {
                    activity ? 'Edit Activity' : 'Create Activity'
                }
            </Typography>
            <Box component="form" onSubmit={handleSubmit} display={{ display: 'flex', flexDirection: 'column' }} gap={3}>
                <TextField name="title" label="Title" variant="outlined" defaultValue={activity?.title} />
                <TextField name="description" label="Description" multiline rows={3} variant="outlined" defaultValue={activity?.description} />
                <TextField name="category" label="Category" variant="outlined" defaultValue={activity?.category} />
                <TextField name="date" label="Date" variant="outlined" type="date"
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] :
                        new Date().toISOString().split('T')[0]
                    } />
                <TextField name="city" label="City" variant="outlined" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" variant="outlined" defaultValue={activity?.venue} />
                <Box display="flex" justifyContent="end" gap={2}>
                    <Button
                        component={Link}
                        to={id ? `/activities/${id}` : '/activities'}
                        variant="outlined"
                        color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={updateActivity.isPending || createActivity.isPending}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}