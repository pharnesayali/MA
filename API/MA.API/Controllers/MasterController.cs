using Microsoft.AspNetCore.Mvc;
using MA.API.Data;
using MA.API.Models;
using MA.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using MA.API.ModelsView;
using System.Net;
using MA.API.Utilities;

namespace MA.API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class MasterController : Controller
    {
        private DBContext _DBContext;
        private MasterService _masterService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();
      
        public MasterController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _masterService = new MasterService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Gets all the record from MPlants table 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPlantList")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPlantList()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _masterService.GetPlantList();
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
                {

                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Geting Plant master List"));
            }
        }

        [HttpGet("GetMovementType")]
        [AllowAnonymous]
        public async Task<ActionResult> GetMovementType()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _masterService.GetMovementType();
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
                {

                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Geting Plant master List"));
            }
        }

        [HttpGet("GetWeek")]
        [AllowAnonymous]
        public async Task<ActionResult> GetWeek()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _masterService.GetWeekDate();
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
                {

                }

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);

                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in getting week"));
            }

        }

        [HttpPost("GetConsumptionReport")]
        [AllowAnonymous]


        public async Task<ActionResult> GetConsumptionReport([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _masterService.GetConsumptionReport(request);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return BadRequest();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Consumption Report List"));
            }
        }



        [HttpGet("GetCompleteFiles")]
        [AllowAnonymous]


        public async Task<ActionResult> GetCompleteFiles()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _masterService.GetCompleteFiles();
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return BadRequest();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in  GetCompleteFiles List"));
            }
        }

        [HttpPost("GetDailyshipment")]
        [AllowAnonymous]
        public async Task<ActionResult> GetDailyshipment(JObject request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _masterService.GetDailyshipment(request);
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
                {

                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in getting Daily shipment"));
            }
        }

        [HttpPost("GetInventoryCorrection")]
        [AllowAnonymous]
        public async Task<ActionResult> GetInventoryCorrection(JObject request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _masterService.GetInventoryCorrection(request);
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
                {

                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Geting InventoryCorrection"));
            }
        }

        [HttpGet("GetCurrentWeek")]
        [AllowAnonymous]
        public async Task<ActionResult> GetCurrentWeek()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _masterService.GetCurrentWeekDate();
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
                {

                }

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message);

                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in getting week"));
            }

        }

    }
}
