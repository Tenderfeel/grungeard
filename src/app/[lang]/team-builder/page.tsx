import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


async function getCharacters(): Promise<Character[]> {
  // Server-side fetch requires an absolute URL.
  const host = 'http://localhost:9000';
  const url = `${host}/api/characters`;

  // We add { cache: 'no-store' } to ensure the data is fetched on every request.
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary.
    throw new Error('Failed to fetch characters from the API.');
  }

  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const characters = await getCharacters();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <List>
          {characters.map((char, index) => (
            <React.Fragment key={char.id}>
              <ListItem>
                <ListItemText
                  primary={char.name[lang as Lang]}
                  secondary={char.fullName[lang as Lang]}
                />
              </ListItem>
              {index < characters.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}