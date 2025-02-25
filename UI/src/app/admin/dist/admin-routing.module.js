"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var company_component_1 = require("./components/company/company.component");
var segments_component_1 = require("./components/segments/segments.component");
var user_management_component_1 = require("./components/user-management/user-management.component");
var snapshots_component_1 = require("./components/snapshots/snapshots.component");
var labor_rates_component_1 = require("./components/labor-rates/labor-rates.component");
var import_log_component_1 = require("./components/import-log/import-log.component");
var project_list_component_1 = require("../project/components/project-list/project-list.component");
var program_list_component_1 = require("../programs/components/program-list/program-list.component");
var program_cost_codes_component_1 = require("../programs/components/program-cost-codes/program-cost-codes.component");
var program_cost_code_data_component_1 = require("../programs/components/program-cost-code-data/program-cost-code-data.component");
var program_permissions_component_1 = require("../programs/components/program-permissions/program-permissions.component");
var project_cost_codes_component_1 = require("../project/components/project-cost-codes/project-cost-codes.component");
var project_cost_code_data_component_1 = require("../project/components/project-cost-code-data/project-cost-code-data.component");
var project_permissions_component_1 = require("../project/components/project-permissions/project-permissions.component");
var color_palettes_component_1 = require("./components/color-palettes/color-palettes.component");
// tslint:disable-next-line:max-line-length
var project_permission_allocate_component_1 = require("../project/components/project-permission-allocate/project-permission-allocate.component");
var project_permission_deallocate_component_1 = require("../project/components/project-permission-deallocate/project-permission-deallocate.component");
var program_permission_allocate_component_1 = require("../programs/components/program-permission-allocate/program-permission-allocate.component");
var program_permission_deallocate_component_1 = require("../programs/components/program-permission-deallocate/program-permission-deallocate.component");
var program_permission_options_component_1 = require("../programs/components/program-permissions/program-permission-options/program-permission-options.component");
var project_permission_options_component_1 = require("../project/components/project-permissions/project-permission-options/project-permission-options.component");
var financial_plan_type_component_1 = require("./components/financial-plan-type/financial-plan-type.component");
var calculator_formulas_component_1 = require("./components/calculator-formulas/calculator-formulas.component");
var program_permission_component_1 = require("./components/program-permission/program-permission.component");
var project_permission_component_1 = require("./components/project-permission/project-permission.component");
var cost_buckets_data_component_1 = require("./components/cost-buckets-data/cost-buckets-data.component");
var loading_rates_component_1 = require("./components/loading-rates/loading-rates.component");
var program_extended_fields_component_1 = require("../programs/components/program-extended-fields/program-extended-fields.component");
var project_extended_fields_component_1 = require("../project/components/project-extended-fields/project-extended-fields.component");
var project_cost_codes_extended_fields_component_1 = require("../project/components/project-cost-codes-extended-fields/project-cost-codes-extended-fields.component");
var project_milestones_component_1 = require("./components/project-milestones/project-milestones.component");
var routes = [
    {
        path: "company",
        component: company_component_1.CompanyComponent,
        data: {
            breadcrumb: "Company Profile"
        }
    },
    {
        path: "segments",
        component: segments_component_1.SegmentsComponent,
        data: {
            breadcrumb: "Cost Segments"
        }
    },
    {
        path: "users",
        component: user_management_component_1.UserManagementComponent,
        data: {
            breadcrumb: "Users"
        }
    },
    {
        path: "snapshots",
        component: snapshots_component_1.SnapshotsComponent,
        data: {
            breadcrumb: "Snapshot"
        }
    },
    {
        path: "labor-rates",
        component: labor_rates_component_1.LaborRatesComponent,
        data: {
            breadcrumb: "Labor Rates"
        }
    },
    {
        path: "financial-plan-type",
        component: financial_plan_type_component_1.FinancialPlanTypeComponent,
        data: {
            breadcrumb: "Snapshot Type"
        }
    },
    {
        path: "calculator-formulas",
        component: calculator_formulas_component_1.CalculatorFormulasComponent,
        data: {
            breadcrumb: "Formulas"
        }
    },
    {
        path: "import-logs",
        component: import_log_component_1.ImportLogComponent,
        data: {
            breadcrumb: "Import Logs"
        }
    },
    {
        path: "color-palettes",
        component: color_palettes_component_1.ColorPalettesComponent,
        data: {
            breadcrumb: "Color Scheme"
        }
    },
    {
        path: "cost-buckets-data-import",
        component: cost_buckets_data_component_1.CostBucketsDataComponent,
        data: {
            breadcrumb: "Cost Buckets Data"
        }
    },
    {
        path: "program-extended-fields",
        component: program_extended_fields_component_1.ProgramExtendedFieldsComponent,
        data: {
            breadcrumb: "Program Extended Fields"
        }
    },
    {
        path: "project-cost-codes-extended-fields",
        component: project_cost_codes_extended_fields_component_1.ProjectCostCodesExtendedFieldsComponent,
        data: {
            breadcrumb: "Project Cost Code Extended Fields"
        }
    },
    {
        path: "project-milestones",
        component: project_milestones_component_1.ProjectMilestonesComponent,
        data: {
            breadcrumb: "Project Milestone"
        }
    },
    {
        path: "project-extended-fields",
        component: project_extended_fields_component_1.ProjectExtendedFieldsComponent,
        data: {
            breadcrumb: "Project Extended Fields"
        }
    },
    {
        path: "loading-rates-import",
        component: loading_rates_component_1.LoadingRatesComponent,
        data: {
            breadcrumb: "Loading Rates"
        }
    },
    {
        path: "program-permission",
        component: program_permission_component_1.ProgramPermissionComponent,
        data: {
            breadcrumb: "Program Permissions"
        }
    },
    {
        path: "project-permission",
        component: project_permission_component_1.ProjectPermissionComponent,
        data: {
            breadcrumb: "Project Permissions"
        }
    },
    {
        path: "program-list",
        component: program_list_component_1.ProgramListComponent,
        data: {
            breadcrumb: "Program List"
        }
    },
    {
        path: "program-cost-codes",
        component: program_cost_codes_component_1.ProgramCostCodesComponent,
        data: {
            breadcrumb: "Program Cost Codes"
        }
    },
    {
        path: "program-cost-code-data",
        component: program_cost_code_data_component_1.ProgramCostCodeDataComponent,
        data: {
            breadcrumb: "Program Cost Code Data"
        }
    },
    {
        path: "program-permissions",
        component: program_permissions_component_1.ProgramPermissionsComponent,
        data: {
            breadcrumb: "Program Permissions"
        },
        children: [
            {
                path: "",
                redirectTo: "allocate-permission",
                pathMatch: "full"
            },
            {
                path: "allocate-permission",
                component: program_permission_options_component_1.ProgramPermissionOptionsComponent,
                data: {
                    breadcrumb: "Program Permissions"
                }
            },
            {
                path: "by-program",
                component: program_permission_allocate_component_1.ProgramPermissionAllocateComponent,
                data: {
                    breadcrumb: "By Program"
                }
            },
            {
                path: "by-user",
                component: program_permission_deallocate_component_1.ProgramPermissionDeallocateComponent,
                data: {
                    breadcrumb: "By User"
                }
            },
        ]
    },
    {
        path: "project-list",
        component: project_list_component_1.ProjectListComponent,
        data: {
            breadcrumb: "Project List"
        }
    },
    {
        path: "project-cost-codes",
        component: project_cost_codes_component_1.ProjectCostCodesComponent,
        data: {
            breadcrumb: "Project Cost Codes"
        }
    },
    {
        path: "project-cost-code-data",
        component: project_cost_code_data_component_1.ProjectCostCodeDataComponent,
        data: {
            breadcrumb: "Project Cost Code Data"
        }
    },
    {
        path: "project-permissions",
        component: project_permissions_component_1.ProjectPermissionsComponent,
        data: {
            breadcrumb: "Project Permissions"
        },
        children: [
            {
                path: "",
                redirectTo: "allocate-permission",
                pathMatch: "full"
            },
            {
                path: "allocate-permission",
                component: project_permission_options_component_1.ProjectPermissionOptionsComponent,
                data: {
                    breadcrumb: "Project Permissions"
                }
            },
            {
                path: "by-project",
                component: project_permission_allocate_component_1.ProjectPermissionAllocateComponent,
                data: {
                    breadcrumb: "By Project"
                }
            },
            {
                path: "by-user",
                component: project_permission_deallocate_component_1.ProjectPermissionDeallocateComponent,
                data: {
                    breadcrumb: "By User"
                }
            },
        ]
    },
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
