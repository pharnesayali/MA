import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../admin.service';
declare var $: any;
@Component({
  selector: 'app-material-master',
  templateUrl: './material-master.component.html',
  styleUrls: ['./material-master.component.scss']
})
export class MaterialMasterComponent implements OnInit {
  @ViewChild("myfile") myFIle: ElementRef;
  context: any;
  gridOptions:any;
  headerHeight: number;
  rowHeight:number;
  rowSelection: string;
  gridApi:any;
  gridColumnApi:any;
  MRPName:any;
  frameworkComponents:any;
  Month:any;
  revision :any;
  plantName:any;
  rowGroupPanelShow: string;
  rowData:any;
  Status:any;
  selectedStatus:any
  zoneCode:any;
  zoneCodes:any;
  formData: FormData;
  uploadForm: any;
  filename1: string;
  isCSV: boolean;
  isFileSelected = true;
  mrpName:any;
  defaultColDef:any;
  columnDefs=[
    {
      headerName :"Source (Local /Import/Local Billing)",
      field: "source",
      filter: "agTextColumnFilter",
      headerTooltip: "Source (Local /Import/Local Billing)",
      width: 250,
      editable:false,
      enableRowGroup: true,
      pinned:"left"
    },
    {
      headerName :"Yazaki PN for T codes",
      field: "t_codes",
      filter: "agTextColumnFilter",
      headerTooltip: "Yazaki PN for T codes",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },

    {
      headerName :"Description",
      field: "description",
      filter: "agTextColumnFilter",
      headerTooltip: "Description",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Supplier",
      field: "supplier",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Supplier Code",
      field: "supplier_code",
      filter: "agTextColumnFilter",
      headerTooltip: "Supplier Code",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Old Supplier",
      field: "old_supplier",
      filter: "agTextColumnFilter",
      headerTooltip: "Old Supplier",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Source Change Date",
      field: "source_change_date",
      filter: "agTextColumnFilter",
      headerTooltip: "Source Change Date",
      width: 250,
      editable:false,
    },
    {
      headerName :"Maker Name",
      field: "maker_name",
      filter: "agTextColumnFilter",
      headerTooltip: "Maker Name",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Maker Part Number",
      field: "maker_part_no",
      filter: "agTextColumnFilter",
      headerTooltip: "Maker Part Number",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Commodity",
      field: "commodity",
      filter: "agTextColumnFilter",
      headerTooltip: "Commodity",
      width: 250,
      editable:false,
    },
    {
      headerName :"Price",
      field: "price",
      filter: "agTextColumnFilter",
      headerTooltip: "Price",
      valueFormatter: dollerFormatter,
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Currency",
      field: "currency",
      filter: "agTextColumnFilter",
      headerTooltip: "Currency",
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"Price Per",
      field: "price_per",
      filter: "agTextColumnFilter",
      headerTooltip: "Price Per",
      valueFormatter: dollerFormatter,
      width: 250,
      editable:false,
      enableRowGroup: true,
    },
    {
      headerName :"UOM",
      field: "uom",
      filter: "agTextColumnFilter",
      headerTooltip: "UOM",
      width: 250,
      editable:false,
    },
    {
      headerName :"MOQ",
      field: "moq",
      filter: "agTextColumnFilter",
      headerTooltip: "MOQ",
      width: 250,
      editable:false,
    },
    {
      headerName :"SPQ",
      field: "spq",
      filter: "agTextColumnFilter",
      headerTooltip: "SPQ",
      width: 250,
      editable:false,
    },
    {
      headerName :"Lead Time",
      field: "lead_time",
      filter: "agTextColumnFilter",
      headerTooltip: "Lead Time",
      width: 250,
      editable:false,
    },
    {
      headerName :"Inco Terms",
      field: "inco_terms",
      filter: "agTextColumnFilter",
      headerTooltip: "INco Terms",
      width: 250,
      editable:false,
    },
    {
      headerName :"Unit Weight (GM)",
      field: "unit_weight",
      filter: "agTextColumnFilter",
      headerTooltip: "Unit Weight(GM)",
      width: 250,
      editable:false,
    },
    {
      headerName :"Dispatch Location",
      field: "dispatch_location",
      filter: "agTextColumnFilter",
      headerTooltip: "Dispatch Location",
      width: 250,
      editable:false,
    },
    {
      headerName :"Country Of Origin",
      field: "country_of_origin",
      filter: "agTextColumnFilter",
      headerTooltip: "Country Of Origin",
      width: 250,
      editable:false,
    },
    {
      headerName :"Import / Local Billing",
      field: "local_billing",
      filter: "agTextColumnFilter",
      headerTooltip: "Import / Local Billing",
      width: 250,
      editable:false,
    },
    {
      headerName :"Payment Terms",
      field: "payment_terms",
      filter: "agTextColumnFilter",
      headerTooltip: "Payment Terms",
      width: 250,
      editable:false,
    },
    {
      headerName :"Cost Approval",
      field: "cost_approval",
      filter: "agTextColumnFilter",
      headerTooltip: "Cost Approval",
      width: 250,
      editable:false,
    },
    {
      headerName :"Remarks",
      field: "remarks",
      filter: "agTextColumnFilter",
      headerTooltip: "Remarks",
      width: 250,
      editable:false,
    },
  ];

