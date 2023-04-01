import { Button, Container, Group, SimpleGrid } from "@mantine/core"
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import AccountTypeCard from "../components/AccountType"
import MenuNavBar from "../components/MenuNavBar";

// const useStyles = createStyles((theme) => ({
//     section: {
//         padding: theme.spacing.md,
//         borderRadius: theme.radius.sm,
//         backgroundColor: `#fff`,
//         border: `${rem(0.9)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
//     }
// }));

const AccountTypeSelectionPage = () => {
    const [checked, setChecked] = useState("0");
    // const { classes } = useStyles();
    console.log(checked)
    return (
        <>
        <MenuNavBar />
        <Container >
            <h2>Select Account Type </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
            <SimpleGrid cols={2} mt="md">
                <AccountTypeCard label="Individual" description="Some of the benefit" status={"0"} onChecked={setChecked} />
                <AccountTypeCard label="Company" description="stuff here about school, team, organization" status={"1"} onChecked={setChecked} />
            </SimpleGrid>
            <Group position="right">
                <Button mt={"md"}>Continue <IconChevronRight /></Button>
            </Group>
        </Container>
        </>
    )
}
export default AccountTypeSelectionPage