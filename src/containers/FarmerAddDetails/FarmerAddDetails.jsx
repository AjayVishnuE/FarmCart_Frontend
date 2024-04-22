import React from 'react'
import { FarmerHeader, FarmerNavbar } from '../../components'
import { Form } from 'react-router-dom'
import './FarmerAddDetails.css'

function FarmerAddDetails() {
  return (
    <div className='adddetailsoverallcontainer'>
        <FarmerHeader/>
        <form>
            <div className='addproductInfoItem'>
                <label className='addlabel'>Enter FarmName</label>
                <input className='addvalue' type='text' placeholder='ABC Farms'/>
            </div>
            <button className='addproductbtn' type="submit">
                Add Farm
            </button>
        </form>
        <FarmerNavbar/>
    </div>
  )
}

export default FarmerAddDetails
