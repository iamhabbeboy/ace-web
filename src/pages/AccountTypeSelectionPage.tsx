import { useState } from "react";
import MenuNavBar from "../components/MenuNavBar";
import CompanyInfoView from "../components/onboarding/CompanyInfoView";
import AccountTypeSelectionView from "../components/onboarding/AccountTypeSelectionView";
import { Container, Group, Button } from "@mantine/core";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/collections/user";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

const AccountTypeSelectionPage = () => {
    const [onboardView, setOnboardView] = useState<string>("0");
    const [company, setCompanyName] = useState("");
    const navigate = useNavigate();
    const [about, setAbout] = useState("");

    const setAccountType = (type: string) => {
        setOnboardView(type);
    }

    const setCompanyInfo = (name: string, about: string) => {
        setCompanyName(name);
        setAbout(about);
    }

    const dispatcher = useDispatch()

    const handleInfo = () => {
        if(onboardView === "1" && (company === "" || about === "")) {
            showNotification({
                title: "Error",
                message: "Please fill in all fields",
                color: "red",
                icon: <IconX />
            })
            return;
        }
        if (company !== "" || about !== "") {
            dispatcher(updateUser({
                companies: [{
                    name: company,
                    logo: "",
                    description: about,
                }],
                id: "000000000000000000000"
            }))
        }
        navigate("/home")
    }

    const resize = onboardView === "1" ? "xs" : "";
    return (
        <>
            <MenuNavBar />
            {onboardView === "0" && <AccountTypeSelectionView onAccountType={setAccountType} />}
            {onboardView === "1" && <CompanyInfoView onAccountType={setAccountType} onHandleCompanyInfo={setCompanyInfo} />}
            <Container size={resize}>
                <Group position="right">
                    <Button mt={"md"} onClick={handleInfo}>Continue <IconChevronRight /></Button>
                </Group>
            </Container>
        </>
    )
}
export default AccountTypeSelectionPage