import { useState, useEffect, useCallback, useRef } from "react";

import { Box, Stack, TextField, MenuItem, Paper, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AnimatePresence, motion } from "framer-motion";

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
  const [showSeachBox, setShowSearchBox] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);

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

  // 👇 Custom click-away logic to avoid dropdown issues
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;

      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node) && target && !target.closest('[role="option"]')) {
        setShowResults(false);
        setShowSearchBox(false);
      }
    };

    if (showSeachBox) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSeachBox]);

  return (
    <Box ref={searchBoxRef}>
      <AnimatePresence mode="wait">
        {!showSeachBox ? (
          <motion.div key="icon" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <IconButton onClick={() => setShowSearchBox(true)} sx={{ mr: { xs: 1, md: 2 } }} size="small">
              <SearchIcon />
            </IconButton>
          </motion.div>
        ) : (
          <motion.div
            key="searchbox"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Box sx={{ position: "relative", maxWidth: 600, mt: 2, mr: 2 }}>
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
                  label={searchField === "name" ? "தமிழில் தேட" : searchField === "nameInEnglish" ? "ஆங்கிலத்தில் தேட" : "Search by Slug"}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={searchText}
                  onFocus={() => setShowResults(true)}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Stack>

              {showResults && results.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
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
                </motion.div>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
