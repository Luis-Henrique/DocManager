using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;

namespace DocManager.Application.Data.MySql
{
    public class MySqlContext
    {
        private MySqlConnection connection;
        private readonly string connectionString = "";

        public MySqlContext(IOptions<AppConnectionSettings> appsettings)
        {
            connectionString = appsettings.Value.DefaultConnection;
            connection = new MySqlConnection(connectionString);
            connection.Open();
        }
        public MySqlConnection Connection()
        {
            connection = new MySqlConnection(connectionString);
            connection.Open();
            return connection;
        }
    }
}
