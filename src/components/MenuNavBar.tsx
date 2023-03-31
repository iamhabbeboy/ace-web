import { Avatar, Burger, Center, Container, createStyles, Group, Header, Menu, rem } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react";

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

    return (
        <Header height={56} mb={120}>
            <Container size={"xl"}>
                <div className={classes.inner}>
                    Logo
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
                                        <Avatar alt="" mr={"xs"} src={"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"} radius="xl" size={"sm"}/>
                                        <span> {"Account"}</span>
                                        <IconChevronDown size="0.9rem" stroke={1.5} />
                                    </Center>
                                </a>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>Setting</Menu.Item>
                                <Menu.Item>Logout</Menu.Item>
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