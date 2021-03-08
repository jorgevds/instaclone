import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Center, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../../components/Wrapper";
import InputField from "../../components/Form/InputField";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import NextLink from "next/link";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // success
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Center flexDirection="column" w="">
              <Box mt={4}>
                <InputField
                  label="Username or Email"
                  placeholder="username or email"
                  name="usernameOrEmail"
                />
                <InputField
                  label="Password"
                  placeholder="password"
                  name="password"
                  type="password"
                />
              </Box>
              <Box mt={4}>
                <NextLink href="/user/change-password/forgot-password">
                  <Link>Forgot password?</Link>
                </NextLink>
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                bg="teal"
                color="white"
              >
                Login
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
