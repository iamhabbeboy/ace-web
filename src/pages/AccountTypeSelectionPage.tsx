import { useState } from "react";
import MenuNavBar from "../components/MenuNavBar";
import CompanyInfoView from "../components/onboarding/CompanyInfoView";
import { Container, Group, Button } from "@mantine/core";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/thunks/user";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { store } from "../store";

const AccountTypeSelectionPage = () => {
    const [company, setCompanyName] = useState("");
    const navigate = useNavigate();
    const [about, setAbout] = useState("");

    const setCompanyInfo = (name: string, about: string) => {
        setCompanyName(name);
        setAbout(about);
    }


    const handleInfo = async () => {
        if (company === "" || about === "") {
            showNotification({
                title: "Error",
                message: "Please fill in all fields",
                color: "red",
                icon: <IconX />
            })
            return;
        }
        if (company !== "" || about !== "") {
            const response = await store.dispatch(updateUser({
                companies: [{
                    name: company,
                    logo: "",
                    description: about,
                }],
                oauth_user_id: "12345xx",
            }))
            console.log(response.payload)
        }
        // navigate("/home")
    }

    return (
        <>
            <MenuNavBar />
            <CompanyInfoView onHandleCompanyInfo={setCompanyInfo} />
            <Container size={"xs"}>
                <Group position="right">
                    <a href="/home" style={{marginTop: "10px"}}>Skip</a>
                    <Button mt={"md"} onClick={handleInfo}>Continue <IconChevronRight /></Button>
                </Group>
            </Container>
        </>
    )
}
export default AccountTypeSelectionPage