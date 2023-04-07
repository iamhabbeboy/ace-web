import { Notification } from "@mantine/core"

interface NotifyProps {
    title: string;
    body: string;
    icon?: string;
}

const Notify = ({ title, body, icon }: NotifyProps) => {
    return (
        <Notification title={title}>
            {body}
        </Notification>
    )
    }

    export default Notify