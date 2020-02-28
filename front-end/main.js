const renderImage = () => {
    const BOARD_URL = 'http://localhost:3000/boards/4'
    const imgContainer = document.querySelector('#img-container')

   return fetch(BOARD_URL).then(response => response.json()).then(boardData => {
       console.log(boardDatas)
   })
}

document.addEventListener('DOMContentLoaded', () => {
    // renderImage()
})