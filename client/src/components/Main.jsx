import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Main = (props) => {

  // create state for this component - all pets
    const [allPets, setAllPets] = useState([]);

    // when component finishes loading, execute useEffect
    useEffect(() => {
    axios.get("http://localhost:8000/api/pets")
        .then( res => {
            // always check what is coming back from the server controller
            console.log(res.data);
            setAllPets(res.data);
        })
        .catch( err => {
            console.log("❌❌❌❌❌", err);
        })
    }, []);

    return (
        <div>
            <Link to="/pets/new">add a pet to the shelter</Link>
            <h4>These pets are looking for a good home</h4>
            <table style={{margin: "auto"}}>
                <tr style={{backgroundColor: "gray"}}>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                {
                allPets.sort((petA,petB) => (petA.type > petB.type) ? 1 : ((petB.type > petA.type) ? -1 : 0)).map((eachPet, index) => {
                    return (
                        <tr key={eachPet._id} style={{backgroundColor: "lightGray"}}>
                            <td>{eachPet.name}</td>
                            <td>{eachPet.type}</td>
                            <td><Link to={`/pets/${eachPet._id}`}>details</Link> | <Link to={`/pets/${eachPet._id}/edit`}>edit</Link></td>
                        </tr>
                    ) 
                })
                }
            </table>
        </div>
    )
}

export default Main;