  MrpData=[
    {
      source:"test 1",
      t_codes: "T7283103904",
      part_no:"7283103904",
      description:"CONN 090 3P F LGY",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 1 ",
      source_change_date:"08/02/2022",
      maker_name:"test ",
      maker_part_no:"2121",
      commodity:"test",
      price:"2000",
      price_per :"500",
      currency:"INR",
      uom:1000,
      moq:1500,
      spq:1000,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:500,
      dispatch_location:"Pune",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"test"
    },
    {
      source:"source 1",
      t_codes: "T7283103941",
      part_no:"7283103941",
      description:"CONN 0.64-2 5P F SUB-ASSY",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 2 ",
      source_change_date:"08/02/2022",
      maker_name:"test ",
      maker_part_no:"2121",
      commodity:"test",
      price:2000,
      price_per :450,
      currency:"INR",
      uom:1000,
      moq:1500,
      spq:1000,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:500,
      dispatch_location:"Mumbai",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<25% Parts"
    },
    {
      source:"source 2",
      t_codes: "T7114423902",
      part_no:"7114423902",
      description:"TER 40 III SRS M (0.3~0.5) TIN",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"08/02/2022",
      maker_name:"test ",
      maker_part_no:"2200",
      price_per :"700",
      commodity:"test 1",
      price:"5000",
      currency:"INR",
      uom:2000,
      moq:500,
      spq:9000,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:800,
      dispatch_location:"Mumbai",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<25% Parts"
    },
    {
      source:"source 3",
      t_codes: "T7172503020",
      part_no:"7114423902",
      description:"SEAL RUBBER 0.64",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"08/02/2022",
      maker_name:"test ",
      maker_part_no:"2200",
      commodity:"test 3",
      price_per :"590",
      price:"5000",
      currency:"INR",
      uom:600,
      moq:150000,
      spq:4000,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:200,
      dispatch_location:"Gujarat",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:">25% Parts"
    },
    {
      source:"source 4",
      t_codes: "T7172503440",
      part_no:"7172503440",
      description:"CONN 0.64-2 5P F SUB-ASSY",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 2 ",
      source_change_date:"08/02/2022",
      maker_name:"test ",
      maker_part_no:"4300",
      commodity:"test 3",
      price:"700",
      price_per :"250",
      currency:"INR",
      uom:800,
      moq:15000,
      spq:600,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:900,
      dispatch_location:"Gujarat",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:">50% Parts"
    },
    {
      source:"source 5",
      t_codes: "T7178503442",
      part_no:"T7178503442",
      description:"TER 40 III SRS M (0.3~0.5) TIN",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"09/02/2022",
      maker_name:"maker3 ",
      maker_part_no:"7600",
      commodity:"test 3",
      price:"9000",
      currency:"INR",
      uom:800,
      price_per :"650",
      moq:65000,
      spq:700,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:750,
      dispatch_location:"Nashik",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<50% Parts"
    },
    {
      source:"source 7",
      t_codes: "T7172503043",
      part_no:"7172503043",
      description:"CONN 0.64-2 5P F SUB-ASSY",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 1 ",
      source_change_date:"02/02/2022",
      maker_name:"maker2 ",
      maker_part_no:"8800",
      commodity:"test 1",
      price_per :"220",
      price:"4000",
      currency:"INR",
      uom:600,
      moq:6000,
      spq:800,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:980,
      dispatch_location:"Wagholi",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<20% Parts"
    },
    {
      source:"source 8",
      t_codes: "T7172503344",
      part_no:"7172503344",
      description:"CONN 0.64-2 5P F SUB-ASSY",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 2 ",
      source_change_date:"02/02/2022",
      maker_name:"maker2 ",
      maker_part_no:"8900",
      commodity:"test 1",
      price:"9000",
      price_per :"430",
      currency:"INR",
      uom:500,
      moq:9000,
      spq:300,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:480,
      dispatch_location:"Pune",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<20% Parts"
    },
    {
      source:"source 9",
      t_codes: "T7172503845",
      part_no:"7172503845",
      description:"CONN 0.64-2 5P F SUB-ASSY",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"08/02/2022",
      maker_name:"maker6 ",
      maker_part_no:"5400",
      commodity:"test 4",
      price:"6590",
      currency:"INR",
      price_per :"760",
      uom:800,
      moq:98000,
      spq:870,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:340,
      dispatch_location:"Wagholi",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<20% Parts"
    },
    {
      source:"source 10",
      t_codes: "T7172507046",
      part_no:"7172507046",
      description:"REAR HOLDER FOR 2P X TYPE W/P CONN ",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 6 ",
      source_change_date:"12/02/2022",
      maker_name:"maker9 ",
      maker_part_no:"6400",
      commodity:"test 5",
      price:"3500",
      currency:"INR",
      price_per :"320",
      uom:300,
      moq:6500,
      spq:890,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:540,
      dispatch_location:"Wagholi",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<30% Parts"
    },
    {
      source:"source 11",
      t_codes: "T7172507047",
      part_no:"7172507047",
      description:"CONN  250 SRS 1P F NA ",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"12/06/2022",
      maker_name:"maker9 ",
      maker_part_no:"7500",
      commodity:"test 6",
      price:"6600",
      currency:"INR",
      price_per :"720",
      uom:320,
      moq:6200,
      spq:820,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:520,
      dispatch_location:"Wagholi",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<30% Parts"
    },
    {
      source:"source 11",
      t_codes: "T7172507048",
      part_no:"7172507048",
      description:"CONN (90+187) SRS 24P F W/P B",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"22/06/2022",
      maker_name:"maker9 ",
      maker_part_no:"7520",
      commodity:"test 6",
      price:"6400",
      currency:"INR",
      price_per :"620",
      uom:220,
      moq:6700,
      spq:920,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:620,
      dispatch_location:"Wagholi",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<20% Parts"
    },
    {
      source:"source 12",
      t_codes: "T7172507049",
      part_no:"7172507049",
      description:"VINYL SHEET 80 B ",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"16/08/2022",
      maker_name:"maker1 ",
      maker_part_no:"2320",
      commodity:"test 3",
      price:"5600",
      currency:"INR",
      price_per :"280",
      uom:280,
      moq:8700,
      spq:980,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:980,
      dispatch_location:"Wagholi",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<20% Parts"
    },
    {
      source:"source 12",
      t_codes: "T7172507050",
      part_no:"7172507050",
      description:"CONN RETAINER GRAY FOR 040 SRS 33P CONN",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 2 ",
      source_change_date:"31/1/2022",
      maker_name:"maker3 ",
      maker_part_no:"780",
      commodity:"test 1",
      price:"3400",
      currency:"INR",
      price_per :"580",
      uom:260,
      moq:3200,
      spq:210,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:210,
      dispatch_location:"Wagholi",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:"<25% Parts"
    },
    {
      source:"source 13",
      t_codes: "T7172507051",
      part_no:"7172507051",
      description:"TER 040 SRS F (0.3~0.5)      ",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 3 ",
      source_change_date:"28/2/2022",
      maker_name:"maker3 ",
      maker_part_no:"120",
      commodity:"test 1",
      price:"1200",
      currency:"INR",
      price_per :"120",
      uom:320,
      moq:125,
      spq:220,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:220,
      dispatch_location:"Gujarat",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:">25% Parts"
    },
    {
      source:"source 14",
      t_codes: "T7172507052",
      part_no:"7172507052",
      description:"CIVUS 0.13 Y      ",
      supplier:"YAZAKI Corporation",
      supplier_code:"YAZAKI",
      old_supplier:"supplier 1 ",
      source_change_date:"12/2/2022",
      maker_name:"maker2 ",
      maker_part_no:"123",
      commodity:"test 1",
      price:"1300",
      currency:"INR",
      price_per :"230",
      uom:160,
      moq:430,
      spq:320,
      lead_time:"test",
      inco_terms:"test",
      unit_weight:220,
      dispatch_location:"Pune",
      country_of_origin:"India",
      local_billing:"Test",
      payment_terms:"test",
      cost_approval:"test",
      remarks:">30% Parts"
    },
  ]
  

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   // this.gridOptions.api.addAggFunc("customizeAgg", rowGroupAggrigate);
  }
  constructor(
    private adminService:AdminService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { 
    this.context = { componentParent: this };
    // this.gridOptions = {
    //   context: {
    //     componentParent: this,
    //   },
    // } as GridOptions;
    const gridSize = 6;
    this.rowHeight = gridSize * 4;
    this.headerHeight = gridSize * 7;
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";

    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

    this.adminService.deleteDocument$.subscribe((value) => {
      if (value) {
        this.deleteDocument(value);
      }
    });
    
    this.Status=[
      {
        id:1,
        name: "Weekly"
      },
      {
        id: 2,
        name :"Monthly"
      }
    ];

    this.uploadForm = this.formBuilder.group({
      myfile: [""],
    });
  }


  ngOnInit(): void {
  }



  deleteDocument(value: any) {
   this.MrpData.splice(value.data);
   this.rowData =this.MrpData;
  }

  showImport() {
    this.filename1 = null;
    $(".box-import, .common-bg").show();
  }

  hideImport() {
    this.isFileSelected = true;
    this.filename1 = null;
    $(".box-import, .common-bg").hide();
  }

  fileChange(event) {
    this.isFileSelected = true;
    this.formData = new FormData();
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.uploadForm.get("myfile").setValue(file);
      const filename = file.name;
      if (filename.includes(".csv")) {
        this.isCSV = true;
      } else {
        this.isCSV = false;
      }
      this.filename1 = filename;
      this.formData.append("file", file, filename);
      this.uploadForm.reset();
      this.myFIle.nativeElement.value = null;
      // event.target.files = [];
    }
  }

  UploadFile() {
    if (this.formData !== null && this.formData !== undefined) {
      this.hideImport();
      this.spinner.show();
   
    } else {
      this.isFileSelected = false;
    }
  }
}

function dollerFormatter(params) {
  if (params.value === undefined || null) {
  } else {
    if (params.value < 0) {
      return "(\x24" + formatNumber(params.value * -1) + ")";
    } else {
      return "\x24" + formatNumber(params.value);
    }
  }
}


function formatNumber(num: number) {
  if (num % 1 !== 0) {
    return Number(num)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return Number(num)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}