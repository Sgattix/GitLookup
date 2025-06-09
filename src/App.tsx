import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import { Octokit } from "octokit";
import Header from "./components/Header";
import { searchUsers, TOKEN, type GithubUser } from "./utils";
import UserList from "./components/user/UserList";

// Note: The GitHub token should be stored securely and not hardcoded in production code.
// For demonstration purposes, it is included here, but in a real application,
// you should use environment variables or a secure vault to manage sensitive information.
// Ensure you have the necessary permissions for the token to access user data.
export const octokit = new Octokit({
  auth: TOKEN,
});

function App() {
  const [user, setUser] = useState("");

  const [fetchedUsers, setFetchedUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (page: number = 1) => {
    if (user.length < 3) return; // Minimum length for search query
    if (user.trim() === "") {
      // Check for empty input
      setError("Please enter a valid GitHub username.");
      return;
    }
    // AbortController to cancel the request if needed
    const controller = new AbortController();

    setLoading(true);
    setError("");

    (async () => {
      const searchedUsers = await searchUsers(user, controller, page);
      setFetchedUsers(searchedUsers.items ?? []);
      setLoading(false);
    })();

    return () => {
      controller.abort(); // Abort the request if the component unmounts
      setLoading(false); // Reset loading state
      setError(""); // Reset error state
      setFetchedUsers([]); // Clear fetched users
      setUser(""); // Clear the search input
    };
  };

  return (
    <Box className="App" minHeight="100vh" display="block">
      <Navbar />
      <Header
        onSearch={handleSearch}
        onInputChange={setUser}
        fetchedUsers={fetchedUsers}
      />

      <UserList
        fetchedUsers={fetchedUsers}
        loading={loading}
        error={error}
        searchValue={user}
        onSearch={handleSearch}
      />
    </Box>
  );
}

export default App;
