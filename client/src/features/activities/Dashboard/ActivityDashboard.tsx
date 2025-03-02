import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    selectedActivity: Activity | undefined
    openForm: (id?: string) => void
    editMode: boolean
    closeForm: () => void
    handleFormSubmit: (activity: Activity) => void
}

export default function ActivityDashboard({ activities,
    cancelSelectActivity,
    selectActivity,
    selectedActivity,
    openForm,
    editMode,
    closeForm,
    handleFormSubmit }: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm} />}
                {editMode && < ActivityForm closeForm={closeForm} activity={selectedActivity} handleFormSubmit={handleFormSubmit} />}
            </Grid2>
        </Grid2>
    )
}