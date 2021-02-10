import React, {useEffect} from 'react'
import useIntersection from '../../../hooks/useIntersection'
import {debounce} from '../../utils/functions/functions'
import {moviesActions} from '../../../redux/moviesReducer'
import {useDispatch} from 'react-redux'

const Trigger = ({}) => {
  const {observerEntry, elRef} = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: '30px',
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (observerEntry.isIntersecting) {
      console.log(observerEntry.isIntersecting)
      dispatch(moviesActions.incrementCurrentPage())

    }
  }, [observerEntry.isIntersecting])

  return (
      <div ref={elRef}>
        <h2>Scroll To Load More</h2>
      </div>
  )
}



export default Trigger
