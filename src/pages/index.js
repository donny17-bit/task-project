import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Select,
  Input,
  Grid,
  GridItem,
  SimpleGrid,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function Home() {
  // use to check the button in header table is clicked or not
  const [isClickedId, setIsClickedId] = useState(true);
  const [isClickedEmail, setIsClickedEmail] = useState(true);

  // themes data
  const themes = [
    {
      name: "Dark",
      headerColor: "#2c3e50",
      headerTextColor: "#ffffff",
      detailColor: "#bdc3c7",
      detailTextColor: "#2c3e50",
    },
    {
      name: "Light",
      headerColor: "#bdc3c7",
      headerTextColor: "#2c3e50",
      detailColor: "#ffffff",
      detailTextColor: "#2c3e50",
    },
    {
      name: "Blue",
      headerColor: "#3498db",
      headerTextColor: "#ffffff",
      detailColor: "#ecf0f1",
      detailTextColor: "#2980b9",
    },
    {
      name: "Red",
      headerColor: "#e74c3c",
      headerTextColor: "#ffffff",
      detailColor: "#ecf0f1",
      detailTextColor: "#c0392b",
    },
  ];

  // users data
  const users = [
    {
      id: 1,
      email: "alexander@mail.com",
      isMarried: false,
      programmingLanguages: ["Javascript", "C++", "Python"],
    },
    {
      id: 2,
      email: "graham@mail.com",
      isMarried: false,
      programmingLanguages: ["PHP", "Ruby"],
    },
    {
      id: 3,
      email: "bell@mail.com",
      isMarried: false,
      programmingLanguages: ["Go", "Javascript", "Ruby", "C#"],
    },
    {
      id: 4,
      email: "thomas@mail.com",
      isMarried: false,
      programmingLanguages: ["C#", "Rust", "Typescript"],
    },
    {
      id: 5,
      email: "alva@mail.com",
      isMarried: false,
      programmingLanguages: ["Rust", "Python"],
    },
    {
      id: 6,
      email: "edison@mail.com",
      isMarried: false,
      programmingLanguages: ["Ruby", "Python", "Go"],
    },
  ];

  // users and themes data save again to avoid modification in original data
  const [user, setUser] = useState(users);
  const [theme, setTheme] = useState(themes[2]);

  // default input in filter field
  const [input, setInput] = useState("");

  const sortingId = () => {
    // check the sorting button is clicked or not
    if (!isClickedId) {
      setIsClickedId(true);
      // save the asc data in user data
      setUser(user.sort((a, b) => a.id - b.id));
    } else {
      setIsClickedId(false);
      // save the desc data in user data
      setUser(user.sort((a, b) => b.id - a.id));
    }
  };

  const sortingEmail = () => {
    // check the sorting button is clicked or not
    if (!isClickedEmail) {
      setIsClickedEmail(true);
      // save the asc data in user data
      setUser(
        user.sort((a, b) => {
          if (a.email < b.email) {
            return -1;
          }
          if (a.email > b.email) {
            return 1;
          }
          return 0;
        })
      );
    } else {
      setIsClickedEmail(false);
      // save the desc data in user data
      setUser(
        user.sort((a, b) => {
          if (b.email < a.email) {
            return -1;
          }
          if (b.email > a.email) {
            return 1;
          }
          return 0;
        })
      );
    }
  };

  const themeBtn = (event) => {
    // check event value to set the theme to table
    switch (event.target.value) {
      case "dark":
        setTheme(themes[0]);
        break;

      case "light":
        setTheme(themes[1]);
        break;

      case "blue":
        setTheme(themes[2]);
        break;

      case "red":
        setTheme(themes[3]);
        break;

      default:
        break;
    }
  };

  // save the input filter to var. input
  const changeInput = (event) => {
    setInput(event.target.value);
  };

  const filter = (array, search) => {
    let data = [];

    // looping to check every object in array
    // use for loop cause when using map loop, it cant be break or continue
    // so that cause a bug
    for (let i = 0; i < array.length; i++) {
      let tersimpan;

      // to check if theres any char. that same as input filter in email or not
      // if yes, then save that in data array and update tersimpan var. to continue iteration
      if (array[i].email.toLowerCase().includes(search.toLowerCase())) {
        data.push(array[i]);
        tersimpan = i;
        if (tersimpan == i) {
          continue;
        }
      }

      // to check if theres any char. that same as input filter in programing languages or not
      // if yes, then save previous array in data array and update tersimpan var. to break iteration
      for (let j = 0; j < array[i].programmingLanguages.length; j++) {
        if (
          array[i].programmingLanguages[j]
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          data.push(array[i]);
          tersimpan = i;
          if (tersimpan == i) {
            break;
          }
        }
      }
    }

    // save new data in user array
    setUser(data);
  };

  const submit = () => {
    // call filter function
    filter(users, input);
  };

  const handleKey = (event) => {
    // chech if user press enter key or not
    if (event.key == "Enter") {
      submit(event);
    }
  };

  return (
    <>
      <Head>
        <title>Task Front End</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <TableContainer>
          <SimpleGrid columns={2} spacing={4}>
            <Select
              placeholder="Select theme"
              onChange={(event) => themeBtn(event)}
            >
              <option value="dark">Dark theme</option>
              <option value="light">Light theme</option>
              <option value="blue">Blue theme</option>
              <option value="red">Red theme</option>
            </Select>
            <InputGroup>
              <Input
                placeholder="Input email/prog. languages"
                borderEndRadius="none"
                onChange={(event) => changeInput(event)}
                onKeyDown={(event) => handleKey(event)}
                value={input}
              />
              <Button
                variant={"solid"}
                textColor={theme.headerTextColor}
                bgColor={theme.headerColor}
                borderStartRadius="none"
                _hover={{
                  color: theme.detailTextColor,
                  bgColor: theme.detailColor,
                }}
                _active={{ color: theme.detailTextColor }}
                onClick={() => submit()}
              >
                Filter
              </Button>
            </InputGroup>
          </SimpleGrid>
          <br />
          <Table variant="simple" colorScheme="twitter">
            <Thead bgColor={theme.headerColor}>
              <Tr>
                <Th>
                  <Button
                    rightIcon={
                      !isClickedId ? <TriangleDownIcon /> : <TriangleUpIcon />
                    }
                    color={theme.headerTextColor}
                    variant="link"
                    onClick={() => sortingId()}
                  >
                    ID
                  </Button>
                </Th>
                <Th>
                  <Button
                    rightIcon={
                      !isClickedEmail ? (
                        <TriangleDownIcon />
                      ) : (
                        <TriangleUpIcon />
                      )
                    }
                    color={theme.headerTextColor}
                    variant="link"
                    onClick={() => sortingEmail()}
                  >
                    Email
                  </Button>
                </Th>
                <Th textColor={theme.headerTextColor}>Status</Th>
                <Th textColor={theme.headerTextColor}>Programing Languages</Th>
              </Tr>
            </Thead>
            <Tbody bgColor={theme.detailColor}>
              {user.map((item) => (
                <Tr key={item.id}>
                  <Td textColor={theme.detailTextColor}>{item.id}</Td>
                  <Td textColor={theme.detailTextColor}>{item.email}</Td>
                  <Td textColor={theme.detailTextColor}>
                    {item.isMarried ? "Married" : "Single"}
                  </Td>
                  <Td textColor={theme.detailTextColor}>
                    {item.programmingLanguages.map((item) => item + ", ")}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
}
