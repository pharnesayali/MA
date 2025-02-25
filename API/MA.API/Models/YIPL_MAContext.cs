using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MA.API.Models
{
    public partial class YIPL_MAContext : DbContext
    {
        public YIPL_MAContext()
        {
        }

        public YIPL_MAContext(DbContextOptions<YIPL_MAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ConsumptionReport> ConsumptionReports { get; set; } = null!;
        public virtual DbSet<Coverage> Coverages { get; set; } = null!;
        public virtual DbSet<FileToProcess> FileToProcesses { get; set; } = null!;
        public virtual DbSet<Grn> Grns { get; set; } = null!;
        public virtual DbSet<GRNCombined> GRNCombined { get; set; } = null!;
        public virtual DbSet<Order> Order { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetail { get; set; } = null!;
        public virtual DbSet<Invoice> Invoices { get; set; } = null!;
        public virtual DbSet<LogProcessedFile> LogProcessedFiles { get; set; } = null!;
        public virtual DbSet<MItem> MItems { get; set; } = null!;
        public virtual DbSet<MItemSupplier> MItemSuppliers { get; set; } = null!;
        public virtual DbSet<MMovementType> MMovementTypes { get; set; } = null!;
        public virtual DbSet<MMrp> MMrps { get; set; } = null!;
        public virtual DbSet<MPlant> MPlants { get; set; } = null!;
        public virtual DbSet<MPlantItemSupplier> MPlantItemSuppliers { get; set; } = null!;
        public virtual DbSet<Receipt> Receipts { get; set; } = null!;
        public virtual DbSet<RrCalculation> RrCalculations { get; set; } = null!;
        public virtual DbSet<Stock> Stocks { get; set; } = null!;
        public virtual DbSet<TotalStock> TotalStocks { get; set; } = null!;
        public virtual DbSet<UserRole> UserRoles { get; set; } = null!;
        public virtual DbSet<WeekDate> WeekDates { get; set; } = null!;
        public virtual DbSet<ZlrStock> ZlrStocks { get; set; } = null!;
        public virtual DbSet<CommonUser> CommonUser { get; set; } = null!;
        // public virtual DbSet<v_MRP_Item_Plant_Supplier_Buyer> v_MRP_Item_Plant_Supplier_Buyer { get; set; } = null!;
        public virtual DbSet<v_GRN> v_GRN { get; set; } = null!;
        public virtual DbSet<M_BuyerSupplier> M_BuyerSupplier { get; set; } = null!;
        public virtual DbSet<FileToProcess> FileToProcess { get; set; } = null!;








        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=43.231.124.151;Database=YIPL_MA;Uid=appuser;Password=bbz@123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ConsumptionReport>(entity =>
            {
                entity.ToTable("ConsumptionReport");

                entity.Property(e => e.ConsumptionDate).HasColumnType("date");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DocumentNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.MRPController)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("MRPController");

                entity.Property(e => e.MRPControllerName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("MRPControllerName");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.PostingDate).HasColumnType("date");
            });

            modelBuilder.Entity<Coverage>(entity =>
            {
                entity.ToTable("Coverage");

                entity.Property(e => e.Coverage1).HasColumnType("decimal(18, 3)");

                entity.Property(e => e.Coverage2).HasColumnType("decimal(18, 3)");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Mrp).HasColumnName("MRP");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.Coverages)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Coverage_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.Coverages)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Coverage_M_Plant");
            });

            modelBuilder.Entity<FileToProcess>(entity =>
            {
                entity.ToTable("FileToProcess");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ErrorMessage).IsUnicode(false);

                entity.Property(e => e.FileName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FilePath)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FileType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Grn>(entity =>
            {
                entity.ToTable("GRN");

                entity.Property(e => e.AmountInLc)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("AmountInLC");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.EntryDate).HasColumnType("datetime");

                entity.Property(e => e.Grnnumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("GRNNumber");

                entity.Property(e => e.InvoiceNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.MaterialDocument)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Ponumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("PONumber");

                entity.Property(e => e.PostingDate).HasColumnType("datetime");

                entity.Property(e => e.SupplierCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.Grns)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GRN_M_Items");

                entity.HasOne(d => d.MovementType)
                    .WithMany(p => p.Grns)
                    .HasForeignKey(d => d.MovementTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GRN_M_MovementType");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.Grns)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GRN_M_Plant");
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.ToTable("Invoice");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.BLNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("BLNumber");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ExpectedArrivalAtFactory).HasColumnType("datetime");

                entity.Property(e => e.ExpectedArrivalDateAtPort).HasColumnType("datetime");

                entity.Property(e => e.ExpectedDeliveryDate).HasColumnType("datetime");

                entity.Property(e => e.GRNId).HasColumnName("GRNId");

                entity.Property(e => e.InvoiceDate).HasColumnType("datetime");

                entity.Property(e => e.InvoiceNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.JobNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedBy)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Mode)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.MPNNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("MPNNumber");

                entity.Property(e => e.OrderName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PartValue).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.PONumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("PONumber");

                entity.Property(e => e.SupplierCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Grn)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.GRNId)
                    .HasConstraintName("FK_Invoice_GRN");

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Invoice_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Invoice_M_Plant");
            });

            modelBuilder.Entity<LogProcessedFile>(entity =>
            {
                entity.ToTable("Log_ProcessedFiles");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ErrorMessage).IsUnicode(false);

                entity.Property(e => e.FileName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FilePath)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FileType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MItem>(entity =>
            {
                entity.HasKey(e => e.ItemCode);

                entity.ToTable("M_Items");

                entity.HasIndex(e => e.ItemCode, "IX_M_Items")
                    .IsUnique();

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);



                entity.Property(e => e.Commodity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CostApproval)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Currency)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.DispatchLocation)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.IncoTerm)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.LeadTime).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Maker)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.MakerPartNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MOQ).HasColumnName("MOQ");

                entity.Property(e => e.OriginCountry)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ParentPart)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentTerms)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.RatePerUnit).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Source)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.SPQ).HasColumnName("SPQ");

                entity.Property(e => e.TPartNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("TPartNumber");

                entity.Property(e => e.UnitWeight)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UOM)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .HasColumnName("UOM");
            });

            modelBuilder.Entity<MItemSupplier>(entity =>
            {
                entity.ToTable("M_ItemSupplier");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.SupplierCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SupplierName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.MItemSuppliers)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_M_ItemSupplier_M_Items");
            });

            modelBuilder.Entity<MMovementType>(entity =>
            {
                entity.ToTable("M_MovementType");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TypeCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MMrp>(entity =>
            {
                entity.ToTable("M_MRP");

                entity.Property(e => e.BuyerCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Customer)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Demand).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Project)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.SupplierCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Zone)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.HasOne(d => d.BuyerCodeNavigation)
                    .WithMany(p => p.MMrps)
                    .HasForeignKey(d => d.BuyerCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_M_MRP_UserRole");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.MMrps)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_M_MRP_M_Plant");
            });

            modelBuilder.Entity<MPlant>(entity =>
            {
                entity.HasKey(e => e.PlantCode);

                entity.ToTable("M_Plant");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Location)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PlantName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remark)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Zone)
                    .HasMaxLength(8)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MPlantItemSupplier>(entity =>
            {
                entity.ToTable("M_PlantItemSupplier");

                entity.HasIndex(e => new { e.ItemCode, e.PlantCode, e.SupplierCode }, "IX_M_PlantItemSupplier")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Distance)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Location)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.SupplierCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SupplierName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.MPlantItemSuppliers)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_M_PlantItemSupplier_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.MPlantItemSuppliers)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_M_Item_Supplier_M_Plant");
            });

            modelBuilder.Entity<Receipt>(entity =>
            {
                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.Receipts)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Receipts_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.Receipts)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Receipts_M_Plant");
            });

            modelBuilder.Entity<RrCalculation>(entity =>
            {
                entity.ToTable("RR_Calculations");

                entity.Property(e => e.ActualAverageLevel).HasColumnName("Actual_Average_Level");

                entity.Property(e => e.ActualAverageValue)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("Actual_Average_Value");

                entity.Property(e => e.ActualMaxLevel).HasColumnName("Actual_Max_Level");

                entity.Property(e => e.AverageInventory).HasColumnName("Average_Inventory");

                entity.Property(e => e.AverageValue)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("Average_Value");

                entity.Property(e => e.BufferStock).HasColumnName("Buffer_Stock");

                entity.Property(e => e.Buyer)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CurrentValue)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("Current_Value");

                entity.Property(e => e.DailyCostCurrent)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("Daily_Cost_Current");

                entity.Property(e => e.DailyCostFuture)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("Daily_Cost_Future");

                entity.Property(e => e.DemandPerWeek).HasColumnName("Demand_Per_Week");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LeadTimeMonth).HasColumnName("Lead_Time_Month");

                entity.Property(e => e.LeadTimeWeek).HasColumnName("Lead_Time_Week");

                entity.Property(e => e.MaxInventory).HasColumnName("Max_Inventory");

                entity.Property(e => e.MaxNumberOfDayFuture).HasColumnName("Max_Number_Of_Day_Future");

                entity.Property(e => e.MaxValue)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("Max_Value");

                entity.Property(e => e.MinimumOrderQuantity).HasColumnName("Minimum_Order_Quantity");

                entity.Property(e => e.Model)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.NewPitchTimeConsumption).HasColumnName("New_Pitch_Time_Consumption");

                entity.Property(e => e.NewPitchTimeWeek).HasColumnName("New_Pitch_Time_Week");

                entity.Property(e => e.NptcInMoq).HasColumnName("NPTC_In_MOQ");

                entity.Property(e => e.PitchTimeConsumption).HasColumnName("Pitch_Time_Consumption");

                entity.Property(e => e.PitchTimeWeek).HasColumnName("Pitch_Time_Week");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.RevisedPitchTime).HasColumnName("Revised_Pitch_Time");

                entity.Property(e => e.SafetyStock).HasColumnName("Safety_Stock");

                entity.Property(e => e.Supplier)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.RrCalculations)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RR_Calculations_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.RrCalculations)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RR_Calculations_M_Plant");
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.ToTable("Stock");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Location)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Sloc).HasColumnName("SLOC");

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.Stocks)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Stock_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.Stocks)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Stock_M_Plant");
            });

            modelBuilder.Entity<TotalStock>(entity =>
            {
                entity.ToTable("TotalStock");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                // entity.Property(e => e.Zlrtrack).HasColumnName("ZLRTrack");

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.TotalStocks)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TotalStock_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.TotalStocks)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TotalStock_M_Plant");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => e.EmployeeCode)
                    .HasName("PK_User_Role");

                entity.ToTable("UserRole");

                entity.Property(e => e.EmployeeCode)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Department)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.RoleCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);



                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserRole_UserRole");
            });

            modelBuilder.Entity<WeekDate>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Week_Date");

                entity.Property(e => e.DateFrom)
                    .HasColumnType("datetime")
                    .HasColumnName("Date_From");

                entity.Property(e => e.DateTo)
                    .HasColumnType("datetime")
                    .HasColumnName("Date_To");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.WeekNumber).HasColumnName("Week_Number");
            });

            modelBuilder.Entity<ZlrStock>(entity =>
            {
                entity.ToTable("ZLR_Stock");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ItemCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.PlantCode)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.HasOne(d => d.ItemCodeNavigation)
                    .WithMany(p => p.ZlrStocks)
                    .HasForeignKey(d => d.ItemCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ZLR_Stock_M_Items");

                entity.HasOne(d => d.PlantCodeNavigation)
                    .WithMany(p => p.ZlrStocks)
                    .HasForeignKey(d => d.PlantCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ZLR_Stock_M_Plant");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
