import React from "react";
import { Avatar, Box } from "@chakra-ui/react";
type Organization = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
};

export default function UserOrganizations({ username }: { username: string }) {
  // This component will display the organizations the user is a member of
  // You can fetch the organizations from an API or use a static list for now

  const [organizations, setOrganizations] = React.useState<Organization[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username.toLowerCase()}/orgs`
        );
        const data = await response.json();
        console.log("Organizations:", data);
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    })();
  }, []);
  return (
    <div style={{ padding: "1.2em" }}>
      <h2 style={{ fontSize: "1.2em", fontWeight: "bold" }}>
        Public User Organizations
      </h2>
      <ul>
        {organizations.length > 0 &&
          organizations.map((org) => (
            <Box
              key={org.id}
              borderWidth="1px"
              borderRadius="md"
              p="4"
              mb="2"
              display="flex"
              alignItems="center"
              gap="4"
            >
              <Avatar.Root size="md" shape="rounded" mb="2">
                <Avatar.Image src={org.avatar_url} />
                <Avatar.Fallback name={org.login || "Unknown Organization"} />
              </Avatar.Root>
              <Box>
                <a href={org.url} target="_blank" rel="noopener noreferrer">
                  {org.login}
                </a>
                <p>{org.description || "No description available."}</p>
              </Box>
            </Box>
          ))}
      </ul>
    </div>
  );
}
