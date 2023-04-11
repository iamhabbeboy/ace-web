import { Container, Text, Input, FileInput, Textarea, Alert, UnstyledButton, createStyles } from "@mantine/core";
import { IconAlertCircle, IconChevronLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
    position: {
        position: "relative",
        top: "7px",
    }
}));

interface AccountTypeSelectionViewProps {
    onAccountType: (type: string) => void;
    onHandleCompanyInfo: (name: string, about: string) => void;
}

const CompanyInfoView = ({ onAccountType, onHandleCompanyInfo }: AccountTypeSelectionViewProps) => {
    const { classes } = useStyles();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    useEffect(() => {
        onHandleCompanyInfo(name, about);
    }, [about, name, onHandleCompanyInfo]);
   

    const handleAccountTypeView = () => {
        onAccountType("0");
    }

    return (
        <Container size={"xs"}>
            <div>
                <UnstyledButton onClick={handleAccountTypeView}><IconChevronLeft className={classes.position} /> <span >Back</span></UnstyledButton>
                <h2>Company Information</h2>
                <Alert icon={<IconAlertCircle size="1rem" />} title="Provide company Information">
                    Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
                </Alert>
                <Text size={"sm"} >Company name</Text>
                <Input
                    required={true}
                    placeholder="Enter company name here" radius="md" mb={"md"} size={"md"}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
                <Text size={"sm"} >About Company</Text>
                <Textarea
                    placeholder="Enter about company here"
                    label=""
                    autosize
                    radius={"md"}
                    minRows={2}
                    mb={"md"}
                    required={true}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setAbout(event.target.value)}
                />
                <Text size={"sm"}>Logo</Text>
                <FileInput />
            </div>
        </Container>
    )
}

export default CompanyInfoView;