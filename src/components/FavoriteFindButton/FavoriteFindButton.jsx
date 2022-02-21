import React, { useContext } from 'react';
import "./FavoriteFindButton.css"
// import QuizIcon from '@mui/icons-material/Quiz';
// import handleFoundedSongPlayList from '../../context/handleFoundedSongPlayList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link,useNavigate } from 'react-router-dom';


const FavoriteFindButton = ({songId}) => {

//     const {  changeMessage,setSongUserFavoriteList}= useContext(handleFoundedSongPlayList)
//     const getAllUserSongFavoriteFromServer=async(songId)=>{
//         const ans=await fetch(`http://localhost:3008/songs/favorite/${songId}`,{
//             method:"get",
//             headers: {
//                 'Content-Type': 'application/json',
//                 authorization:`bearer ${JSON.parse(localStorage.accessToken)}` 
//               }})
//               const userList= await ans.json()
//           console.log(userList);
//               if (ans.status===200){
                
//                 return  [[...userList]]
//               } else {
//                 return userList.message
//               }

//     }
// const showAllUserSongFavorite=async(songId)=>{
// const userList=await getAllUserSongFavoriteFromServer(songId)

//  if(userList?.message) {
//     setSongUserFavoriteList([])
//     changeMessage(userList.message)
// }else{
//     setSongUserFavoriteList([...userList])
//  }
// }
// TODO:check why it dont wotk favotirs
const navigate=useNavigate()
  return (<div>
{/* <FavoriteIcon onClick={()=>{showAllUserSongFavorite(songId)}}/> */}
<FavoriteIcon onClick={()=>{
 navigate(`/songfavorites/${songId}`)}}/>

  </div>)
}

export default FavoriteFindButton
