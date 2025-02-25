using MA.API.Data;
using MA.API.Models;
using MA.API.ModelsView;
using MA.API.Services;
using MA.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;

namespace MA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImportSummaryController : Controller
    {
        private DBContext _DBContext;
        private BuyerService _buyerService;
        private ImportSummaryService _importSummaryService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();

        public ImportSummaryController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _importSummaryService = new ImportSummaryService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("List")]
        [AllowAnonymous]
        public async Task<ActionResult> List([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _importSummaryService.List(request);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(HttpStatusCode.NotFound, "Data not found"));
                    }
                }
                else
                {
                    return BadRequest(new ApiBadRequestResponse(ModelState));
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in list of files by FileType"));
            }
        }

        [HttpPost("ImportParts")]
        [AllowAnonymous]
        public async Task<ActionResult> ImportParts(IFormFile file,[FromForm] string fileType)
        {
            try
            {
                var type = JsonConvert.DeserializeObject<dynamic>(Request.Form["text"].ToString());

                if (ModelState.IsValid)
                {
                    var res = _importSummaryService.ImportParts(file, fileType);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(HttpStatusCode.NotFound, "Data not found"));
                    }
                }
                else
                {
                    return BadRequest(new ApiBadRequestResponse(ModelState));
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Uploading File"));
            }
        }

        [HttpPost("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get(string fileType)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _importSummaryService.Get(fileType);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(HttpStatusCode.NotFound, "Data not found"));
                    }
                }
                else
                {
                    return BadRequest(new ApiBadRequestResponse(ModelState));
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in geting complete status files"));
            }
        }





    }
}
