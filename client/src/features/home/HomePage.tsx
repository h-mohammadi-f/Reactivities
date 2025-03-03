import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
    return (
        <Paper sx={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundImage: 'linear-gradient(to right,rgb(17, 32, 241),rgb(175, 25, 245))'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                color: 'white',
                gap: 3
            }}>
                <Group sx={{ height: 110, width: 100 }} />
                <Typography variant="h1">
                    Reactivites
                </Typography>
            </Box>
            <Typography variant="h2">
                Welcome to Reactivites
            </Typography>
            <Button
                component={Link}
                to={'/activities'}
                size="large"
                variant="contained"
                sx={{ height: 80, borderRadius: 4, fontSize: '1.5rem' }}>
                Take me to Activities
            </Button>
        </Paper>
    )
}