import axios from "axios";

//  API to check if user is a super admin
const checkSuperAdminRole = async (uid) => {
  return await axios.get(`/api/superAdmin/check-role`, {
    headers: { Authorization: `Bearer ${uid}` }, //Use the firebase UID or JWT token
  });
};

export default checkSuperAdminRole;
