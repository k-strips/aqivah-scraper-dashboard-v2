const PrevNextButtons = (props) => {
    const buttonPrev =  <button
    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded font-bold mr-5"
    onClick={() => props.prevPage()}
  >
    Prev
  </button>
  const buttonPrevLimit =  <button
  className="py-2 px-4 bg-gray-200 rounded font-bold mr-5 opacity-50"
>
  Prev
</button>
  
    const buttonNext =  <button
    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded font-bold"
    onClick={() => props.nextPage()}
  >
    Next
  </button>
   const buttonNextLimit =  <button
   className="py-2 px-4 bg-gray-200 rounded font-bold mr-5 opacity-50"
 >
   Next
 </button>
    
    return (
        <div className="text-center mt-3 mb-10">
            {props.currentPage > 1 ? buttonPrev : buttonPrevLimit }
            {props.currentPage < props.maxPage ? buttonNext : buttonNextLimit }
      </div>
    )
}

export default PrevNextButtons;