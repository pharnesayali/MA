
namespace MA.API.ModelsView
{
    using Microsoft.AspNetCore.Mvc.ModelBinding;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    public class ApiResponse
    {
        private HttpStatusCode oK;

        public HttpStatusCode StatusCode { get; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Message { get; }

        public ApiResponse(HttpStatusCode statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public ApiResponse(HttpStatusCode oK)
        {
            this.oK = oK;
        }

        private static string GetDefaultMessageForStatusCode(HttpStatusCode statusCode)
        {
            switch (statusCode)
            {
                case HttpStatusCode.Unauthorized:
                    return "Unauthorized User";

                case HttpStatusCode.BadRequest:
                    return "Resource not found";

                case HttpStatusCode.InternalServerError:
                    return "An unhandled error occurred";

                default:
                    return null;
            }
        }
    }
}
