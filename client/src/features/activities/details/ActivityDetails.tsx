import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities"

export default function ActivityDetails() {

    const navigate = useNavigate()
    const { id } = useParams()

    const { activity, isLoadingActivity } = useActivities(id)

    if (isLoadingActivity) return <Typography>Loading...</Typography>
    if (!activity) return <Typography>Activity not found</Typography>

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
                <Button color="primary" component={Link} to={`/editActivity/${activity.id}`} >Edit</Button>
                <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
            </CardContent>

        </Card>
    )
}