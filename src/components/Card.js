// import React from "react";
import React, { useState, useEffect } from "react";
import "../App.css";
import star1 from "../images/blank star.png";
import star2 from "../images/yellow star.png";


export default function Card(props) {
    const { item, toggleFavourite } = props;
    const starIcon = item.isFavourite ? star2 : star1;

  const handleToggleFavourite = () => {
    console.log('Before toggle - isFavourite:', item.isFavourite);
    toggleFavourite(item.id);
    console.log('After toggle - isFavourite:', item.isFavourite);
  };
    return (
        <main>
            <article className="card">
                <img src ={props.item.img} className="card--image" />
                <div className="card--info">
                
                    <img 
                        src={starIcon} 
                        className="card--favourite"
                        // onClick={() => props.handleClick(props.item.id)}
                        // onClick={handleToggleFavourite}
                        onClick={() => toggleFavourite(item.id)}
                        // onClick={() => handleToggleFavourite(item.id)}
                        // onClick={() => props.handleClick(toggleFavourite)}
                        // onClick = {props.handleClick(id)}
                        // onToggleFavourite={handleToggleFavourite}
                    />
                    <h2 className="card--title">
                        {props.item.title} 
                    </h2>
                    <p className="card--contact">Chapter {props.item.chapter}</p>
                    <a className="card--contact" href ={props.item.link}>Link</a>
                </div>
                
            </article>
        </main>
    )
}
