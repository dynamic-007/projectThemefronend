import React, { useState } from 'react';
import Modal from 'react-modal';
import "./itemModal.css"
// CSS styles for the modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
  },
};

Modal.setAppElement('#root'); // Set the root element as the app element for accessibility

const AddItemModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData,setForm]=useState({
    State:'',
    District:'',
    Quantity:0,
    Item_details:{
        Item_code:0,
        Item:'',
    },
    Department_contact_details:{
        Dept_name:'',
        Dept_addr:'',
        Contact_person:'',
        Contact_no:null,
        Contact_email:''
    },
    Item_description:{
        Item_desc:'',
        Location:'',
        Source:'',
        Last_updation:''
    }
})

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send the registration data to your server, for example.
    //add current date in Last_updation
    let objdetails={...formData};
    const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
    objdetails.Last_updation=formattedDate;
    console.log(objdetails);
    fetch("http://localhost:4000/api/v1/registerItem", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({...objdetails}),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
          if (data.status === "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });

    closeModal();
  };

  return (
    <div>
      <button onClick={openModal} className="open-modal-button">
        Open Registration Form
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Modal"
        style={modalStyles}
      >
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Add your registration form fields here */}
          {/* Example: */}
          <div className="form-group">
            <label htmlFor="State">State:</label>
            <input type="text" id="State" name="State" className="form-input" required onChange={(e)=>setForm({...formData,State:e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="district">District:</label>
            <input type="text" id="district" name="district" className="form-input" required onChange={(e)=>setForm({...formData,District:e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input type="text" id="quantity" name="quantity" className="form-input" required onChange={(e)=>setForm({...formData,Quantity:parseInt(e.target.value)})}/>
          </div>
          <label >Item_details :</label>
          <div className="form-group">
            <label htmlFor="ic">Item_code:</label>
            <input type="number" id="ic" name="ic" className="form-input" required onChange={(e)=>setForm({...formData,Item_details:{...formData.Item_details,Item_code:e.target.value}})}/>
          </div>
          <div className="form-group">
            <label htmlFor="item">Item:</label>
            <input type="text" id="item" name="item" className="form-input" required onChange={(e)=>setForm({...formData,Item_details:{...formData.Item_details,Item:e.target.value}})}/>
          </div>
          <label >Department_contact_details :</label>
          <div className="form-group">
            <label htmlFor="dname">Dept_name:</label>
            <input type="text" id="dname" name="dname" className="form-input" required onChange={(e)=>setForm({...formData,Department_contact_details:{...formData.Department_contact_details,Dept_name:e.target.value}})} />
          </div>
          <div className="form-group">
            <label htmlFor="da">Dept_addr :</label>
            <input type="text" id="da" name="da" className="form-input" required onChange={(e)=>setForm({...formData,Department_contact_details:{...formData.Department_contact_details,Dept_addr:e.target.value}})} />
          </div>
          <div className="form-group">
            <label htmlFor="cp">Contact_person :</label>
            <input type="text" id="cp" name="cp" className="form-input" required onChange={(e)=>setForm({...formData,Department_contact_details:{...formData.Department_contact_details,Contact_person:e.target.value}})}/>
          </div>
          <div className="form-group">
            <label htmlFor="cno">Contact_no:</label>
            <input type="number" id="cno" name="cno" className="form-input" required onChange={(e)=>setForm({...formData,Department_contact_details:{...formData.Department_contact_details,Contact_no:e.target.value}})} />
          </div>
          <div className="form-group">
            <label htmlFor="cemail">Contact_email :</label>
            <input type="email" id="cemail" name="cemail" className="form-input" required onChange={(e)=>setForm({...formData,Department_contact_details:{...formData.Department_contact_details,Contact_email:e.target.value}})} />
          </div>
          <label >Item_description :</label>
          <div className="form-group">
            <label htmlFor="Item_desc">Item_desc:</label>
            <input type="text" id="Item_desc" name="Item_desc" className="form-input" required onChange={(e)=>setForm({...formData,Item_description:{...formData.Item_description,Item_desc:e.target.value}})} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" className="form-input" required onChange={(e)=>setForm({...formData,Item_description:{...formData.Item_description,Location:e.target.value}})}/>
          </div>
          <div className="form-group">
            <label htmlFor="Source">Source:</label>
            <input type="text" id="Source" name="Source" className="form-input" required onChange={(e)=>setForm({...formData,Item_description:{...formData.Item_description,Source:e.target.value}})} />
          </div>
         
          {/* Add more form fields as needed */}
          <div className="form-group">
            <button type="submit" className="submit-button">Register</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddItemModal;
