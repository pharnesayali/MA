using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class UserRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public UserRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }
        public CommonUser GetCommonUser(JObject data)
        {
            //return _yIPL_MAContext.CommonUser.Where(x=>x.EmployeeCode== Convert.ToString(data["EmployeeCode"])).FirstOrDefault();
            var user2 = _DBContext.RetrieveEntities<CommonUser>(@"select Title As EmployeeCode,FirstName ,LastName,Department,WorkMail As Email,Location from CommonDB.dbo.UserDetails cdb Where Title = '" + data["EmployeeCode"].ToString() + "'", CommandType.Text, null);
            if(user2 != null)
            {
                return user2.FirstOrDefault();
            }

            return null;


        }
        public List<CommonUser> Get(JObject data)
        {
            var obj = (dynamic)null;          
            var user1 = new List<CommonUser>();
             user1 = _DBContext.RetrieveEntities<CommonUser>(@"select Title As EmployeeCode,FirstName ,LastName,Department,WorkMail As Email,Location from CommonDB.dbo.UserDetails cdb Where Title = '" + data["EmployeeCode"].ToString() + "'", CommandType.Text, null).ToList();
            if (user1 != null)
            {
                return user1;
            }
            else
            {
                return null;
            }
            
                 
        }

        public List<UserRole> List()
        {
             return _yIPL_MAContext.UserRoles.ToList();
        }

        public List<UserRole> RoleCodeList(JObject data)
        {
            return _yIPL_MAContext.UserRoles.Where(x=>x.RoleCode== Convert.ToString(data["RoleCode"]) && x.IsActive==true).ToList();
        }
        public UserRole Getuser(JObject data)
        {
            return _yIPL_MAContext.UserRoles.Where(x => x.EmployeeCode == Convert.ToString(data["EmployeeCode"]) && x.Id==Convert.ToInt32(data["Id"])).FirstOrDefault();

        }

        public bool Update(UserRole user)
        {
            var query = "update UserRole set RoleCode=" + "'" + user.RoleCode + "'" + " where EmployeeCode =" + "'" + user.EmployeeCode + "'";
            int temp = _DBContext.UpdateWithRecordsAffected(query, CommandType.Text, null);
            if (temp > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
           
        }

        public bool UpdateUser(UserRole user)
        {
        
            var query = "update UserRole set IsActive =" + "'"+user.IsActive+"'" + " where EmployeeCode = " + "'" + user.EmployeeCode + "'";
            int temp = _DBContext.UpdateWithRecordsAffected(query, CommandType.Text, null);
            
            if (temp > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Add(UserRole user)
        {
            var dd=this._yIPL_MAContext.UserRoles.Add(user);
            var i = this._yIPL_MAContext.SaveChanges();
            if (i == 1)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        public UserRole GetUser(JObject data)
        {
            return _yIPL_MAContext.UserRoles.Where(x => x.EmployeeCode == Convert.ToString(data["EmployeeCode"]) && x.IsActive==true).FirstOrDefault();

        }

        public JObject Login(String employeeCode)
        {
            var querry = @"select * from UserRole where EmployeeCode = '" + employeeCode + "'";
            var result = _DBContext.RetrieveEntities<UserRole>(querry, CommandType.Text, null);
            if (result == null)
            {
                return null;
            }

            if (result.Count == 0)
            {
                return null;
            }
            var resposne = new JObject();
            resposne.Add("Result",JObject.FromObject(result.FirstOrDefault()));
            return resposne;

        }
    }
}
