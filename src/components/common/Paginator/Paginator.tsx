import React, { useState } from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'
import { Button } from 'antd'

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage?: number
  onPageChanged?: (pageNumber: number) => void
  portionSize?: number
}
let Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage = 1,
  onPageChanged = (x) => x,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)

  let pages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <Button
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}>
          PREV
        </Button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <Button
              style={{ width: '30px' }}
              className={cn(
                {
                  [styles.selectedPage]: currentPage === p,
                },
                styles.pageNumber,
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p)
              }}>
              {p}
            </Button>
          )
        })}
      {portionCount > portionNumber && (
        <Button
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}>
          NEXT
        </Button>
      )}
    </div>
  )
}
export default Paginator
