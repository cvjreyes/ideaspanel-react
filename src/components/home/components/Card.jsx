/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { ProfileInfo } from "../../general/ProfileInfo";
import { Link } from "wouter";

function IdeaCard({info}) {
    const {description, title, image, name} = info
    console.log(info)
  return (
    <Link to="" css={ideaCard}>
        <img className='image' src={image}/>
        <div className='content'> 
            <h3 className='title'>{title}</h3>
            <p className="text">{description}</p>
           {name && <ProfileInfo profile={info}/>}
        </div>
    </Link>
  )
}

const ideaCard={
    border: "1px solid #C3C3C3",
    borderRadius: "10px",
    backgroundColor: "#F5F5F5",
    overflow:"hidden",
    transition: "ease 0.3s all",
    ":hover":{
        borderColor:"#155AAA"
    },
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
        WebkitBoxOrient: "vertical", 
        overflow: "hidden",
        marginBottom: "1rem"
    },
}

export {IdeaCard}