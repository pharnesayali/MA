using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NPOI.POIFS.Crypt.Dsig;
using NPOI.SS.Formula.Functions;
using NPOI.XWPF.UserModel;
using System;
using System.Collections;
using System.Data;
using System.Text;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class MRPRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        //private DBContext _DBContext;
        public MRPRepository(DBContext DBContext, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContext;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public List<JObject> Get(JObject data)
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
            var obj = new JObject();
            List<IDbDataParameter> parameters = new List<IDbDataParameter>();
            parameters.Add(_DBContext.CreateParameter("@smon", Convert.ToInt32(data["StartMonth"]), DbType.Int32));
            parameters.Add(_DBContext.CreateParameter("@syr", Convert.ToInt32(data["StartYear"]), DbType.Int32));
            parameters.Add(_DBContext.CreateParameter("@Revision", Convert.ToString(data["Revision"]), DbType.String));

            if (!string.IsNullOrEmpty(Convert.ToString(data["ItemCode"])))
            {
                parameters.Add(_DBContext.CreateParameter("@ItemCode", Convert.ToString(data["ItemCode"]), DbType.String));

            }
            if (!string.IsNullOrEmpty(Convert.ToString(data["SupplierCode"])))
            {
                parameters.Add(_DBContext.CreateParameter("@SupplierCode", Convert.ToString(data["SupplierCode"]), DbType.String));
            }
            if (!string.IsNullOrEmpty(Convert.ToString(data["BuyerCode"])))
            {
                parameters.Add(_DBContext.CreateParameter("@BuyerCode", Convert.ToString(data["BuyerCode"]), DbType.String));
            }

            var res = _DBContext.GetScalarValue("[dbo].[Create_MRP_view]", CommandType.StoredProcedure, parameters.ToArray());

            var result = _DBContext.GetDataTable(@"" + res, CommandType.Text, null);
            //var FinalArrList = new ArrayList();
            List<JObject> FinalArrList = new List<JObject>();
            for (int i = 0; i < result.Rows.Count; i++)
            {
                NewMRP objNewMRP = new NewMRP();

                ArrayList arrylist = new ArrayList();
                objNewMRP.ItemCode = result.Rows[i]["ItemCode"].ToString();
                objNewMRP.SupplierCode = result.Rows[i]["SupplierCode"].ToString();
                objNewMRP.Description = result.Rows[i]["Description"].ToString();
                objNewMRP.SupplierName = result.Rows[i]["SupplierName"].ToString();
                objNewMRP.Unit = result.Rows[i]["Unit"].ToString();
                objNewMRP.Map = result.Rows[i]["Map"].ToString();
                objNewMRP.BuyerCode = result.Rows[i]["BuyerCode"].ToString();
                objNewMRP.BuyerName = result.Rows[i]["BuyerName"].ToString();
                objNewMRP.Project = result.Rows[i]["Project"].ToString();
                objNewMRP.Customer = result.Rows[i]["Customer"].ToString();
                dynamic data1 = JsonConvert.DeserializeObject<dynamic>(result.Rows[i]["Plants"].ToString());
                string json;
                var obj2 = new JObject();
                Dictionary<string, string> values = new Dictionary<string, string>();
                values.Add("ItemCode", objNewMRP.ItemCode);
                values.Add("SupplierCode", objNewMRP.SupplierCode);
                values.Add("Description", objNewMRP.Description);
                values.Add("SupplierName", objNewMRP.SupplierName);
                values.Add("Unit", objNewMRP.Unit);
                values.Add("Map", objNewMRP.Map);
                values.Add("BuyerCode", objNewMRP.BuyerCode);
                values.Add("BuyerName", objNewMRP.BuyerName);
                values.Add("Project", objNewMRP.Project);
                values.Add("Customer", objNewMRP.Customer);
                foreach (JObject parsedObject in data1.Children<JObject>())
                {



                    string plantcode = "";
                    var arra = new JObject();
                    foreach (JProperty parsedProperty in parsedObject.Properties())
                    {


                        if (parsedProperty.Name == "PlantCode")
                        {
                            plantcode = parsedProperty.Value.ToString();
                        }

                        if (parsedProperty.Name != "PlantCode" && parsedProperty.Name != "Year")
                        {

                            var jcm = new MRP
                            {

                                Key = plantcode + "_" + parsedProperty.Name,
                                Value = (string)parsedProperty.Value,

                            };


                            values.Add(jcm.Key, jcm.Value);

                        }

                    }

                }
                arrylist.Add(values);

                json = JsonConvert.SerializeObject(arrylist, Formatting.Indented);


                obj2 = JsonConvert.DeserializeObject<JArray>(json.ToString()).ToObject<List<JObject>>().FirstOrDefault();


                FinalArrList.Add(obj2);



            }

            return FinalArrList;
        }

        public DataSet list(JObject data)
        {
            if (string.IsNullOrEmpty(Convert.ToString(data["BuyerCode"])))
            {
                return _DBContext.GetDataSet(@"select  MRP_Date as Date, Revision, DATEPART(mm, MRP_Date) as Month,  DATEPART(year, MRP_Date) as year from (select distinct Date as MRP_Date, Revision  from M_MRP)t", CommandType.Text, null);
            }
            else
            {
                // return _DBContext.GetDataSet(@"select distinct Date, Revision ,Month ,year from M_MRP where BuyerCode='" + data["BuyerCode"] + "'", CommandType.Text, null);
                return _DBContext.GetDataSet(@"select  MRP_Date as Date, Revision, DATEPART(mm, MRP_Date) as Month,  DATEPART(year, MRP_Date) as year from (select distinct Date as MRP_Date, Revision  from M_MRP where BuyerCode = '" + data["BuyerCode"] + "')t", CommandType.Text, null);
            }
        }

        public List<JObject> GetAnalysis()
        {

            var result = _DBContext.GetDataTable(@"[dbo].[MRP_Analysis]", CommandType.Text, null);
            List<JObject> FinalArrList = new List<JObject>();
            DataTable distinctDT = SelectDistinct(result, "ItemCode");

            for (int j = 0; j < distinctDT.Rows.Count; j++)
            {
                //Get filter data as per the ItemCode
                DataTable tblFiltered = result.AsEnumerable()
                     .Where(r => r.Field<string>("ItemCode") == distinctDT.Rows[j]["ItemCode"].ToString())
                     .CopyToDataTable();
                // remove unwanted coloumns in sp MRP_analysis
                tblFiltered.Columns.Remove("MRP_1");
                tblFiltered.Columns.Remove("MRP_2");
                tblFiltered.Columns.Remove("MRP_3");

                tblFiltered.Columns.Remove("per2");
                tblFiltered.Columns.Remove("per3");
                JObject objItem = new JObject();
                objItem.Add("ItemCode", distinctDT.Rows[j]["ItemCode"].ToString());
                objItem.Add("SupplierCode", distinctDT.Rows[j]["SupplierCode"].ToString());
                objItem.Add("Description", distinctDT.Rows[j]["Description"].ToString());
                objItem.Add("SupplierName", distinctDT.Rows[j]["SupplierName"].ToString());
                objItem.Add("Unit", distinctDT.Rows[j]["Unit"].ToString());
                objItem.Add("Map", distinctDT.Rows[j]["Map"].ToString());
                objItem.Add("BuyerCode", distinctDT.Rows[j]["BuyerCode"].ToString());
                objItem.Add("BuyerName", distinctDT.Rows[j]["BuyerName"].ToString());
                objItem.Add("Project", distinctDT.Rows[j]["Project"].ToString());
                objItem.Add("Customer", distinctDT.Rows[j]["Customer"].ToString());
                objItem.Add("Trim", distinctDT.Rows[j]["Trim"].ToString());
                objItem.Add("ItemDescription", distinctDT.Rows[j]["ItemDescription"].ToString());
                objItem.Add("MOQ", distinctDT.Rows[j]["MOQ"].ToString());
                objItem.Add("Group", distinctDT.Rows[j]["Group"].ToString());
                objItem.Add("Category", distinctDT.Rows[j]["Category"].ToString());
                objItem.Add("Maker", distinctDT.Rows[j]["Maker"].ToString());
                objItem.Add("MakerPartNo", distinctDT.Rows[j]["MakerPartNo"].ToString());
                objItem.Add("SupplierPartCode", distinctDT.Rows[j]["SupplierPartCode"].ToString());
                objItem.Add("SupplierfortheMonth ", distinctDT.Rows[j]["SupplierfortheMonth"].ToString());
                objItem.Add("Tto7partcode", distinctDT.Rows[j]["Tto7partcode"].ToString());
                objItem.Add("7PartImplementedAgainstTCode", distinctDT.Rows[j]["7PartImplementedAgainstTCode"].ToString());
               
                for (int i = 0; i < tblFiltered.Rows.Count; i++)
                {
                    objItem.Add(tblFiltered.Rows[i]["mon"].ToString() + "_" + tblFiltered.Rows[i]["yr"].ToString() + "_MRP", tblFiltered.Rows[i]["MRP"].ToString());
                    objItem.Add(tblFiltered.Rows[i]["mon"].ToString() + "_" + tblFiltered.Rows[i]["yr"].ToString() + "_PD", (Convert.ToDecimal(tblFiltered.Rows[i]["MRP"]) / 26).ToString());
                    objItem.Add(tblFiltered.Rows[i]["mon"].ToString() + "_" + tblFiltered.Rows[i]["yr"].ToString() + "_N1_MRP", tblFiltered.Rows[i]["N1_MRP"].ToString());
                    objItem.Add(tblFiltered.Rows[i]["mon"].ToString() + "_" + tblFiltered.Rows[i]["yr"].ToString() + "_N2_MRP", tblFiltered.Rows[i]["N2_MRP"].ToString());
                    objItem.Add(tblFiltered.Rows[i]["mon"].ToString() + "_" + tblFiltered.Rows[i]["yr"].ToString() + "_N3_MRP", tblFiltered.Rows[i]["N3_MRP"].ToString());
                    objItem.Add(tblFiltered.Rows[i]["mon"].ToString() + "_" + tblFiltered.Rows[i]["yr"].ToString() + "_P1", tblFiltered.Rows[i]["per1"].ToString());


                }
                FinalArrList.Add(objItem);
            }

            return FinalArrList;

        }
        private bool ColumnEqual(object A, object B)
        {
            // Compares two values to see if they are equal. Also compares DBNULL.Value.             
            if (A == DBNull.Value && B == DBNull.Value) //  both are DBNull.Value  
                return true;
            if (A == DBNull.Value || B == DBNull.Value) //  only one is BNull.Value  
                return false;
            return (A.Equals(B)); // value type standard comparison  
        }
        public DataTable SelectDistinct(DataTable SourceTable, string FieldName)
        {
            // Create a Datatable – datatype same as FieldName  
            DataTable dt = new DataTable(SourceTable.TableName);
            dt.Columns.Add(FieldName, SourceTable.Columns[FieldName].DataType);
            // Loop each row & compare each value with one another  
            // Add it to datatable if the values are mismatch  
            object LastValue = null;
            foreach (DataRow dr in SourceTable.Select("", FieldName))
            {
                if (LastValue == null || !(ColumnEqual(LastValue, dr[FieldName])))
                {
                    LastValue = dr[FieldName];
                    dt.Rows.Add(new object[] { LastValue });
                }
            }
            return dt;
        }
    }
}
