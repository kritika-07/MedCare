import SidebarWithHeader from "components/Sidebar";
import {
  Box,
  Stack,
  Container,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function AdminUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      password: "",
      role: data.role,
      password2: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.password === values.password2) {
        const { name, email, password, role } = values;

        if (id) {
          fetch(`http://localhost:3001/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
          }).then(() => {
            alert("changes saved Successfully!");
            window.location.reload();
          });
        } else {
          fetch("http://localhost:3001/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
          }).then(() => {
            alert("Successfully added a new user!");
            window.location.reload();
          });
        }
      } else {
        alert("Passwords do not match!");
      }
    },
  });

  return (
    <>
      <SidebarWithHeader>
        <Container maxW="container.xl" py={4}>
          <Box bg="white" p={5} rounded="md" boxShadow="base">
            <Tooltip label="Come back">
              <Button onClick={handleGoBack} mb="4">
                <Icon as={ChevronLeftIcon} />
              </Button>
            </Tooltip>
            <Heading size="lg" mb={3}>
              {id ? "Edit User" : "Add User"}
            </Heading>
            <Stack>
              <form onSubmit={formik.handleSubmit}>
                <FormControl mb="24px">
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <Select
                    placeholder="Select option"
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    name="role"
                    id="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                  >
                    <option value="doctor">Doctor</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="patient">Patient</option>
                  </Select>
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <FormHelperText>
                    Make sure the email is correct.
                  </FormHelperText>
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    size="lg"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <FormHelperText>
                    {id
                      ? "Enter the old password if you do not want to change the password."
                      : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel htmlFor="password2">Confirm Password</FormLabel>
                  <Input
                    id="password2"
                    name="password2"
                    type="password"
                    size="lg"
                    placeholder="Confirm Password"
                    variant="outline"
                    fontSize="sm"
                    ms="4px"
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                  />
                  <FormHelperText>Confirm password again.</FormHelperText>
                </FormControl>
                <Button
                  w="fit-content"
                  colorScheme="blue"
                  color="white"
                  type="submit"
                >
                  {id ? "Save" : "Add User"}
                </Button>
              </form>
            </Stack>
          </Box>
        </Container>
      </SidebarWithHeader>
    </>
  );
}
