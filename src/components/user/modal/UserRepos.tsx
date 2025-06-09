import { octokit } from "@/App";
import type { Repo } from "@/utils";
import {
  Button,
  ButtonGroup,
  Card,
  For,
  HStack,
  IconButton,
  Pagination,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function UserRepos({ user }: { user: any }) {
  const [repos, setRepos] = useState<{ data: Repo[]; total_count: number }>({
    data: [],
    total_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const fetchUserRepos = async () => {
    setLoading(true);
    try {
      const response = await octokit.request("GET /users/{username}/repos", {
        username: user.login,
        sort: "created",
        per_page: 4,
        page: page,
        type: "all",
      });
      console.log("Fetched Repos:", response);
      setRepos({
        data: response.data.map((repo: any) => ({
          ...repo,
          language: repo.language ?? null,
        })),
        total_count: user.public_repos,
      });
    } catch (error) {
      console.error("Error fetching user repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user repositories when the component mounts or user changes
    if (user && user.login) {
      fetchUserRepos();
    }
  }, [user]);

  useEffect(() => {
    // Fetch user repositories when the page changes
    if (user && user.login) {
      fetchUserRepos();
    }
  }, [page, user]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          columnGap: "0px",
          padding: "16px",
        }}
      >
        <h2 style={{ gridColumn: "1 / -1", marginBottom: "16px" }}>
          Repositories for {user.login}
        </h2>

        {loading && (
          <Stack gap="6" maxW="xs">
            <HStack width="full">
              <SkeletonCircle size="10" loading={loading} />
              <SkeletonText noOfLines={2} loading={loading} />
            </HStack>
            <Skeleton height="200px" loading={loading} />
          </Stack>
        )}

        {!loading && repos.data.length > 0 && (
          <For
            each={repos.data}
            fallback={!loading && <div>No repositories found.</div>}
          >
            {(repo) => (
              <Card.Root
                key={repo.id}
                width="400px"
                mb="4"
                borderRadius="md"
                boxShadow="md"
              >
                <Card.Body gap="2">
                  <Card.Title>{repo.name}</Card.Title>
                  <Card.Description>
                    {repo.description || "No description available."}
                    <br />
                    <strong>Language:</strong> {repo.language || "N/A"}
                    <br />
                    <strong>Stars:</strong> {repo.stargazers_count || 0}
                    <br />
                    <strong>Forks:</strong> {repo.forks_count || 0}
                    <br />
                    <strong>Created At:</strong>{" "}
                    {new Date(repo.created_at).toLocaleDateString()}
                  </Card.Description>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                  <Button variant="outline">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Repository
                    </a>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )}
          </For>
        )}
      </div>
      <Pagination.Root
        count={user.public_repos}
        pageSize={4}
        defaultPage={1}
        onPageChange={(details) => setPage(details.page)}
        display={"flex"}
        justifyContent="center"
        margin={"20px 0"}
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </>
  );
}
