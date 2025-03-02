import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";

type Props = {
    closeForm: () => void
    activity: Activity | undefined
    handleFormSubmit: (activity: Activity) => void
}
export default function ActivityForm({ closeForm, activity,handleFormSubmit }: Props) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        if (activity)
            data.id = activity.id

        handleFormSubmit(data as unknown as Activity)
        closeForm()
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Create Activity</Typography>
            <Box component="form" onSubmit={handleSubmit} display={{ display: 'flex', flexDirection: 'column' }} gap={3}>
                <TextField name="title" label="Title" variant="outlined" defaultValue={activity?.title} />
                <TextField name="description" label="Description" multiline rows={3} variant="outlined" defaultValue={activity?.description} />
                <TextField name="category" label="Category" variant="outlined" defaultValue={activity?.category} />
                <TextField name="date" label="Date" variant="outlined" type="date" defaultValue={activity?.date} />
                <TextField name="city" label="City" variant="outlined" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" variant="outlined" defaultValue={activity?.venue} />
                <Box display="flex" justifyContent="end" gap={2}>
                    <Button variant="outlined" color="inherit" onClick={closeForm}>Cancel</Button>
                    <Button type="submit" variant="contained" color="success">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}