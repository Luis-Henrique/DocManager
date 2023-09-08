using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Localization;
using DocManager.Application.Data.MySql;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using System.Globalization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DocManager.API.Admin
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public void BeforeConfigureServices(IServiceCollection services)
        {

        }
        public void ConfigureServices(IServiceCollection services)
        {
            Configuration = new ConfigurationBuilder()
               .AddJsonFile("appsettings.json")
               .Build();

            services.AddAuthentication("BasicAuthentication")
                      .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                                      //policy.WithOrigins("https://mango-plant-0ce961a0f.3.azurestaticapps.net").AllowAnyHeader().AllowAnyMethod();
                                  });
            });

            BeforeConfigureServices(services);
            services.AddApiVersioning();
            services.AddScoped<EmailService>();

            services.AddScoped<UserService>();
            services.AddScoped<UserRepository>();

            services.AddScoped<DocumentTypeService>();
            services.AddScoped<DocumentTypeRepository>();

            services.AddScoped<DocumentService>();
            services.AddScoped<DocumentRepository>();

            services.AddScoped<DashboardService>();
            services.AddScoped<DashboardRepository>();

            services.AddScoped<DocumentPartnersService>();
            services.AddScoped<DocumentPartnersRepository>();

            services.AddScoped<GroupAutorizationService>();
            services.AddScoped<GroupAutorizationRepository>();

            services.AddScoped<MySqlContext>();
            services.Configure<AppConnectionSettings>(option => Configuration.GetSection("ConnectionStrings").Bind(option));

            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var supportedCultures = new[] { new CultureInfo("en-US") };
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(culture: "en-US", uiCulture: "en-US"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            });

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMvc();
        }
    }
}
