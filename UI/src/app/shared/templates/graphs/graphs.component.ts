import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";


// id="{{ graph.containerId }}"
@Component({
  selector: "app-graphs",
  template: `
    <google-chart
      id="chart"
      [title]="graph.title"
      [type]="graph.type"
      [data]="graph.data"
      [columns]="graph.columnNames"
      [options]="graph.options"
      [width]="graph.width"
      [height]="graph.height"
    >
    </google-chart>
  `,
})
export class GraphsComponent implements OnInit, OnChanges {
  @Input() graph: {
    title: string;
    type;
    data: [[]];
    columnNames: [string];
    options: {};
    width: string;
    height: number;
  };
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.graph =
      changes.graph.currentValue !== undefined
        ? changes.graph.currentValue
        : this.graph;
  }
}
