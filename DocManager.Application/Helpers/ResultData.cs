using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Helpers
{

    public class ResultData
    {
        public ResultData(object _data, bool _success)
        {
            this.Success = _success;
            this.Data = _data;
        }
        public bool Success { get; set; }
        public object Data { get; set; }
    }
}
