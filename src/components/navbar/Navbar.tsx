import { Box, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box
      bgColor="gray.800"
      color="white"
      p={8}
      lg={{
        display: "flex",
      }}
      height={"1/5"}
      display="block"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
      flexWrap={"wrap"}
    >
      <Box fontSize="xl" fontWeight="bold">
        GitLookup
      </Box>
      <Box mt={2} display="flex" alignItems="center">
        <Link
          as="a"
          href="/"
          mr={4}
          color="white"
          _hover={{ textDecoration: "underline" }}
        >
          Home
        </Link>
        <Link
          as="a"
          href="/about"
          mr={4}
          color="white"
          _hover={{ textDecoration: "underline" }}
        >
          About
        </Link>
        <Link
          as="a"
          href="/contact"
          color="white"
          _hover={{ textDecoration: "underline" }}
        >
          Contact
        </Link>
      </Box>
    </Box>
  );
}
