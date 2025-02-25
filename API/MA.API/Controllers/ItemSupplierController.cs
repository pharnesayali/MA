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
    public class ItemSupplierController : Controller
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        ItemSupplierService _itemSupplierService;
        private ILoggerManager _logger = new LoggerManager();
        public ItemSupplierController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _itemSupplierService = new ItemSupplierService(_DBContext, _yIPL_MAContext);
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _itemSupplierService.Get(request);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get ItemSupplier "));
            }
        }

        [HttpPost("List")]
        [AllowAnonymous]
        public async Task<ActionResult> List([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _itemSupplierService.List(request);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok( new ApiResponse(System.Net.HttpStatusCode.NoContent, "No records Found"));
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in List ItemSupplier "));
            }
        }


        [HttpPost("Update")]
        [AllowAnonymous]
        public async Task<ActionResult> Update([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _itemSupplierService.Update(request);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(System.Net.HttpStatusCode.NoContent, "No records Updated"));
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Update ItemSupplier "));
            }
        }

        [HttpPost("GetByPlant")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByPlant([FromBody] JObject data)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _itemSupplierService.GetByPlant(data);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(System.Net.HttpStatusCode.NoContent, "No records found"));
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in GetByPlant ItemSupplier "));
            }
        }
    }
}

