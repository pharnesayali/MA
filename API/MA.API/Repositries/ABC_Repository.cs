using MA.API.Data;
using MA.API.Models;
using System.Data;

namespace MA.API.Repositries
{
    public class ABC_Repository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public ABC_Repository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public DataSet Get()
        {
           
            return _DBContext.GetDataSet("Create_ABC_view", CommandType.StoredProcedure,null);
        }

    }
}
