

export const getOneMonthRange = (date) => {
 const year = date.getFullYear()
 const month = date.getMonth()
 const firstDayOfCurrentMonth = new Date(year, month, 1)

 const lastMonthEnd = new Date(firstDayOfCurrentMonth-1)
 const firstDayOfLastMonth = new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth(), 1)
 const lastDayOfLastMonth = new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth()+1, 1)
 return {
        start: firstDayOfLastMonth,
        end: lastDayOfLastMonth
 }
}