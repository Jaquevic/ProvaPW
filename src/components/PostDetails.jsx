import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import styles from './PostDetails.module.css';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then(response => response.json())
      .then(userData => {
        setAuthor(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar post ou autor:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6">Post não encontrado.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom className={styles.titlePost}>
        {post.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {post.body}
      </Typography>

      {author && (
        <Box className={styles.authorBox}>
          <Typography variant="h6" gutterBottom className={styles.authorTitle}>
            Autor
          </Typography>
          <Typography variant="body1">
            <span className={styles.authorLabel}>Nome:</span> {author.name}
          </Typography>
          <Typography variant="body1">
            <span className={styles.authorLabel}>Email:</span> {author.email}
          </Typography>
          <Typography variant="body1">
            <span className={styles.authorLabel}>Website:</span> {author.website}
          </Typography>
          <Typography variant="body1">
            <span className={styles.authorLabel}>Empresa:</span> {author.company?.name}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default PostDetails;
