

 // phone number validation
 const [phoneError, setPhoneError] = useState("");
 const validatePhoneNumber = (phoneNumber) => {
   if (!phoneNumber) {
     setPhoneError("Phone number is required");
     return false;
     
   }
   if (!/^\d{10}$/.test(phoneNumber)) {
     setPhoneError("Invalid phone number");
     return false;
   }
   setPhoneError("");
   return true;
 };