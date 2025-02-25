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
    public class ItemController : Controller
    {
        private DBContext _DBContext;
        private ItemService _itemService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();

        public ItemController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _itemService = new ItemService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Get the list of items from Mitems table based on the search criteria
        /// </summary>
        /// <param name="request"> PageNo,PageCount,PartNo,ParentPart,SuppierCode,SupplierName,Source</param>
        /// <returns></returns>
        [HttpPost("GetList")]
        [AllowAnonymous]
        public async Task<ActionResult> Get([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _itemService.Get(request);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Item List"));
            }
        }
        /// <summary>
        /// Soft deletes the item with id provided in Mitems table 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("Delete")]
        [AllowAnonymous]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _itemService.Delete(id);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Delete Item"));
            }
        }
    }
}
