﻿using System;
using System.Collections.Generic;

namespace MA.API.Models
{
    public partial class LogProcessedFile
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string FileName { get; set; } = null!;
        public string FilePath { get; set; } = null!;
        public string FileType { get; set; } = null!;
        public int CreatedBy { get; set; }
        public string? Status { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
