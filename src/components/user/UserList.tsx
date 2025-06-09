import {
  Box,
  ButtonGroup,
  For,
  IconButton,
  Pagination,
} from "@chakra-ui/react";
import UserCard from "./UserCard";
import type { GithubUser } from "@/utils";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function UserList({
  fetchedUsers,
  loading,
  error,
  searchValue,
  onSearch,
}: {
  fetchedUsers: GithubUser[];
  loading: boolean;
  error: string;
  searchValue: string;
  onSearch: (page: number) => void;
}) {
  return (
    <>
      <div>
        {fetchedUsers?.length > 0 && (
          <Box p={8} marginTop={20}>
            {loading && <Box>Loading...</Box>}
            {error && <Box color="red.500">{error}</Box>}
            {fetchedUsers.length > 0 && (
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
                gap={4}
              >
                <For each={fetchedUsers} fallback={<Box>Loading users...</Box>}>
                  {(user) => <UserCard key={user.id} user={user} />}
                </For>
              </Box>
            )}
            {fetchedUsers.length === 0 && !loading && !error && searchValue && (
              <Box fontSize="md" color="gray.600">
                No results found. Please try a different username.
              </Box>
            )}
          </Box>
        )}
      </div>
      {fetchedUsers.length > 0 && (
        <Pagination.Root
          count={fetchedUsers.length}
          pageSize={4}
          defaultPage={1}
          onPageChange={(details) => onSearch(details.page)}
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
      )}
    </>
  );
}
