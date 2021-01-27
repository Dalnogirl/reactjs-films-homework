import {useHistory} from 'react-router-dom'
import React, {useEffect} from 'react'
import useIntersection from '../../../hooks/useIntersection'
import {debouncedUrlCreatorForPagination} from '../../utils/functions/functions'

const Trigger = ({location}) => {
  const history = useHistory()
  const {observerEntry, elRef} = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: '30px',
  })
  useEffect(() => {
    if (observerEntry.isIntersecting) {
      const url = debouncedUrlCreatorForPagination(location)
      if (url !== 'debounced') {
        history.push(url)
      }
    }
  }, [observerEntry.isIntersecting])

  return (
      <div ref={elRef}>
        <h2>Scroll To Load More</h2>
      </div>
  )
}

export default Trigger
