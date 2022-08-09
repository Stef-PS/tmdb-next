import styles from './Rating.module.css'

interface RatingProps {
  rate: number,
}

const Rating = ({ rate }: RatingProps) => {
  const onNumber = Math.round(rate / 2)
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_star, index) => {        
        const starClass = index < onNumber ? styles.star : styles.starEmpty
        return (
          <span key={index} className={starClass}>&#9733;</span>        
        );
      })}
    </div>
  )
}

export default Rating
