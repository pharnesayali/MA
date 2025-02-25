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
    public class OrderController : Controller
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        OrderService _orderService;
        private ILoggerManager _logger = new LoggerManager();


        public OrderController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _orderService = new OrderService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("List")]
        [AllowAnonymous]
        public async Task<ActionResult> List([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _orderService.List(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Order List"));
            }
        }

        [HttpPost("View")]
        [AllowAnonymous]
        public async Task<ActionResult> View([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _orderService.View(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in view order"));
            }
        }

        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<ActionResult> Create([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _orderService.Create(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in generate order"));
            }
        }

        [HttpPost("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _orderService.Get(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in get order list"));
            }
        }


        [HttpPost("GetBuyerPlantLocations")]
        [AllowAnonymous]
        public async Task<ActionResult> GetBuyerPlantLocations([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _orderService.GetBuyerPlantLocations(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in get BuyerPlantLocations"));
            }
        }


        [HttpPost("GetOrderMaturity")]
        [AllowAnonymous]
        public async Task<ActionResult> GetOrderMaturity([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _orderService.GetOrderMaturity(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Order List"));
            }
        }


        [HttpPost("UpdateOrderMaturity")]
        [AllowAnonymous]
        public async Task<ActionResult> UpdateOrderMaturity([FromBody] JArray data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _orderService.UpdateOrderMaturity(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Update"));
            }
        }
    }
}
