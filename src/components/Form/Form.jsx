import React from 'react';
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'
import { statesArray } from "../../data/statesList"
import { departmentArray } from "../../data/departmentsList"
import { useDispatch } from 'react-redux'
import { addEmployee } from "../../redux/employee"
import Modal from 'react-modal';
import './Form.css';



export default function CreateForm() {
	// useState for each field
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [startDate, setStartDate] = useState("")
	const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [selectedState, setSelectedState] = useState(statesArray[0])
    const [zipCode, setZipCode] = useState("")
	const [selectedDepartment, setSelectedDepartment] = useState(departmentArray[0])
	const [modalVisibile, setModalVisibile] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch()

	const modalStyles = {
		content: {
		  top: '50%',
		  left: '50%',
		  right: 'auto',
		  bottom: 'auto',
		  marginRight: '-50%',
		  transform: 'translate(-50%, -50%)',
		  backgroundColor: "rgb(187 245 193)",
		  borderRadius: 10,
		  padding: 50,
		  height: "fit-content",
		  "width": "fit-content"
		},
	  };

	const closeModal = () => {
		setModalVisibile(false);
	}


	// check if date is valid or no, and if it is older than 18
	// empty is also invalid (because of required?)
	const checkBirthdate = (date) => {
		const birthdate = new Date(date);
	
		const today = new Date(); // today
		today.setFullYear(today.getFullYear() - 18); // today but -18 years
	
		if (birthdate > today || isNaN(birthdate) || (date.toString().length !== 10))
			return false;
			return true;
	};

	// check if name is valid (at least two characters)
	const isValidName = (name) => {
        const regex = /^([a-zA-ZÀ-ÿ-]{2,20})*$/;
        return regex.test(name);
    };




    const handleSubmit = (event) => {
        event.preventDefault() // prevent default of formulaire        

        let currentDateOfBirth = ""
        let currentStartDate = ""

		// options to convert date to string
        let options = {year: 'numeric', month: '2-digit', day: '2-digit'  }

        if (dateOfBirth) {
            currentDateOfBirth = dateOfBirth.toLocaleDateString("en-US", options)        
        }
        if (startDate) {
            currentStartDate = startDate.toLocaleDateString("en-US", options)        
        }
    
		
        if (!checkBirthdate(currentDateOfBirth)) {
            setErrorMessage("Invalid birthdate (required filed): invalid birthdate");
            return;
        } else {
            setErrorMessage("");
        }

		if (!isValidName(firstName) || !isValidName(lastName)) {
            setErrorMessage("Invalid first or last name (required fields): too short");
            return;
        } else {
            setErrorMessage("");
        }

		// data of employee to be added to the list
        let currentEmployee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: currentDateOfBirth,
            startDate: currentStartDate,
            street: street,
            city: city,
            state: selectedState.value,
            stateAbbrev: selectedState.abbreviation,
            zipCode: zipCode,
            department: selectedDepartment.value
        }


        console.log(currentEmployee)
        console.log(departmentArray[0].value)
		dispatch(addEmployee(currentEmployee))

		setModalVisibile(true);
		setStartDate("");
		setDateOfBirth("")
		setSelectedDepartment("");
		setSelectedState("");
		event.target.reset();
    }



  return (
    <div>
        <form onSubmit={handleSubmit} id="createForm" >

           <div className='createForm'>

                <div className='informationsContainer'>
                    <div className='informationsContainer__firstName'>
                        <label htmlFor="firstName">First name</label>
                        <p>
                            <input className='input'
                                autoComplete="off"
                                id="firstName"
                                name="firstName"
                                aria-label="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="first name" 
                                type="text" 
                                required={true}
                            />
                        </p>                    
                    </div>
                    <div className='informationsContainer__lastName'>
                        <label htmlFor="lastName">Last name</label>
                        <p>
                            <input autoComplete="off"
                                id="lastName"
                                name="lastName"
                                aria-label="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="last name" 
                                type="text"
								// required={true}
                            />
                        </p>                    
                    </div>
                    <div className='informationsContainer__firstName'>
                        <label htmlFor="dateBirth">Date of Birth</label>                
                        <div>
                            <DatePicker
                                dateFormat="MM/dd/yyyy"
								initial
                                placeholderText="mm/dd/yyyy"
                                selected={dateOfBirth} 
                                onChange={(e) => setDateOfBirth(e)} 
                            />
                        </div>                 
                    </div>
                    <div className='informationsContainer__lastName'>
                        <label htmlFor="startDate">Start Date</label>
                        <div>
                            <DatePicker
                                dateFormat="MM/dd/yyyy"
                                placeholderText="mm/dd/yyyy"
                                selected={startDate} 
                                onChange={(e) => setStartDate(e)} 
                            />
                        </div>                                      
                    </div>

					<div className='informationsContainer__select'>
                        <label htmlFor="department">Department</label>
                        <Select 
                            value={selectedDepartment}
                            defaultValue={selectedDepartment}
                            onChange={setSelectedDepartment}
                            options={departmentArray}
                            id="department"
                            name="department"
                            aria-label="department"
                            className='select'
                        />                     
                    </div>                   
				</div>
      

				<fieldset className='adressContainer'>
                    <legend>Address</legend>
                    <div className='informationsContainer__firstName'>
                        <label htmlFor="street">Street</label>
                            <p>
                                <input autoComplete="off"
                                    id="street"
                                    name="street"
                                    aria-label="street"
                                    onChange={(e) => setStreet(e.target.value)}
                                    placeholder="street" 
                                    type="text" 
                                />
                            </p>                    
                    </div>
                        <div className='informationsContainer__lastName'>
                        <label htmlFor="city">City</label>
                            <p>
                                <input autoComplete="off"
                                    id="city"
                                    name="city"
                                    aria-label="street"
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="city" 
                                    type="text" 
                                />
                            </p>                    
                        </div>
                        <div className='informationsContainer__select'>
                            <label htmlFor="states">State</label>
                            <Select 
                                value={selectedState}
                                defaultValue={selectedState}
                                onChange={setSelectedState}
                                options={statesArray}
                                id="states"
                                name="states"
                                aria-label="state"
                                className='select'
                            />                 
                        </div>
                        <div className='informationsContainer__lastName'>
                        <label htmlFor="zipCode">Zip Code</label>
                        <p>
                            <input autoComplete="off"
                            type="number"
                            id="zipCode"
                            name="ZipCode"
                            aria-label="street"
                            placeholder="zip code"
                            onChange={(e) => setZipCode(e.target.value)}
                            />
                        </p>                    
                    </div>
                </fieldset>       
				{errorMessage && <p className="error-message">{errorMessage}</p>}

            </div> 
            <div className='btnContainer'>
                <button id="submit"  type="submit">Save</button>
            </div>      


		<Modal
        isOpen={modalVisibile}
        style={modalStyles}
		ariaHideApp={false}>
        <div>New employee added</div>
        <button onClick={closeModal}>close</button>
      </Modal>



        </form>
    </div>
   )
}
