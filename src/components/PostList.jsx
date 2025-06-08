import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Erro ao buscar posts:', error));
  }, []);

  const handlePostClick = (id) => {
    window.open(`/dados/${id}`, '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom sx={{ color: '#ff2781' }}>
          Prova Programação Web
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#ff2781' }}>
          Lista de Posts
        </Typography>
      </Box>

      <List>
        {posts.map(post => (
          <ListItem key={post.id} disablePadding>
            <ListItemButton onClick={() => handlePostClick(post.id)}>
              <ListItemText primary={post.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default PostList;
