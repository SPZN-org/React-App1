import React from "react"
import Card from "./Card.js"
import "../App.css"

export default function SortBySection({ data, toggleFavourite }) {
    const sortedData = data.slice().sort((a, b) => 
    a.title.localeCompare(b.title))

    const cardsBySection = {}
    sortedData.forEach((item) => {
    const firstLetter = item.title[0].toUpperCase()
    if (!cardsBySection[firstLetter]) {
        cardsBySection[firstLetter] = []
    }
    cardsBySection[firstLetter].push(
    <Card 
        key={item.id} 
        item={item}
        toggleFavourite={toggleFavourite}
        
    />)
    })

    return (
        <main className="main--body">
            {Object.keys(cardsBySection).map((section) => (
            <div 
                    className="section--box" 
                    key={section}
            >
                <h2 className="section--heading">{section}</h2>
                {cardsBySection[section]}
            </div>
        ))}
      </main>
    )
}

