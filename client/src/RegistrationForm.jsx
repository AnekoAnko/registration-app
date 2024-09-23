import './index.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegistrationForm() {
    const { id } = useParams();
    const [data, setData] = useState({
        fullname: '',
        email: '',
        dob: null, 
        source: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleDateChange = (date) => {
        setData(prevData => ({
            ...prevData,
            dob: date
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            dob: ''
        }));
    };

    const validate = () => {
        const newErrors = {};
        
        if (!data.fullname.trim()) {
            newErrors.fullname = "Full name is required";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!data.dob) {
            newErrors.dob = "Date of birth is required";
        } else {
            const today = new Date();
            const dob = new Date(data.dob);
            const age = today.getFullYear() - dob.getFullYear();
            if (age < 18) {
                newErrors.dob = "You must be at least 18 years old";
            }
        }

        if (!data.source) {
            newErrors.source = "Please select a source";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post(`http://localhost:3000/register/${id}`, data);
            navigate('/');
        } catch (error) {
            console.error("Error sending data", error);
        }
    };

    return (
        <div className="formContainer">
            <div className="registrationForm">
                <h3 className='eventRegistration'>Event Registration</h3>
                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={data.fullname}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullname && <span className="error">{errors.fullname}</span>}

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <label>Date of Birth</label>
                    <DatePicker
                        selected={data.dob}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        required
                    />
                    {errors.dob && <span className="error">{errors.dob}</span>}

                    <label>Where did you hear about this event?</label>
                    <div className='source'>
                        <div>
                            <input
                                type="radio"
                                name="source"
                                value="socialMedia"
                                onChange={handleChange}
                            />
                            <label>Social Media</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="source"
                                value="friends"
                                onChange={handleChange}
                            />
                            <label>Friends</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="source"
                                value="foundMyself"
                                onChange={handleChange}
                            />
                            <label>Found Myself</label>
                        </div>
                    </div>
                    {errors.source && <span className="error">{errors.source}</span>}

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;
