import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Edit = () => {

    // state for inputs
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const {id} = useParams(); // matches w/ :id in Route

    const navigate = useNavigate();

    // database error array
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/" + id)
            .then( res => {
                console.log("✅ Retrieved Data from Database", res.data);
                setName(res.data.pet.name);
                setType(res.data.pet.type);
                setDescription(res.data.pet.description);
                setSkillOne(res.data.pet.skillOne);
                setSkillTwo(res.data.pet.skillTwo);
                setSkillThree(res.data.pet.skillThree);
            })
            .catch( err => {
            console.log("❌❌❌❌❌", err);
            })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const newPet = {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree
        }
        // take the new obj and send it to server + database
        // link is the same post route in routes
        axios.put("http://localhost:8000/api/pets/" + id, newPet)
            .then(res => {
                console.log("✅ Client Success", res.data)
                navigate("/pets"); // redirects to Main after successful submission
            })
            // .catch(err => console.log("❌ Client Error", err))
            .catch(err => {
                console.log("❌ Client Error", err)
                const errorResponse = err.response.data.errors; // retrieve errors
                const errorArr = []; // temp array for error messages
                for (const key of Object.keys(errorResponse)) { // loop and get errors
                    errorArr.push(errorResponse[key].message)
                }
                // set errors to temp array
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <h2>Edit {name}</h2>
            <Link to="/pets">back to home</Link>
            <fieldset>
                <div style={{color: "red"}}>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                </div>
                <form onSubmit={submitHandler} style={{display: "flex"}}>
                        <div style={{marginRight: "50px"}}>
                            Pet Name: <input onChange = {e => setName(e.target.value)} value={name}/><br/><br/>
                            Pet Type: <input onChange = {e => setType(e.target.value)} value={type}/><br/><br/>
                            Pet Description: <input onChange = {e => setDescription(e.target.value)} value={description}/><br/><br/>
                        </div>
                        <div>
                            <p>Skills (optional)</p>
                            Skill 1: <input onChange = {e => setSkillOne(e.target.value)} value={skillOne}/><br/><br/>
                            Skill 2: <input onChange = {e => setSkillTwo(e.target.value)} value={skillTwo}/><br/><br/>
                            Skill 3: <input onChange = {e => setSkillThree(e.target.value)} value={skillThree}/><br/><br/>
                            <button style={{backgroundColor: "blue", color: "white"}}>Edit Pet</button>
                        </div>
                    </form>
            </fieldset>
        </div>
    )
}

export default Edit;