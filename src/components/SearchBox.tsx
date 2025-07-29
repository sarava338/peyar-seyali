import { useState, useEffect, useCallback } from "react";

import { Box, Stack, TextField, MenuItem, Paper, Typography, ClickAwayListener } from "@mui/material";

import { getAllNames } from "../firebase/services/nameService";
import { endAt, orderBy, startAt } from "firebase/firestore";

import { useAppSelector } from "../store/hooks";
import type { NameCardType } from "../types/types";

type SearchField = "name" | "nameInEnglish" | "slug";

export default function SearchBox() {
  const [searchField, setSearchField] = useState<SearchField>("name");
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NameCardType[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { currentUser: user } = useAppSelector((state) => state.user);

  const fetchNames = useCallback(async () => {
    try {
      console.log("Fetching names with searchText:", query);
      const names = await getAllNames([orderBy(searchField), startAt(query), endAt(query + "\uf8ff")]);

      setResults(names);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchField, query, setResults]);

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
      setResults([]);
      return;
    }

    fetchNames();
  }, [query, fetchNames]);

  return (
    <ClickAwayListener onClickAway={() => setShowResults(false)}>
      <Box maxWidth={600} mx="auto" p={4} sx={{ position: "relative" }}>
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
            onFocus={() => setShowResults(true)}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Stack>

        {showResults && results.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              left: 0,
              right: 0,
              width: "100%",
              maxHeight: 400,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#fff",
              boxShadow: 3,
            }}
          >
            <Stack spacing={2}>
              {results.map((result) => (
                <Paper key={result.slug} elevation={2} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {result.nameInEnglish}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {result.slug}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
