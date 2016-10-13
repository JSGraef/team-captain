import React from 'react';

const ListWorkoutsFilter = ({tags, selected, filterHandler}) => {
    if(tags === undefined)
        return <p>No tags yet!</p>

    return ( 
        <div>
            <h4>What type of workout are you looking for?</h4>
    
                { tags.map((key) => {
                    var classname = (key === selected) ? "mdl-button mdl-js-button mdl-button--accent" : "mdl-button mdl-js-button";
                    return (
                        <span key={key} className="tagbuttons"><button className={classname} onClick={ () => filterHandler(key) }>{key}</button></span>
                    );
                })}
        
        </div>
    )
}

export default ListWorkoutsFilter;



