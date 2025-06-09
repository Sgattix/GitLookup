import { Avatar, Button, Card, Skeleton } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { octokit } from "@/App";
import type { GithubUser } from "@/utils";
import UserModal from "./modal/UserModal";

export default function UserCard({ user }: { user: any }) {
  const [previewActive, setPreviewActive] = useState(false);
  const [advancedUser, setAdvancedUser] = useState<Partial<GithubUser>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await octokit.request("GET /user/{account_id}", {
        account_id: user.id,
      });

      setAdvancedUser(response.data);
      setLoading(false);
    })();
  }, [user]);

  return (
    <Skeleton loading={loading}>
      <>
        <Card.Root width="320px" key={user.id}>
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src={user.avatar_url} />
              <Avatar.Fallback name={user.login || "Unknown User"} />
            </Avatar.Root>
            <Card.Title mb="2">{user.login}</Card.Title>
            <Card.Description>
              {user.bio || "No bio available."}
              <br />
              <strong>Followers:</strong> {advancedUser.followers}
              <br />
              <strong>Repositories:</strong>{" "}
              {advancedUser.total_private_repos + advancedUser.public_repos ||
                0}
              <br />
              <strong>Joined:</strong>{" "}
              {moment(new Date(advancedUser.created_at)).format("MMMM Do YYYY")}
              <br />
              <strong>Location:</strong> {advancedUser.location || "N/A"}
              <br />
              <strong>Company:</strong> {advancedUser.company || "N/A"}
              <br />
              <strong>Blog:</strong>{" "}
              {advancedUser.blog ? (
                <a
                  href={advancedUser.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {advancedUser.blog}
                </a>
              ) : (
                "N/A"
              )}
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </Button>
            <Button onClick={() => setPreviewActive(!previewActive)}>
              {previewActive ? "Hide Preview" : "Show Preview"}
            </Button>
          </Card.Footer>
        </Card.Root>
        <UserModal
          previewActive={previewActive}
          user={{ ...user, ...advancedUser }}
          loading={loading}
          onModalClose={setPreviewActive}
        />
      </>
    </Skeleton>
  );
}
