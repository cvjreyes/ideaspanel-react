/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

function IdeaCard({ id, image, title, description, comment_count, like_count, user_id, anonymous, created_at }) {
  return (
    <article css={ideaCard}>
        <img className='image' src={image}/>
        <div className='content'> 
            <h3 className='title'>Titulo</h3>
            <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam a odio amet quis necessitatibus velit corporis cupiditate itaque nobis, doloremque libero. Cupiditate minus, dicta sapiente at libero dolorum reiciendis vel?</p>
            <div className='footer'>
                
            </div>
        </div>
    </article>
  )
}

const ideaCard={
    border: "1px solid #C3C3C3",
    borderRadius: "10px",
    backgroundColor: "#F5F5F5",
    overflow:"hidden",
    ".image":{
        width: "100%",
    },
    ".content":{
        padding: "1rem",
    },
    ".title":{
        fontSize: "1rem",
        marginBottom: "0.3rem"
    },
    ".text":{
        display: "-webkit-box",
        color: "#7E7E7E",
       " -webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical", 
        overflow: "hidden"
    },
    ".footer":{}
}

export {IdeaCard}