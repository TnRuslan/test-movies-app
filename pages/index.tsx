import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import FilmSelect from '@/src/components/filmSelect';
import { useAppSelector } from '@/src/hooks/hooks';
import { filmAPI } from '@/src/services/filmService';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Skeleton } from '@mui/material';

export const theme = createTheme();

export default function Album() {
  const [page, setPage] = useState(1);

  const searchName = useAppSelector(state => state.filmsReducer.searchName);

  const {
    data: films,
    error,
    isLoading,
  } = filmAPI.useGetFilmsByTitleQuery({ searchName, page });

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const pageQuantity: number = Math.round(
    films?.totalResults ? films?.totalResults / 10 : 0
  );

  return (
    <>
      <Head>
        <title>FILMS</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Search films by name
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <FilmSelect />
          {isLoading && <h1>Loading...</h1>}
          {error && <h1> Erorr</h1>}

          {films?.Search ? (
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                {films?.Search.map(film => (
                  <Grid item key={film.imdbID} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {film.Poster !== 'N/A' ? (
                        <CardMedia
                          component="img"
                          image={film.Poster}
                          alt="random"
                        />
                      ) : (
                        <Skeleton animation={false} height={400} />
                      )}

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {film.Title}
                        </Typography>
                        <Typography>{film.Year}</Typography>
                      </CardContent>

                      <CardActions>
                        <Button size="small">
                          <Link href={`/film/${film.imdbID}`}> to film</Link>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          ) : (
            <h1></h1>
          )}

          {pageQuantity > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={2}>
                <Pagination
                  count={pageQuantity}
                  page={page}
                  onChange={handlePagination}
                />
              </Stack>
            </Box>
          )}
        </main>

        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Thanks for using our site
          </Typography>
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </>
  );
}
