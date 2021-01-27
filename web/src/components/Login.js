import Axios from "axios";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Flex,
  Container,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import auth from "../auth";
// import { Register } from "./router/Public";

const Login = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    auth.login({email, password})
      .then((res) => {
        console.log(res);
        props.setAuth(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return (
    <Container>
      <Box
        flex
        justifyContent="cemter"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        margin="20px"
        padding="20px"
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <Button
                  spinner={isLoading}
                  colorScheme="blue"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <LockIcon />
                  <Text paddingLeft="8px">Log me in</Text>
                </Button>
              </form>
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Login;

const Register = (props) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Axios.post("/register", {
      fullName: name,
      email,
      password,
      confirmPassword,
    })
      .then((res) => {
        console.log(res);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form>
      <FormControl id="name">
        <FormLabel>Full name</FormLabel>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Full name"
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl id="register-email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl id="register-password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl id="confirm_password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="confirm_password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <Button
        spinner={isLoading}
        colorScheme="blue"
        type="submit"
        onClick={handleRegister}
      >
        <LockIcon />
        <Text paddingLeft="8px">Register</Text>
      </Button>
    </form>
  );
};
