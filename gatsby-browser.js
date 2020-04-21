// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

export const fetchItems = () => {
  return dispatch => {
    dispatch({type: 'FETCHING_ITEMS'}); // Will throw error

    setTimeout(() => { dispatch({type: 'FETCHING_ITEMS'}); }, 1); // Works flawlessly

    // Rest of function code here that works flawlessly
  }
}