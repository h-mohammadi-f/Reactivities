import { Box, Container, CssBaseline } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard"

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id))
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleFormOpen = (id?: string) => {
    if (id)
      handleSelectActivity(id)
    else
      handleCancelSelectActivity()
    setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  const handleFormSubmit = (activity: Activity) => {
    if (activity.id) {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    } else {
      setActivities([...activities, { ...activity, id: String(activities.length + 1) }]);
      setSelectedActivity(activity);
    }
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          openForm={handleFormOpen}
          editMode={editMode}
          closeForm={handleFormClose}
          handleFormSubmit={handleFormSubmit} />
      </Container>
    </Box>
  )
}

export default App
