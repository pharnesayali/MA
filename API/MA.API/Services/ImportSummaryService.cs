using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class ImportSummaryService
    {
        private YIPL_MAContext _yIPL_MAContext;
        public ImportSummaryRepository _itemRepository = null;
        public ImportSummaryService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _itemRepository = new ImportSummaryRepository(DBContext, _yIPL_MAContext);
        }
        public JObject List(JObject type)
        {
            
            try
            {
                var res = _itemRepository.List(type);
                return res;
            }
            catch (Exception e)
            {
                var response = new JObject();
                response.Add("Message", e.Message);
                return response;
            }
        }
      
        public JObject ImportParts(IFormFile file,string fileType)
        {
            var response = new JObject();
            try
            {
                var importFile = _itemRepository.ImportParts(file, fileType);
                if (importFile != null)
                {
                    response.Add("Message", "File uploaded successfully! Waiting for import scheduled.");
                }
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

        public JObject Get(string fileType)
        {
            
            try
            {
                return _itemRepository.Get(fileType);
            }
            catch (Exception e)
            {
                var response = new JObject();
                response.Add("Message", e.Message);
                return response;
            }
        }
    }
}
