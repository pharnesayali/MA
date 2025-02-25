using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class BuyerpermissionRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public BuyerpermissionRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }
        public List<UserRole> List()
        {
            var result = _yIPL_MAContext.UserRoles.Where(x => x.RoleCode == "Buyer" && x.IsActive == true);
            if (result != null)
            {
                return result.ToList();
                
            }
           
            return null;
            
        }
    }
}
