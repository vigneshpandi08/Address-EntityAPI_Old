using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Address_EntityAPI.Startup))]
namespace Address_EntityAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
