import { Avatar, Center, Container, createStyles, Group, Header, Menu, rem, UnstyledButton } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { persistor, RootState } from "../store";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/collections/user";

const useStyles = createStyles((theme) => ({
    inner: {
      height: rem(56),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
    
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      },
    
      linkLabel: {
        marginRight: rem(5),
      },
}));

const MenuNavBar = () => {
    const { classes } = useStyles();
    const router = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.account.user)
    const name = user ? `${user.data.given_name} ${user.data.family_name}`  : "N/A";
    const avatar = user ? user.data.picture: "";

    const handleLogout = async () => {
        await dispatch(logoutUser);
        persistor.purge().then(() => {
            sessionStorage.clear();
        });
        googleLogout();
        localStorage.removeItem("oauth_token");
        window.location.href = "/"
        // router("/")
    }

    const handleHomeLink = () => {
        router("/home")
    }

    return (
        <Header height={56} mb={20}>
            <Container size={"xl"}>
                <div className={classes.inner}>
                    <UnstyledButton onClick={handleHomeLink}><img src="https://res.cloudinary.com/denj7z5ec/image/upload/v1688521251/Screenshot_2023-07-05_at_2.38.59_AM-removebg-preview_wlce52.png" alt="" width="50" height="50" /></UnstyledButton>
                    <Group spacing={5}>
                        <a
                            href={"/"}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            Home
                        </a>
                        <a
                            href={"/"}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            About
                        </a>
                           <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                            <Menu.Target>
                                <a
                                    href={"/"}
                                    className={classes.link}
                                    onClick={(event) => event.preventDefault()}
                                >
                                    <Center>
                                        <Avatar alt="" mr={"xs"} src={avatar} radius="xl" size={"sm"}/>
                                        <span> {name}</span>
                                        <IconChevronDown size="0.9rem" stroke={1.5} />
                                    </Center>
                                </a>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>Setting</Menu.Item>
                                <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    {/* <Burger opened={} onClick={toggle} className={classes.burger} size="sm" /> */}
                </div>
            </Container>
        </Header>
    )
}
export default MenuNavBar
