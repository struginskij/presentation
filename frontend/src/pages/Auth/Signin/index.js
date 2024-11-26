import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signin({ setIsSignInVisible }) {
  // const { login } = useAuth();
  let navigate = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   // validationSchema,
  //   onSubmit: async (values, bag) => {
  //     try {
  //       const loginResponse = await fetchLogin({
  //         email: values.email,
  //         password: values.password,
  //       });
  //       login(loginResponse);
  //       console.log(values.email, "email");
  //       navigate("/");
  //     } catch (e) {
  //       bag.setErrors({ general: e.response.data.message });
  //     }
  //   },
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5}>
            {/* {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert> */}
            {/* )} */}
          </Box>
          <Box my={5} textAlign="left">
            <form
              onSubmit={() => {
                if (password === "admin" && email === "admin") {
                  navigate("/");
                  setIsSignInVisible(true);
                } else {
                  throw new Error("Incorrect credentials");
                }
              }}
            >
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormControl>

              <Button mt="4" width="full" type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
