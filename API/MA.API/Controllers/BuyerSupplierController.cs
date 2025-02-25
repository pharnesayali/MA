using MA.API.Data;
using MA.API.Models;
using MA.API.ModelsView;
using MA.API.Services;
using MA.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net;

namespace MA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BuyerSupplierController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private DBContext _DBContext;
        private BuyerSupplierService _buyerSupplierService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();
        public BuyerSupplierController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _buyerSupplierService = new BuyerSupplierService(_DBContext, _yIPL_MAContext);
        }


        [HttpPost("GetList")]
        [AllowAnonymous]
        public async Task<ActionResult> GetList([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _buyerSupplierService.List(request);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Buyer Suppiler List"));
            }
        }

            [HttpPost("Update")]
            [AllowAnonymous]
            public async Task<ActionResult> Update()
            {
                try
                {

                    if (ModelState.IsValid)
                    {
                        var res = _buyerSupplierService.Update();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in update buyer"));
            }
            }

        [HttpGet("GetZone")]
        [AllowAnonymous]
        public async Task<ActionResult> GetZone()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _buyerSupplierService.GetZone();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Zone"));
            }
        }


        [HttpPost("GetPlant")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPlant([FromBody] JObject data)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _buyerSupplierService.GetPlant(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Zone"));
            }
        }


        [HttpPost("GetSupplierByBuyerID")]
        [AllowAnonymous]
        public async Task<ActionResult> GetSupplierByBuyerID(String Buyer)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _buyerSupplierService.GetSupplierByBuyerID(Buyer);
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

                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Supplier "));
            }
        }



        [HttpPost("Add")]
        [AllowAnonymous]
        public async Task<ActionResult> Add([FromBody] JObject data)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _buyerSupplierService.Add(data);
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

                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Add Buyer "));
            }
        }
    }
}
