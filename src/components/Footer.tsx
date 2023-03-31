import { createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    style: {
        color: 'rgb(232 232 233)',
        fontWeight: 'bold'
    },
}));

const Footer = () => {
    const { classes } = useStyles();
    return (
        <Text align="center" mt={30} className={classes.style} size={20}> Ace Test v0.0.1</Text>
    )
}

export default Footer