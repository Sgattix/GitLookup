import { Avatar, Box, CloseButton, Dialog, Skeleton } from "@chakra-ui/react";
import UserOrganizations from "./UserOrganizations";
import moment from "moment";
import type { GithubUser } from "@/utils";
import UserRepos from "./UserRepos";

export default function UserModal({
  previewActive,
  user,
  loading,
  onModalClose,
}: {
  previewActive: boolean;
  user: GithubUser;
  loading: boolean;
  onModalClose: (value: boolean) => void;
}) {
  return (
    <Dialog.Root open={previewActive} size="cover">
      <Dialog.CloseTrigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content height="max-content" width="100%">
          <Dialog.Header display={"block"} gap="2">
            <Dialog.Title>Infos of {user.login}</Dialog.Title>
            <Dialog.Description>
              Here are the information for {user.login}.
            </Dialog.Description>
            <Dialog.CloseTrigger asChild onClick={() => onModalClose(false)}>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="4" p="4">
            <div>{previewActive && <UserRepos user={user} />}</div>
            <Skeleton asChild loading={loading}>
              <Box>
                <Box p="4">
                  <Avatar.Root size="xl" shape="rounded">
                    <Avatar.Image src={user.avatar_url} />
                    <Avatar.Fallback name={user.login || "Unknown User"} />
                  </Avatar.Root>
                  <Box mt="4">
                    <strong>Bio:</strong> {user.bio || "No bio available."}
                  </Box>
                  <Box mt="2">
                    <strong>Followers:</strong> {user.followers || 0}
                  </Box>
                  <Box mt="2">
                    <p>
                      <strong>Public Repositories:</strong>{" "}
                      {user.public_repos || 0}
                    </p>
                    <p>
                      <strong>Private Repositories:</strong>{" "}
                      {user.total_private_repos || 0}
                    </p>
                  </Box>
                  <Box mt="2">
                    <strong>Joined:</strong>{" "}
                    {moment(user.created_at).format("MMMM Do YYYY")}
                  </Box>
                  <Box mt="2">
                    <strong>Location:</strong> {user.location || "N/A"}
                  </Box>
                  <Box mt="2">
                    <strong>Company:</strong> {user.company || "N/A"}
                  </Box>
                  <Box mt="2">
                    <strong>Blog:</strong>{" "}
                    {user.blog ? (
                      <a
                        href={user.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.blog}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </Box>
                </Box>
                <UserOrganizations username={user.login} />
              </Box>
            </Skeleton>
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
