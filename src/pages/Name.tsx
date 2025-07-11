import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MDEditor from "@uiw/react-md-editor";

import { Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNameById } from "../store/nameSlice";

import LoadingScreen from "../components/LoadingScreen";
import Error from "./Error";

export default function Name() {
  const { nameSlug } = useParams<{ nameSlug: string }>();
  const dispatch = useAppDispatch();
  const { data: name, status, error } = useAppSelector((state) => state.name);

  useEffect(() => {
    if (nameSlug) dispatch(fetchNameById(nameSlug));
  }, [dispatch, nameSlug]);

  if (status === "loading") return <LoadingScreen />;
  if (error) return <Error code={500} messege={error} />;
  if (!name) return <Error code={404} messege={`Name not found for ${nameSlug}`} />;

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
      } else alert("Sharing not supported in this browser.");
    } catch (error) {
      console.error("Error preparing share data:", error);
    }
  };

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
                <Box component="header">
                  <Stack direction="row" flexWrap="wrap" spacing={2} alignItems="center">
                    <Typography component="h1" variant="h3" gutterBottom>
                      {name.name}
                    </Typography>

                    <Typography component="span" variant="h6" color="text.secondary">
                      ({name.nameInEnglish})
                    </Typography>

                    <Chip
                      variant="outlined"
                      size="small"
                      label={name.gender}
                      sx={{
                        bgcolor: "ஆண்" === name.gender ? "#99ccff" : "#ffb4d5",
                        p: 2,
                      }}
                    />

                    <Button size="small" color="primary" onClick={handleShareClick}>
                      <ShareIcon />
                    </Button>
                  </Stack>
                  {name.tags.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ m: 2 }}>
                      {name.tags.map((tag) => (
                        <Link to={`/tags/${tag.slug}`} key={tag.slug}>
                          <Chip label={tag.tag} variant="filled" />
                        </Link>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack component="main" spacing={2}>
                  {name.meaning && (
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        பொருள்:{" "}
                        <Typography variant="body1" component="span">
                          {name.meaning}
                        </Typography>
                      </Typography>
                    </Box>
                  )}

                  {name.origin && (
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        தோற்றம்:{" "}
                        <Typography variant="body1" component="span">
                          {name.origin}
                        </Typography>
                      </Typography>
                    </Box>
                  )}

                  {name.description && (
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        விளக்கம்:
                      </Typography>
                      <Box sx={{ p: 3 }}>
                        <MDEditor.Markdown source={name.description} />
                      </Box>
                    </Box>
                  )}

                  {name.special && (
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        சிறப்பு:
                      </Typography>
                      <Box sx={{ p: 3 }}>
                        <MDEditor.Markdown source={name.special} />
                      </Box>
                    </Box>
                  )}

                  {name.literatureEvidence && (
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        இலக்கிய ஆதாரம்:
                      </Typography>
                      <Box sx={{ p: 3 }}>
                        <MDEditor.Markdown source={name.literatureEvidence} />
                      </Box>
                    </Box>
                  )}

                  {name.epigraphEvidence && (
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        கல்வெட்டு ஆதாரம்:
                      </Typography>
                      <Box sx={{ p: 3 }}>
                        <MDEditor.Markdown source={name.epigraphEvidence} />
                      </Box>
                    </Box>
                  )}

                  {name.reference && (
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        மேற்கோள்:
                      </Typography>
                      <Box sx={{ p: 3 }}>
                        <MDEditor.Markdown source={name.reference} />
                      </Box>
                    </Box>
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
