import {
  Box,
  Flex,
  useColorModeValue,
  CloseButton,
  Text,
  Image,
} from "@chakra-ui/react";
import NavItem from "components/NavItem";
import useAuth from "hooks/useAuth";
import { SidebarContentProps, LinkItemProps } from "./types";
import {
  DoctorLinks,
  PatientLinks,
  AdminLinks,
  ReceptionistLinks,
} from "./config";
import { useMemo } from "react";
import image from "assets/logo.jpg";

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  const { auth } = useAuth();

  const Links: Array<LinkItemProps> = useMemo(() => {
    if (!auth) return [];
    const { role } = auth;

    if (role === "doctor") return DoctorLinks;

    if (role === "patient") return PatientLinks;

    if (role === "admin") return AdminLinks;

    if (role === "receptionist") return ReceptionistLinks;

    return [];
  }, [auth]);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#002230", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("#002230", "gray.700")}
      w={{ base: "full", md: 60 }}
      color="white"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Medocs
        </Text>
        <Image src={image} alt="logo" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {Links.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
