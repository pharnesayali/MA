
using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json.Linq;
using System.Data;

namespace MA.API.Repositries
{

    public class SlowMovingRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public SlowMovingRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public List<Slowmoving> Get()
        {
         
            return  _DBContext.RetrieveEntities<Slowmoving>("[dbo].[calculate_slow_moving]",CommandType.StoredProcedure, null);
        }

    }
}
