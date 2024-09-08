import React from 'react';
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'
import { statesArray } from "../../data/states"
import { departmentArray } from "../../data/department"
import { useDispatch } from 'react-redux'
import { addEmployee } from "../../redux/employee"
import './createForm.css';



export default function CreateForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState()
    const [startDate, setStartDate] = useState("")
	const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [selectedState, setSelectedState] = useState(statesArray[0])
    const [zipCode, setZipCode] = useState()
	const [selectedDepartment, setSelectedDepartment] = useState(departmentArray[0])


    const dispatch = useDispatch()


    const selectDateBirthHandler = (event) => {
        setDateOfBirth(event)            
    }



    const selectDateStartHandler = (event) => {
        setStartDate(event)
    }


    const handleSubmit = (event) => {
        event.preventDefault() // prevent default of formulaire        

        let currentDateOfBirth = ""
        let currentStartDate = ""

        let options = {year: 'numeric', month: '2-digit', day: '2-digit'  }

        if (dateOfBirth) {
            currentDateOfBirth = dateOfBirth.toLocaleDateString("en-US", options)        
        }

        if (startDate) {
            currentStartDate = startDate.toLocaleDateString("en-US", options)        
        }
       
        let currentEmployee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: currentDateOfBirth,
            startDate: currentStartDate,
            street: street,
            city: city,
            state: selectedState.name,
            stateAbbrev: selectedState.abbreviation,
            zipCode: zipCode,
            department: selectedDepartment.value
        }

		dispatch(addEmployee(currentEmployee))

		console.log("employee :",currentEmployee)
		
		setFirstName("")
		setStartDate("");
		setDateOfBirth("")
		setSelectedDepartment("");
		setSelectedDepartment("")
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
                                pattern="[A-zÀ-ú-']{2,}"
                                title="At least 2 alphabetic characters"
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
								required={true}
                                pattern="[A-zÀ-ú-']{2,}"
                                title="At least 2 alphabetic characters"
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
                                onChange={selectDateBirthHandler} 
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
                                onChange={selectDateStartHandler} 
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
            </div> 

            <div className='btnContainer'>
                <button id="submit"  type="submit">Save</button>
            </div>      
        </form>
    </div>
   )
}
