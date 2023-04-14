import { Alert, Container, createStyles } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    section: {
        background: '#FFF',
        padding: theme.spacing.xl,
        paddingBottom: '50px',
        borderRadius: theme.radius.md,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        'input': {
            color: '#666'
        }
    }
}));

const Overview = () => {
    const { classes } = useStyles();
  return (
        <Container>
             <br /><br /><br />
            <div className={classes.section}>
                <h1>Quiz Overview</h1>
                <Alert><IconInfoCircle size={"1rem"}/> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam praesentium, quisquam quos unde tempora itaque delectus doloribus ad, impedit vero ratione, rem quidem numquam adipisci accusantium culpa! Obcaecati, excepturi vitae.</p></Alert>
                <h5>Subject</h5>
            </div>
        </Container>
    )
}

export default Overview