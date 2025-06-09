import { Box, Input } from "@chakra-ui/react";
import React, { useEffect } from "react";

export default function Header({
  onSearch,
  fetchedUsers,
  onInputChange,
}: {
  onSearch: () => void;
  fetchedUsers: any[];
  onInputChange: (value: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter") inputRef.current?.focus();
    });
  }, []);

  return (
    <Box
      lg={{
        p: 8,
      }}
      marginTop={"30px"}
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box fontSize="2xl" fontWeight="bold" mb={4}>
        GitLookup
      </Box>
      <Box>
        This is a simple application to explore Git repositories and their
        contents.
      </Box>
      <Box mt={4} position="relative">
        <Input
          placeholder="Search for a GitHub user..."
          size="lg"
          width={"100%"}
          ref={inputRef}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
        <Box color={"#888"}>
          {new Date().getFullYear()}© GitLookup, an Alessandro Sgattoni
          (Sgattix) Web Application. All rights reserved.
        </Box>
        {/* This should be displayed as a command palette inside the input field like MacOS/Notion */}
        <Box
          position={"absolute"}
          top={2}
          right={4}
          userSelect={"none"}
          color={"#888"}
        >
          <code
            style={{
              backgroundColor: "#f0f0f0",
              padding: "2px 4px",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#555",
            }}
          >
            Ctrl + Enter
          </code>{" "}
        </Box>
        {fetchedUsers.length === 0 && (
          <Box mt={4} fontSize="md" color="gray.600" textAlign="center">
            Enter a GitHub username to get started.
          </Box>
        )}
      </Box>
    </Box>
  );
}
