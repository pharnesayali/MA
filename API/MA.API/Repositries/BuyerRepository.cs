//using MA.API.Data;
//using MA.API.Models;
//using System.Data;

//namespace MA.API.Repositries
//{
//    public class BuyerRepository
//    {
//        private DBContext _DBContext;
//        private YIPL_MAContext _yIPL_MAContext;
//        public BuyerRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
//        {
//            _DBContext = DBContextS;
//            var context = default(YIPL_MAContext);
//            _yIPL_MAContext = yIPL_MAContext;
//        }
//        public List<Grn> List(String BuyerID)
//        {
//           var a= _yIPL_MAContext.Grns.ToArray();
//            return _DBContext.RetrieveEntities<Grn>(@"select * from [dbo].[GRN]", CommandType.Text, null);
//        }

//        public List<Grn> Add(List<Grn>  BuyerID)
//        {   
//            foreach(buy)
//            var a = _yIPL_MAContext.Grns.
            
//        }
//    }
//}
