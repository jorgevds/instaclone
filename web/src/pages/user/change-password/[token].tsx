import { Box, Button, Center, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { toErrorMap } from "../../../../utils/toErrorMap";
import InputField from "../../../components/Form/InputField";
import { Wrapper } from "../../../components/Wrapper";
import { useChangePasswordMutation } from "../../../generated/graphql";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if (`token` in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // success
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Center flexDirection="column">
              <Flex mt={4}>
                <InputField
                  label="New Password"
                  placeholder="new password"
                  name="newPassword"
                  type="password"
                />
              </Flex>
              {tokenError && (
                <Flex>
                  <Box color="red">{tokenError}</Box>
                </Flex>
              )}
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                bg="teal"
                color="white"
              >
                Change password
              </Button>
              <Box>
                <NextLink href="/">
                  <Link>Home</Link>
                </NextLink>
              </Box>
            </Center>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
