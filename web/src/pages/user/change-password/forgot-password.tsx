import { Center, Box, Link, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import InputField from "../../../components/Form/InputField";
import { Wrapper } from "../../../components/Wrapper";
import NextLink from "next/link";
import { useForgotPasswordMutation } from "../../../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
          // success
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Center>Email sent!</Center>
          ) : (
            <Form>
              <Center flexDirection="column" w="">
                <Box mt={4}>
                  <InputField label="Email" placeholder="email" name="email" />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  bg="teal"
                  color="white"
                >
                  Forget password
                </Button>
              </Center>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
