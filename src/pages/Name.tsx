import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNameById } from "../store/nameSlice";

import LoadingScreen from "../components/LoadingScreen";

export default function Name() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { data: name, status, error } = useAppSelector((state) => state.name);

  useEffect(() => {
    if (id) {
      dispatch(fetchNameById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;
  if (!name) return <p>No name details found.</p>;

  const handleShareClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    const shareData = {
      title: name.name + "\n",
      text: `${name.name} - ${name.description}\n`,
      url: `${window.location.origin}/names/${name.slug}\n`,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        console.log("Share successful");
      } else alert("Sharing not supported in this browser.");
    } catch (error) {
      console.error("Error preparing share data:", error);
    }
  };

  console.log(name);

  return (
    <>
      <Helmet>
        <title>{name.name} - பெயர்கள்</title>
        <meta name="description" content={`${name.name} (${name.nameInEnglish}) - ${name.meaning}`} />
      </Helmet>

      <Box component="article" maxWidth="lg" mx="auto" mt={4} px={2}>
        <Grid container spacing={2}>
          {/* Main Info */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper component="article" elevation={3}>
              <Box sx={{ p: 3 }}>
                <Box component="header" position="relative">
                  <Chip
                    variant="outlined"
                    size="small"
                    label={name.gender}
                    sx={{
                      position: "absolute",
                      bgcolor: ["ஆண்", "male", "ஆன்", "Male"].some((gen) => gen === name.gender) ? "#99ccff" : "#ffb4d5",
                      p: 2,
                      bottom: 0,
                      right: 0,
                    }}
                  />
                  <Stack direction="row" flexWrap="wrap" spacing={1} alignItems="center">
                    <Typography component="h1" variant="h3" gutterBottom>
                      {name.name}
                    </Typography>
                    <Typography component="span" variant="h6" color="text.secondary">
                      ({name.nameInEnglish})
                    </Typography>
                    {name.tags.length > 0 && (
                      <Stack direction="row" flexWrap="wrap" spacing={1}>
                        {name.tags.map((tag) => (
                          <Link to={`/tags/${tag.slug}`} key={tag.slug}>
                            <Chip label={tag.tag} variant="filled" />
                          </Link>
                        ))}
                      </Stack>
                    )}
                    <Button size="small" color="primary" onClick={handleShareClick}>
                      <ShareIcon />
                    </Button>
                  </Stack>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack component="main" spacing={2}>
                  {name.meaning && (
                    <Typography variant="subtitle1">
                      <strong>பொருள்:</strong> {name.meaning}
                    </Typography>
                  )}

                  {name.description && (
                    <Typography variant="body1">
                      <strong>விளக்கம்:</strong> {name.description}
                    </Typography>
                  )}

                  {name.origin && (
                    <Typography variant="body1">
                      <strong>தோற்றம்:</strong> {name.origin}
                    </Typography>
                  )}

                  {name.literatureEvidence && (
                    <Typography variant="body1">
                      <strong>இலக்கிய ஆதாரம்:</strong> {name.literatureEvidence}
                    </Typography>
                  )}

                  {name.epigraphEvidence && (
                    <Typography variant="body1">
                      <strong>பதிகை ஆதாரம்:</strong> {name.epigraphEvidence}
                    </Typography>
                  )}

                  {name.reference && (
                    <Typography variant="body1">
                      <strong>மேற்கோள்:</strong> {name.reference}
                    </Typography>
                  )}

                  {name.categories.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                      <strong>வகைகள்:</strong>
                      {name.categories.map((category) => (
                        <Link to={`/categories/${category.slug}`} key={category.slug}>
                          <Chip label={category.category} variant="filled" />
                        </Link>
                      ))}
                    </Stack>
                  )}
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack component="footer" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    உருவாக்கப்பட்டது: {new Date(name.createdAt ?? "").toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    புதுப்பிக்கப்பட்டது: {new Date(name.updatedAt ?? "").toLocaleDateString()}
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* <Grid size={{ xs: 12, md: 6 }}>
            {name.comments!.length === 0 ? (
              <p>No Comments Yet</p>
            ) : (
              <div>
                <p>All comments</p>
              </div>
            )}
          </Grid> */}

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack component="aside" spacing={3}>
              {/* Related Names */}
              {name.relatedNames?.length > 0 && (
                <Paper component="section" elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    <strong>தொடர்புடைய பெயர்கள் :</strong>
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    {name.relatedNames.map((related) => (
                      <Link to={`/names/${related.slug}`} style={{ width: "fit-content" }} key={related.slug}>
                        <Chip key={related.slug} label={related.name} color="primary" variant="outlined" />
                      </Link>
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Other Names */}
              {name.otherNames?.length > 0 && (
                <Paper component="section" elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    <strong>மற்ற பெயர்கள் :</strong>
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    {name.otherNames.map((other) => (
                      <Link to={`/names/${other.slug}`} style={{ width: "fit-content" }} key={other.slug}>
                        <Chip key={other.slug} label={other.name} variant="filled" />
                      </Link>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
