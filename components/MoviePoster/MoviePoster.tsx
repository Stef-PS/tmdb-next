import { useState } from 'react'
import styles from './MoviePoster.module.css' 

interface MoviePosterProps {
  imageUrl: string,
  fallbackUrl: string,
  alt: string,
  aspectRatio?: string,
  testError?: boolean
}

const MoviePoster = ({ imageUrl, fallbackUrl, alt, aspectRatio = '', testError = false }: MoviePosterProps) => {
  const [error, setError] = useState(testError)
  const errorCallback = () => fallbackUrl && setError(true)
  return (
    <div className={styles.MoviePoster} style={{ aspectRatio }}>
      <img src={error ? fallbackUrl : imageUrl} alt={alt} onError={errorCallback} />
    </div>
  )
}

export default MoviePoster
