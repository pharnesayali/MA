using MA.API.Data;
using MA.API.Filters;
using MA.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;

namespace MA.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            //Schedul.Configuration = configuration;
            ////JobScheduler.Start();
        }
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddNodeServices();
            // Add converter to DI 
            //services.AddSingleton(typeof(IConverter), new BasicConverter(new PdfTools()));
            // Add service and create Policy with options 
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                  builder => builder.AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .WithHeaders("authorization", "accept", "content-type", "origin")
                                    .AllowCredentials()
                                    .SetIsOriginAllowed(_ => true));
            });
            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();

            services.AddResponseCompression();
            services.AddDataProtection();
            services.AddRouting();
            services.AddResponseCompression();
            services.AddDataProtection();
            services.AddSingleton(new DBContext(new SqlDataAccess(Configuration.GetSection("ConnectionStrings:DefaultConnection").Value)));
            services.AddDbContext<YIPL_MAContext>(options =>
            options.UseSqlServer(Configuration.GetSection("ConnectionStrings:DefaultConnection").Value).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
            , ServiceLifetime.Scoped);

            //services.AddMvc(options =>
            //{

            //    options.Filters.Add<RuntimeManagerFilter>();
            //})
            //    .AddJsonOptions(options =>
            //    {
            //        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            //    })
            //    .SetCompatibilityVersion(CompatibilityVersion.Latest);
            services.AddMvc(options =>
            {
                options.Filters.Add<RuntimeManagerFilter>();
            })
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            })
            .SetCompatibilityVersion(CompatibilityVersion.Latest);


            // Get options from app settings
            //var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions 

        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider svp)
        {
            //Utilities.HostingEnvironment = env;
            //System.Web.HttpContext.Configure(app.ApplicationServices.GetRequiredService<Microsoft.AspNetCore.Http.IHttpContextAccessor>());

            //app.UseCors("AllowAll");
            app.UseCors(b => b.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                IdentityModelEventSource.ShowPII = true;
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            //app.UseEnyimMemcached();

            //CacheFactory.Instance.Initalize(LogFactory, Configuration);

            app.UseAuthentication();
            app.UseResponseCompression();

            app.UseCors("AllowAll");
            app.UseRouting();
            //app.UseAuthorization();
            //app.MapControllers();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
             name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            //Helper.EmailApi.Initialize(env, Configuration, LogFactory);
        }
    }
}
