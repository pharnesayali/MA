using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class UserService
    {
        public UserRepository _userRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        private DBContext _DBContext;
        public UserService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _userRepository = new UserRepository(DBContext, _yIPL_MAContext);
        }

        public List<CommonUser> Get(JObject data)
        {
            return _userRepository.Get(data);
        }

        public List<UserRole> List()
        {
            return _userRepository.List();
        }


        public List<UserRole> RoleCodeList(JObject data)
        {
            return _userRepository.RoleCodeList(data);
        }

        public JObject Update(JObject data)
        {
            var response = new JObject();
            try
            {
                UserRole user1 = _userRepository.Getuser(data);
                if (user1 != null)
                {
                    user1.RoleCode = Convert.ToString(data["RoleCode"]);
                    var res = _userRepository.Update(user1);
                    // response.Add("IsUpdated", res);
                    if (res == true)
                    {
                        response.Add("Message", "Updated Successfully!");
                    }
                    else
                    {
                        response.Add("Message", "Not Updated!");
                    }
                }
                else
                {
                    response.Add("Message", "User doesn't exist!");
                }
                return response;

            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }
    

        public JObject UpdateUser(JObject data)
        {
            var response = new JObject();
            try
            {
                var user = _userRepository.Getuser(data);
                if (user != null)
                {
                    if (user.IsActive == true)
                    {
                        user.IsActive = false;
                        var res = _userRepository.UpdateUser(user);
                        response.Add("DeActivated", res);
                        if (res == true)
                        {
                            response.Add("Message", "User DeActivated Successfully!");
                        }
                        else
                        {
                            response.Add("Message", "User Not DeActivated!");
                        }
                    }
                    else
                    {
                        user.IsActive = true;
                        var res = _userRepository.UpdateUser(user);
                        response.Add("Activated", res);
                        if (res == true)
                        {
                            response.Add("Message", "User Activated Successfully!");
                        }
                        else
                        {
                            response.Add("Message", "User Activated Updated!");
                        }
                    }
                }
                else
                {
                    response.Add("Message", "User doesn't exist!");
                }
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

        public JObject Add(JObject data)
        {
            var response = new JObject();
            try
            {
                    var user = _userRepository.GetCommonUser(data);
                    if (user == null)
                    {
                        response.Add("Message", "User does not Exists!");
                        return response;

                    }
                    if (string.IsNullOrEmpty(Convert.ToString(data["RoleCode"])))
                    {
                        response.Add("Message", "Please Provide RoleCode For User");
                        return response;
                    }
                    if (user != null)
                    {
                        var newUser = new UserRole();
                        newUser.EmployeeCode = user.EmployeeCode;
                
                        newUser.FirstName = user.FirstName;
                        newUser.LastName = user.LastName;
                        newUser.Department = user.Department;
                        newUser.RoleCode = Convert.ToString(data["RoleCode"]);
                        newUser.Email = user.Email;
                        newUser.Location = user.Location;
                        newUser.IsActive = true;
             
                            //var usercheck=this._DBContext.GetScalarValue(@"select count(*) from UserRole where EmployeeCode='"+ Convert.ToString(data["EmployeeCode"]),System.Data.CommandType.Text, null)
                            var usercheck = this._yIPL_MAContext.UserRoles.Where(x => x.EmployeeCode == Convert.ToString(data["EmployeeCode"])).Count();
                            if (usercheck != 0)
                            {
                                response.Add("Message", "User Already Exist!");
                                return response;
                            }
               
               

                        var addUser = _userRepository.Add(newUser);
                        response.Add("AddUser", addUser);
                        if (addUser == true)
                        {
                            response.Add("Message", "User Added Successfully!");
                        }
                        else
                        {
                            response.Add("Message", "User Not Added!");
                        }
                     }
                        else
                        {
                            response.Add("Message", "User doesn't exist!");
                        }

                        return response;
             }
             catch (Exception e)
            {

                response.Add(e.Message);
                return response;
            }
        }

        public UserRole GetUser(JObject data)
        {
            return _userRepository.GetUser(data);
        }

        public JObject Login(String EmployeeCode)
        {
            var obj = new JObject();
            try
            {
                obj.Add("EmployeeCode", EmployeeCode);
                var user = _userRepository.GetCommonUser(obj);
                

                if (user == null)
                {
                    obj.Add("Result", "Employee code does not exists");
                    return obj;
                }
                var result = _userRepository.Login(EmployeeCode);
                if (result != null)
                {
                    if (result.Count > 0)
                    {
                        return result;
                    }
                    else
                    {
                        obj.Add("Result", "Employee code does not exists");
                        return obj;
                    }
                }
                else
                {
                    obj.Add("Result", "Employee code does not exists");
                    return obj;
                }
            }
            catch (Exception e)
            {
                obj.Add("Message", e.Message);
                return obj;
            }
        }
    }
}
