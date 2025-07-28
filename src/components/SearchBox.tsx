import { useState, useEffect, useCallback } from "react";

import { Box, Stack, TextField, MenuItem } from "@mui/material";

import { getAllNames } from "../firebase/services/nameService";
import { endAt, orderBy, startAt } from "firebase/firestore";

import type { NameCardType } from "../types/types";
import { useAppSelector } from "../store/hooks";

type SearchField = "name" | "nameInEnglish" | "slug";

interface SearchBoxProps {
  onResults: (names: NameCardType[]) => void;
}

export default function SearchBox({ onResults }: SearchBoxProps) {
  const [searchField, setSearchField] = useState<SearchField>("name");
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const { currentUser: user } = useAppSelector((state) => state.user);

  const fetchNames = useCallback(async () => {
    try {
      console.log("Fetching names with searchText:", query);
      const names = await getAllNames([orderBy(searchField), startAt(query), endAt(query + "\uf8ff")]);

      onResults(names);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchField, query, onResults]);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchText.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // Fetch names when the debounced searchText changes
  useEffect(() => {
    if (!query) {
      onResults([]);
      return;
    }

    fetchNames();
  }, [query, onResults, fetchNames]);

  return (
    <Box maxWidth={600} mx="auto" p={4}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} mb={3}>
        <TextField
          select
          label="Search Field"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value as SearchField)}
          size="small"
          sx={{ minWidth: 160, maxWidth: 180 }}
        >
          <MenuItem value="name">Name (தமிழ்)</MenuItem>
          <MenuItem value="nameInEnglish">Name (English)</MenuItem>
          {user && user.isAdmin && <MenuItem value="slug">Slug</MenuItem>}
        </TextField>

        <TextField
          label={
            searchField === "name"
              ? "பெயரைத் தமிழில் தேடுங்கள்"
              : searchField === "nameInEnglish"
              ? "பெயரை ஆங்கிலத்தில் தேடுங்கள்"
              : "Search by Slug"
          }
          variant="outlined"
          fullWidth
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Stack>
    </Box>
  );
}
