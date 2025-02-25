using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class OrderService
    {
        private YIPL_MAContext _yIPL_MAContext;
        public OrderRepository _orderRepository = null;
        public OrderService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _orderRepository = new OrderRepository(DBContext, _yIPL_MAContext);
        }
        public JObject List(JObject data)
        {
            var response = new JObject();
            try
            {
                var GRNList = _orderRepository.List(data);
                var count = GRNList["OrderDetailCount"].ToString();
                if (count != "0")
                {
                    return GRNList;
                }
                else
                {
                    response.Add("Message", "OrderDetailList doesn't exist!");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

        public List<OrderDetail> View(JObject data)
        {
            //var response = new JObject();
            var order = _orderRepository.View(data);
            if (order != null)
            {
                return order;
            }
            
            return null;
        }

        public JObject Create(JObject data)
        {
            var response = new JObject();
            try
            {
               
                var order = new Order();
                order.OrderNumber = DateTime.Now.ToString("yyyyMMddTHH:mm:ss.fffffffK");
                order.OrderDate = DateTime.UtcNow;
                order.CreatedBy = Convert.ToString(data["CreatedBy"]);
                order.BuyerCode = Convert.ToString(data["CreatedBy"]);
                order.WeekNumber = Convert.ToInt32(data["WeekNumber"]);
                order.OrderType = Convert.ToString(data["OrderType"]);
                order.PlantLocationMapping = Convert.ToString(data["PlantLocationMapping"]);
                order.Status = "Pending";

                var addOrder = _orderRepository.Create(order);
                response.Add("AddOrder", addOrder);
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }
        public JObject Get(JObject data)
        {
            var response = new JObject();
            try
            {
                var orderList = _orderRepository.Get(data);
                var count = orderList["OrderCount"].ToString();
                if (count != "0")
                {
                    return orderList;
                }
                else
                {
                    response.Add("Message", "OrderList doesn't exist!");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

        public JArray GetBuyerPlantLocations(JObject data)
        {
            return _orderRepository.GetBuyerPlantLocations(data);
        }


        public JObject GetOrderMaturity(JObject data)
        {
            var response = new JObject();
            try
            {
                var orderList = _orderRepository.GetOrderMaturity(data);
                if (orderList != null)
                {
                    if (orderList.Count > 0)
                    {
                        return orderList;

                    }
                    else
                    {
                        response.Add("Result", "No records found");
                        return response;
                    }
                }
                else
                {
                    response.Add("Result", "No records found");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

        public JObject UpdateOrderMaturity(JArray request)
        {
            var response = new JObject();
            try
            {
                var result = _orderRepository.UpdateOrderMaturity(request);
                if (result != null)
                {
                    if (result > 0)
                    {
                        response.Add("Result", "Update Successful");
                        return response;

                    }
                    else
                    {
                        response.Add("Result", "Update failed");
                        return response;
                    }
                }
                else
                {
                    response.Add("Result", "No records found");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }
    }


    
}
