using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json.Linq;
using System.Data;
namespace MA.API.Repositries
{
    public class ImportSummaryRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public ImportSummaryRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public JObject List(JObject type)
        {
            var res = new JObject();
            var files = _yIPL_MAContext.FileToProcess.Where(x => x.FileType == Convert.ToString(type["FileType"])).OrderByDescending(x=>x.Date).Take(10).ToList();
            if(files.Count==0)
            {
                res.Add("Response", "List Doesn't Exist!");
                return res;
            }
            res.Add("List", JArray.FromObject(files));
            return res;
        }



        public FileToProcess ImportParts(IFormFile file,string fileType)
        {
            FileToProcess fileToProcess = new FileToProcess();
            string fullPath= Path.Combine("Files/", file.FileName);
            switch (fileType)
            {
                case "GRN":
                    if(!Directory.Exists("Files/GRN"))
                    {
                        Directory.CreateDirectory("Files/GRN");
                    }
                    else
                    {
                        fullPath = Path.Combine("Files/GRN", file.FileName);
                    }
                    break;
                case "Invoice":
                    if (!Directory.Exists("Files/Invoice"))
                    {
                        Directory.CreateDirectory("Files/Invoice");
                    }
                    else
                    {
                        fullPath = Path.Combine("Files/Invoice", file.FileName);
                    }
                    
                    break;
                case "M_Items":
                    if (!Directory.Exists("Files/M_Items"))
                    {
                        Directory.CreateDirectory("Files/M_Items");
                    }
                    fullPath = Path.Combine("Files/M_Items", file.FileName);
                    break;
                case "MRP":
                    if (!Directory.Exists("Files/MRP"))
                    {
                        Directory.CreateDirectory("Files/MRP");
                    }
                    fullPath = Path.Combine("Files/MRP", file.FileName);
                    break;
                case "Plant_supplier_master":
                    if (!Directory.Exists("Files/Plant_supplier_master"))
                    {
                        Directory.CreateDirectory("Files/Plant_supplier_master");
                    }
                    fullPath = Path.Combine("Files/Plant_supplier_master", file.FileName);
                    break;
                case "StockInHand":
                    if (!Directory.Exists("Files/StockInHand"))
                    {
                        Directory.CreateDirectory("Files/StockInHand");
                    }
                    fullPath = Path.Combine("Files/StockInHand", file.FileName);
                    break;
                case "DailyShipment":
                    if (!Directory.Exists("Files/Dailyshipment"))
                    {
                        Directory.CreateDirectory("Files/DailyShipment");
                    }
                    fullPath = Path.Combine("Files/DailyShipment", file.FileName);
                    break;
                case "OrderDetails":
                    if (!Directory.Exists("Files/OrderDetails"))
                    {
                        Directory.CreateDirectory("Files/OrderDetails");
                    }
                    fullPath = Path.Combine("Files/OrderDetails", file.FileName);
                    break;
                default:
                    break;
            }

            if (file.Length > 0)
            {
                using (var stream = System.IO.File.Create(fullPath))
                {
                    file.CopyTo(stream);
                }
            }
            string ext = Path.GetExtension(file.FileName);
            fileToProcess.FileName = file.FileName;
            fileToProcess.FilePath = "/Files/"+fileType+"/"+file.FileName;
            fileToProcess.Status = "Pending";
            fileToProcess.CreatedBy = 1;
            fileToProcess.Date = DateTime.Now;
            fileToProcess.FileType = fileType;

            _yIPL_MAContext.FileToProcesses.Add(fileToProcess);
            _yIPL_MAContext.SaveChanges();

            return fileToProcess;
        }

        public JObject Get(string fileType)
        {
            
            var result= _yIPL_MAContext.FileToProcess.Where(x => x.FileType == fileType && x.Status == "Complete").OrderByDescending(x => x.Date).ToList();
            var obj = new JObject();
            if (result != null)
            {
                if (result.Count > 0)
                {
                    obj.Add("Result", JArray.FromObject(result));
                    return obj;
                }
                else
                {
                    obj.Add("Result", "No records found");
                    return obj;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
