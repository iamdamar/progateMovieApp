export interface MovieItemProps {
    movie: Movie
    size: { width: number; height: number }
    coverType: 'poster' | 'backdrop'
  }