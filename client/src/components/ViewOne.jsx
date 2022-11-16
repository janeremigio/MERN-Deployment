import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const ViewOne = (props) => {

    const navigate = useNavigate();

    const {id} = useParams(); // matches w/ :id in Route

    const [thisPet, setThisPet] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/" + id)
            .then( res => {
                console.log("✅ Retrieved Data from Database", res.data);
                setThisPet(res.data);
            })
            .catch( err => {
                console.log("❌❌❌❌❌", err);
            })
    }, [id]);

    // adopt pet / delete from database
    const adoptPet = (petMongoId) => {
            axios.delete("http://localhost:8000/api/pets/" + petMongoId)
            .then( res => {
                console.log("✅ Pet has been adopted!", res.data)
                // removes pet from database, then navigates to Main
                navigate("/pets");
            })
            .catch( err => console.log("❌❌❌❌❌", err))
    }

    return (
        <div>
            <Link to="/pets">back to home</Link>
            {
                thisPet ? (
                    <fieldset>
                        <h3>Details about: {thisPet.pet.name}</h3>
                        <button onClick={() => adoptPet(thisPet.pet._id)} style={{backgroundColor: "red", color: "white"}}>Adopt {thisPet.pet.name}</button><br/><br/>
                        Type: {thisPet.pet.type} <br/><br/>
                        Description:<br/>
                        {thisPet.pet.description} <br/><br/>
                        {
                            thisPet.pet.skillOne ? ("Skills: " + thisPet.pet.skillOne) : ""
                        }<br/>
                        {
                            thisPet.pet.skillTwo ? thisPet.pet.skillTwo : ""
                        }<br/>
                        {
                            thisPet.pet.skillThree ? thisPet.pet.skillThree : ""
                        }
                    </fieldset>
                ) : (
                    <p>Retrieving Data...</p>
                )
            }
        </div>
    )
}

export default ViewOne;