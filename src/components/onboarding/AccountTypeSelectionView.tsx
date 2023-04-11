import { Container, SimpleGrid } from "@mantine/core";
import AccountTypeCard from "../AccountType";
import { useEffect, useState } from "react";

interface AccountTypeSelectionViewProps {
    onAccountType: (type: string) => void;
}
const AccountTypeSelectionView = ({ onAccountType }: AccountTypeSelectionViewProps) => {
    const [checked, setChecked] = useState("0");
    useEffect(() => {
        onAccountType(checked);
    }, [checked, onAccountType])
    return (
        <Container >
            <h2>Select Account Type </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
            <SimpleGrid cols={2} mt="md">
                <AccountTypeCard label="Individual" description="Some of the benefit" status={"0"} onChecked={setChecked} />
                <AccountTypeCard label="Company" description="stuff here about school, team, organization" status={"1"} onChecked={setChecked} />
            </SimpleGrid>
        </Container>
    )
}

export default AccountTypeSelectionView;