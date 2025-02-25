import { Component, OnInit, OnChanges } from "@angular/core";
import { BreadcrumbsService } from "../../services/breadcrumbs.service";
import { Router } from "@angular/router";
declare var settings: any;
@Component({
  selector: "app-breadcrumb",
  template: `
    <div class="page-title" [ngStyle]="{ color: textColor }">
      {{ label }}
    </div>
  `,
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  label: BreadcrumbsService;
  textColor = settings.colorCode.text;
  constructor(
    public breadcrumbService: BreadcrumbsService,
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event !== null) {
        this.label = this.breadcrumbService.label;
      }
    });
  }

  ngOnInit() {
    this.label = this.breadcrumbService.label;
  }

  ngOnChanges() {
    this.label = this.breadcrumbService.label;
  }
}
