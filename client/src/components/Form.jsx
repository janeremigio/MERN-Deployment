import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Form = () => {

    const navigate = useNavigate();

    // state for inputs
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    // database error array
    const [errors, setErrors] = useState([]);

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
        // link is the same post route in routes
        axios.post("http://localhost:8000/api/pets", newPet)
            .then(res => {
                console.log("✅ Client Success", res.data)
                navigate("/pets"); // redirects to Main after successful submission
            })
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
        setName("");
        setType("");
        setDescription("");
        setSkillOne("");
        setSkillTwo("");
        setSkillThree("");
    }

    return (
        <div>
            <Link to="/pets">back to home</Link>
            <h4>Know a pet needing a home?</h4>
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
                        <button style={{backgroundColor: "blue", color: "white"}}>Add Pet</button>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}

export default Form;