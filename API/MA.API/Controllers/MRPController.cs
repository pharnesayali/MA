//using CostEstimatorAPI.Model;
using MA.API.Data;
using MA.API.Models;
using MA.API.ModelsView;
using MA.API.Services;
using MA.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Net;

namespace MA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MRPController : Controller
    {
        private DBContext _DBContext;
        private MRPService _MRPService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();


        public MRPController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _MRPService = new MRPService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _MRPService.Get(data);
                    if (response != null)
                    {
                        return Ok(response);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get MRP List"));
            }
        }

        [HttpPost("List")]
        [AllowAnonymous]
        public async Task<ActionResult> List(JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _MRPService.List(data);
                    if (response != null)
                    {
                        return Ok(response);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get MRP List"));
            }
        }

        [HttpGet("Analysis")]
        [AllowAnonymous]
        public async Task<ActionResult> GetAnalysis()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _MRPService.GetAnalysis();
                    if (response != null)
                    {
                        return Ok(response);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get MRP List"));
            }
        }
    }
}
