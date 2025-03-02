import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
    activity: Activity
    cancelSelectActivity: () => void
    openForm: (id: string) => void
}

export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component={'img'}
                src={`/images/categoryImages/${activity.category}.jpg`}
                alt={activity.category}
            />
            <CardContent>
                <Typography variant='h5'>{activity.title}</Typography>
                <Typography variant='subtitle1' fontWeight="light">{activity.date}</Typography>
                <Typography variant='body1'>{activity.description}</Typography>
            </CardContent>
            <CardContent>
                <Button color="primary" onClick={() => openForm(activity.id)} >Edit</Button>
                <Button color="inherit" onClick={cancelSelectActivity}>Cancel</Button>
            </CardContent>

        </Card>
    )
}