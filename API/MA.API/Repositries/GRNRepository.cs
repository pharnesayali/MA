using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class GRNRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public GRNRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public JObject List(JObject data)
        {
            var pagingCriteria = new PagingCriteria();
            if (data["PageCriteria"] != null)
            {
                pagingCriteria = JsonConvert.DeserializeObject<PagingCriteria>(Convert.ToString(data["PageCriteria"]));
            }

            if (pagingCriteria == null)
            {
                pagingCriteria = new PagingCriteria();
                pagingCriteria.PageSize = 10;
                pagingCriteria.PageNumberToFetch = 1;
            }
            var list = new JArray();
            // select grn.* ,Invoice.InvoiceNumber as Reference  from grn left join Invoice on grn.ItemCode = Invoice.ItemCode;
            //var userList = _DBContext.RetrieveEntities<GRNDTO>(@"select Invoice.InvoiceNumber as Reference ,StorageLocation=1000 ,  MovementType='GR from blocked stck' , Vendor=2100059 , Material=7172555640,PurchaseOrder=2182103760 ,grn.Id,grn.PlantCode,grn.ItemCode,grn.MovementTypeId,grn.EntryDate,grn.MaterialDocument,grn.PostingDate,grn.InvoiceNumber,grn.SupplierCode,grn.Quantity,grn.AmountInLc,grn.Ponumber,grn.Grnnumber,grn.CreatedOn,grn.LastModifiedOn  from grn left join Invoice on grn.ItemCode = Invoice.ItemCode ;", CommandType.Text, null);
            var grns = _DBContext.RetrieveEntities<v_GRN>(@"select * from dbo.v_GRN", CommandType.Text, null);

            if (grns == null)
            {
                return null;
            }

            if (!String.IsNullOrEmpty(Convert.ToString(data["PlantCode"])))
            {
                grns = grns.Where(x => x.PlantCode == Convert.ToString(data["PlantCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(data["SupplierCode"])))
            {
                grns = grns.Where(x => x.SupplierCode == Convert.ToString(data["SupplierCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(data["ItemCode"])))
            {
                grns = grns.Where(x => x.ItemCode == Convert.ToString(data["ItemCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(data["FromDate"])))
            {
                grns = grns.Where(x => x.Entry_Date.Date >= Convert.ToDateTime(data["FromDate"]).Date).ToList();
                if (!String.IsNullOrEmpty(Convert.ToString(data["ToDate"])))
                {
                    grns = grns.Where(x => x.Entry_Date.Date <= Convert.ToDateTime(data["ToDate"]).Date).ToList();
                }
            }
            else
            {

                grns = grns.Where(x => x.Entry_Date == DateTime.Today).ToList();

            }
            var Count = grns.Count;
            grns = grns.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();

            var resultdata = new JObject();

            resultdata.Add("GRNCount", Count);
            resultdata.Add("GRNList", JArray.FromObject(grns));
            return resultdata;
        }
    }
}





