import { useState } from "react";
import MenuNavBar from "../components/MenuNavBar";
import CompanyInfoView from "../components/onboarding/CompanyInfoView";
import { Container, Group, Button } from "@mantine/core";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../store/thunks/user";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { RootState, store } from "../store";

const AccountTypeSelectionPage = () => {
    const [company, setCompanyName] = useState("");
    const navigate = useNavigate();
    const [about, setAbout] = useState("");
    const user = useSelector((state: RootState) => state.account.user);

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
                id: user.data.id,
                companies: [{
                    name: company,
                    logo: "",
                    description: about,
                }]
            }))
            if (response.meta.requestStatus === "fulfilled") {
               return navigate("/home")
            } 
            const msg = response.payload as any;
            showNotification({
                title: "Error",
                message: msg.message,
                color: "red",
                icon: <IconX />
            })
            return;
        }
    }

    return (
        <>
            <MenuNavBar />
            <CompanyInfoView onHandleCompanyInfo={setCompanyInfo} />
            <Container size={"xs"}>
                <Group position="right">
                    <a href="/home" style={{ marginTop: "10px" }}>Skip</a>
                    <Button mt={"md"} onClick={handleInfo}>Continue <IconChevronRight /></Button>
                </Group>
            </Container>
        </>
    )
}
export default AccountTypeSelectionPage