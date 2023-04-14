import { Button, Container, Divider, Grid, Group, Tabs, createStyles } from "@mantine/core"
import ExamOption from "../../components/student/ExamOption";
import { IconCircleCheck } from "@tabler/icons-react";

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

const Exam = () => {
    const { classes } = useStyles();
    return (
        <Container size={"xl"}>
            <Group position="apart">
                <div>
                    <h1 style={{color: "#666" }}>Ace Test</h1>
                    <Button mb={5} size="xs">Submit &nbsp;<IconCircleCheck /></Button>
                </div>
                <div style={{textAlign: "right"}}>
                    <p>Time Remaining</p>
                    <h2>1:00:00</h2>
                </div>
            </Group>
            <div className={classes.section}>
            <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery">English</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
                <Grid>
                    <Grid.Col span={8}>
                        <div style={{ overflowY: "scroll", height: "500px", color: "#666" }}>
                            <h3>(10)</h3>
                            <h1>What is a noun? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </h1>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={4} >
                        <div style={{ overflowY: "scroll", height: "500px", borderLeft: "1px solid #ccc" }}>
                            <ExamOption label="A" content="A noun is a name of any person, animal, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ullam porro non magnam eligendi minima et, tenetur illo amet, aliquid suscipit culpa vitae aspernatur odit nesciunt quidem quis ex doloremque" />
                            <ExamOption label="B" content="A noun is a name of any person, animal, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ullam porro non magnam eligendi minima et, tenetur illo amet, aliquid suscipit culpa vitae aspernatur odit nesciunt quidem quis ex doloremque" />
                            <ExamOption label="C" content="A noun is a name of any person, animal, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ullam porro non magnam eligendi minima et, tenetur illo amet, aliquid suscipit culpa vitae aspernatur odit nesciunt quidem quis ex doloremque" />
                            <ExamOption label="D" content="A noun is a name of any person, animal, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ullam porro non magnam eligendi minima et, tenetur illo amet, aliquid suscipit culpa vitae aspernatur odit nesciunt quidem quis ex doloremque" />
                        </div>
                    </Grid.Col>
                </Grid>
                <Divider mt={5} mb={5} />
                <Group position="apart" mt={10}>
                    <div>
                        <Button mt={5} variant="outline">Previous</Button>
                        <Button mt={5} ml={5} color="indigo">Next </Button>
                    </div>
                    <div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                            return (
                                <Button mt={5} ml={5} color="indigo">{item}</Button>
                            )
                        })}
                    </div>
                </Group>
                </Tabs.Panel>
                </Tabs>
            </div>
        </Container>
    )
}
export default Exam