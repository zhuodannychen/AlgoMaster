import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons" 
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "../../App.css"


function ContestPage(props){
  const [userId, setUserId] = useState(0);
  const [comment, setComment] = useState("");
  const [problems, setProblems] = useState([]);
  const [comments, setComments] = useState([]);
  const {contestid} = useParams();

  useEffect(() => {
    Axios.get('http://localhost:3001/contestdetails/'+contestid)
    .then(response => {
        setProblems(response.data[1])
    })
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/comments/'+contestid)
    .then(response => {
        console.log("Comments: ", response.data)
        setComments(response.data)
    })
  }, []);

  const updateComments = () => {
    Axios.get('http://localhost:3001/comments/'+contestid)
    .then(response => {
        console.log("Comments: ", response.data)
        setComments(response.data)
        setComment("")
    })
  }

  const addContest = async () => {
    const username = JSON.parse(localStorage.getItem("username"))
    Axios.get('http://localhost:3001/user/'+username)
    .then(response => {
      setUserId(response.data['user_id'])
      console.log("User id = ", userId)
    })
    Axios.post("http://localhost:3001/comments", {
    user_id: userId,
    contest_id: contestid,
    comment_desc: comment 
    }).then((response) => {
      if (response.data[0]) {
        console.log('Comment added!')
        updateComments()
      }
    })
  }

  const cardStyle = {
    marginBottom: "25px"
  }

  const listWithoutButtonStyle = {
    listStyleType: "none"
  }

  const iconSpacingStyle = {
    marginRight: "10px"
  }

  const paragraphMarginStyle = {
    margin: "10px 0px 10px 0px"
  }

  return (
    <div class="container">
        <h1>Contest Page for {contestid}</h1>
        {problems.map((problem, idx) => <li key={idx}>{problem['problem_name']} {problem['problem_desc']} {problem['problem_url']}</li>)}
        <p>Comments</p>
        {comments.map((comment, idx) => 
          <li key={idx} style={listWithoutButtonStyle}>
            <div class="card m-2" style={cardStyle}>
              <div class="card-body">
                <FontAwesomeIcon icon={faUser} style={iconSpacingStyle}/>
                <span class="card-title">{comment['username']}</span>
                <p class="card-subtitle text-muted" style={paragraphMarginStyle}>{comment['comment_desc']}</p>
              </div>
            </div>
            
          </li>
        )}
        <div class="mb-3">
          <label for="Comment" class="form-label">Comment</label>
          <textarea class="form-control" id="Comment" rows="3" value={comment} onChange={e => {setComment(e.target.value)}}></textarea>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary me-md-2" type="button" style={paragraphMarginStyle} onClick={addContest}>Submit</button>
          </div>
        </div>
    </div>
  )

}

export default ContestPage;