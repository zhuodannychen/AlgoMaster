import React, { useState }from "react";
import Navbar from "../Navbar";
import "../../App.css"

function Comment({user, comment}) {
  return (
    <div class="card mt-2 mb-2">
      <h5 class="card-header"> {user} </h5>
      <div class="card-body">
        <p class="card-text"> {comment} </p>
      </div>
    </div>
  )
}
export default function Comments({contestId}){
  const [ comments, setComments ] = useState([
    { user_id: 1, user: "Adrian Shi", comment: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    { user_id: 2, user: "Danny Phan", comment: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites"},
  ])

  return (
    <React.Fragment>
      <Navbar />
      <h2 className="mt-5 mb-5" style={{textAlign: 'center'}}> Comments </h2>
      <div className="container">
        <form>
          <span> Christian McClintock </span>
          <div class="form-group mt-3">
            <textarea class="form-control" rows="3"></textarea>
          </div>
          <button className="btn btn-success w-100 mt-3"> Add Comment </button>
        </form>
        <div className="comments">
          { comments.map(comment => <Comment user={comment.user} comment={comment.comment} /> )}
        </div>
      </div>
    </React.Fragment>
  )
}