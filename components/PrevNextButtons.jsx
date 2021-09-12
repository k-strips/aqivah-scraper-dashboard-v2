const PrevNextButtons = (props) => {
    const buttonPrev =  <button
    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded font-bold mr-5"
    onClick={() => props.prevPage()}
  >
    Prev
  </button>
  const buttonPrevLimit =  <div
  className="py-2 px-4 bg-gray-200 rounded font-bold mr-5 opacity-50 inline-block cursor-not-allowed"
>
  Prev
</div>
  
    const buttonNext =  <button
    className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded font-bold"
    onClick={() => props.nextPage()}
  >
    Next
  </button>
   const buttonNextLimit =  <div
   className="py-2 px-4 bg-gray-200 rounded font-bold mr-5 opacity-50 inline-block cursor-not-allowed"
 >
   Next
 </div>
    
    return (
        <div className="text-center mt-3 mb-10">
            {props.currentPage > 1 ? buttonPrev : buttonPrevLimit }
            {props.currentPage < props.maxPage ? buttonNext : buttonNextLimit }
      </div>
    )
}

export default PrevNextButtons;